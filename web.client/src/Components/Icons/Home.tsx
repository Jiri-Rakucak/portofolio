interface HomeIconProps {
  className?: string;
  size?: number;
}

const HomeIcon: React.FC<HomeIconProps> = ({ className, size = 24 }) => (
  <svg
    width={size}
    height={size}
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);

export default HomeIcon;