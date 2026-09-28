import { describe, expect, it } from 'vitest';
import enDevos from '../locales/en/devos.json';
import csDevos from '../locales/cs/devos.json';

const devosResources = [enDevos, csDevos];

describe('DevOS translation resources', () => {
  it('provides About Me document copy in every locale', () => {
    for (const resource of devosResources) {
      expect(resource.aboutMe.name).toBe('Jiří Rakučák');
      expect(resource.aboutMe.role.length).toBeGreaterThan(20);
      expect(resource.aboutMe.summary.length).toBeGreaterThan(20);
    }
  });

  it('keeps About Me section and keyword keys aligned across locales', () => {
    expect(Object.keys(csDevos.aboutMe.sections).sort()).toEqual(
      Object.keys(enDevos.aboutMe.sections).sort(),
    );
    expect(Object.keys(csDevos.aboutMe.keywords).sort()).toEqual(
      Object.keys(enDevos.aboutMe.keywords).sort(),
    );
  });

  it('provides tooltip descriptions for every About Me keyword', () => {
    for (const resource of devosResources) {
      for (const keyword of Object.values(resource.aboutMe.keywords)) {
        expect(keyword.label.length).toBeGreaterThan(1);
        expect(keyword.description.length).toBeGreaterThan(20);
      }
    }
  });

  it('provides Lab copy and implementation notes in every locale', () => {
    for (const resource of devosResources) {
      expect(resource.lab.title).toBe('Component Lab');
      expect(resource.lab.subtitle.length).toBeGreaterThan(20);
      expect(resource.lab.notes.length).toBe(3);
      expect(resource.lab.primaryAction.length).toBeGreaterThan(1);
      expect(resource.lab.statusPrototype.length).toBeGreaterThan(1);
    }
  });
});
