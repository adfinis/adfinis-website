import React from "react"

type IconProps = {
  className: string
}
const IconCheck: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    width="14"
    height="10"
    viewBox="0 0 14 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      id="Vector"
      d="M13.2982 1.45595L12.8202 1.93393L5.69278 9.02484L5.21761 9.5L4.74245 9.02484L1.18012 5.47938L0.702148 5.00422L1.65529 4.04827L2.13326 4.52343L5.21761 7.59372L11.8671 0.975164L12.3451 0.5L13.2982 1.45595Z"
      fill="currentColor"
    />
  </svg>
)

export default IconCheck
