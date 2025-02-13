import React from "react"

const IconFlagNL: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    enableBackground="new 0 0 512 512"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="256" cy="256" fill="#f0f0f0" r="256" />
    <path
      d="m256 0c-110.071 0-203.906 69.472-240.077 166.957h480.155c-36.172-97.485-130.007-166.957-240.078-166.957z"
      fill="#a2001d"
    />
    <path
      d="m256 512c110.071 0 203.906-69.472 240.077-166.957h-480.154c36.171 97.485 130.006 166.957 240.077 166.957z"
      fill="#0052b4"
    />
  </svg>
)

export default IconFlagNL
