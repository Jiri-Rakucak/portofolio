interface DashboardIconProps {
  className?: string;
  size?: number;
}

const DashboardIcon: React.FC<DashboardIconProps> = ({ className, size = 24 }) => (
  <svg
    width={size}
    height={size}
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
  </svg>
);

export default DashboardIcon;