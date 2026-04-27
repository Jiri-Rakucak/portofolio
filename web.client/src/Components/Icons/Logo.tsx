interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ className, width = 32, height = 32 }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 32 32"
    fill="currentColor"
  >
    {/* Váš logo SVG obsah */}
    <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 25C9.373 27 4 21.627 4 15S9.373 3 16 3s12 5.373 12 12-5.373 12-12 12z"/>
  </svg>
);

export default Logo;