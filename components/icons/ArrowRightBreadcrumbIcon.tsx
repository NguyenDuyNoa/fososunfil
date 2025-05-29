const ArrowRightBreadcrumbIcon = ({
  color = "currentColor",
  className = "",
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g clipPath="url(#clip0_2354_3928)">
        <path
          d="M3 1.66693L5 4.00026L3 6.3336"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2354_3928">
          <rect
            width="8"
            height="8"
            fill={color}
            transform="translate(0 0.000244141)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ArrowRightBreadcrumbIcon;
