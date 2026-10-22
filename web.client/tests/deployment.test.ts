import { afterEach, describe, expect, it } from 'vitest';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const script = readFileSync(new URL('../../deploy/upload.sh', import.meta.url), 'utf8');
const nginx = readFileSync(new URL('../../deploy/nginx.conf', import.meta.url), 'utf8');
const directories: string[] = [];
afterEach(() => { for (const directory of directories.splice(0)) rmSync(directory, { recursive: true, force: true }); });

function fixture(overrides: Record<string, string> = {}) {
  const root = mkdtempSync(join(tmpdir(), 'portfolio-deploy-'));
  directories.push(root);
  mkdirSync(join(root, 'deploy'));
  mkdirSync(join(root, 'bin'));
  mkdirSync(join(root, 'web.client/dist/assets'), { recursive: true });
  mkdirSync(join(root, 'web.client/dist/projects'));
  writeFileSync(join(root, 'web.client/dist/index.html'), 'Portfolio');
  writeFileSync(join(root, 'deploy/upload.sh'), script);
  const log = join(root, 'calls.jsonl');
  const mock = `#!/usr/bin/env node
const { appendFileSync } = require('node:fs');
const { basename } = require('node:path');
const command = basename(process.argv[1]);
appendFileSync(process.env.TEST_LOG, JSON.stringify({ command, args: process.argv.slice(2) }) + '\\n');
if (process.env.FAIL_UPLOAD === '1' && command === 'scp') process.exit(1);
`;
  for (const name of ['npm', 'ssh', 'scp', 'curl']) writeFileSync(join(root, 'bin', name), mock, { mode: 0o755 });
  const env = {
    ...process.env, PATH: `${join(root, 'bin')}:${process.env.PATH}`, TEST_LOG: log,
    DEPLOY_HOST: 'opc@example.invalid', DEPLOY_DIR: '/var/www/portfolio', DEPLOY_URL: 'http://example.invalid',
    DEPLOY_SSH_KEY: '', ...overrides,
  };
  return {
    run: (...args: string[]) => spawnSync('bash', [join(root, 'deploy/upload.sh'), ...args], { env, encoding: 'utf8' }),
    calls: (): { command: string; args: string[] }[] => existsSync(log)
      ? readFileSync(log, 'utf8').trim().split('\n').map(line => JSON.parse(line)) : [],
  };
}

describe('deployment script with fake local transports', () => {
  it('uploads assets first, atomically publishes the entry point last, and never deletes old assets', () => {
    const { run, calls } = fixture();
    expect(run().status).toBe(0);
    const commands = calls();
    expect(commands[0]).toEqual({ command: 'npm', args: ['run', 'build'] });
    const uploads = commands.filter(call => call.command === 'scp');
    expect(uploads[0].args).toContain('dist/assets');
    expect(uploads[uploads.length - 1].args).toContain('dist/index.html');
    const publish = commands.findIndex(call => call.command === 'ssh' && call.args.some(arg => arg.startsWith('mv -f')));
    expect(publish).toBeGreaterThan(commands.findIndex(call => call.args.includes('dist/index.html')));
    expect(commands[commands.length - 1].command).toBe('curl');
    expect(JSON.stringify(commands)).not.toContain('rm -rf');
    expect(script).not.toMatch(/(?:\d{1,3}\.){3}\d{1,3}/);
  });

  it('does not publish index.html or run the health check when an upload fails', () => {
    const { run, calls } = fixture({ FAIL_UPLOAD: '1' });
    expect(run().status).not.toBe(0);
    expect(calls().some(call => call.args.includes('dist/index.html'))).toBe(false);
    expect(calls().some(call => call.command === 'curl')).toBe(false);
  });

  it('prints a dry run without building or contacting the server', () => {
    const { run, calls } = fixture();
    const result = run('--dry-run');
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('dist/assets');
    expect(result.stdout).toContain('dist/index.html');
    expect(calls()).toEqual([]);
  });

  it.each(['/', '////', '~/web-app/dist', '/var/www/../root', '/var/www/my site', "/var/www/';echo-bad"])(
    'rejects unsafe or ambiguous document roots (%s) before running commands', directory => {
      const { run, calls } = fixture({ DEPLOY_DIR: directory });
      expect(run().status).not.toBe(0);
      expect(calls()).toEqual([]);
    },
  );

  it('requires a deployment target and does not embed an IP or credentials', () => {
    const { run, calls } = fixture({ DEPLOY_HOST: '' });
    expect(run().status).not.toBe(0);
    expect(calls()).toEqual([]);
  });
});

describe('domain-independent Nginx template', () => {
  it('keeps the projects route from resolving to the public/projects directory', () => {
    expect(nginx).toContain('try_files $uri /index.html;');
    expect(nginx).not.toContain('$uri/');
    expect(nginx).toContain('location ^~ /assets/');
    expect(nginx).toContain('try_files $uri =404;');
  });

  it('revalidates HTML, caches assets, and keeps indexing off only in the temporary server template', () => {
    expect(nginx).toContain('expires -1;');
    expect(nginx).toContain('expires 1y;');
    expect(nginx).toContain('X-Robots-Tag "noindex, nofollow" always');
    expect(nginx).not.toMatch(/(?:\d{1,3}\.){3}\d{1,3}/);
  });
});
