type TerminalIconProps = {
  size?: number;
  className?: string;
};

const TerminalIcon = ({ size = 24, className }: TerminalIconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" fill="#111827" />
    <path d="M6 9l3 3-3 3" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 15h6" stroke="#E5E7EB" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export default TerminalIcon;
