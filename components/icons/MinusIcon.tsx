const MinusIcon = ({ color = "currentColor", className = "", ...props }) => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 8.00001C2 7.8232 2.07024 7.65363 2.19526 7.52861C2.32029 7.40358 2.48986 7.33334 2.66667 7.33334H13.3333C13.5101 7.33334 13.6797 7.40358 13.8047 7.52861C13.9298 7.65363 14 7.8232 14 8.00001C14 8.17682 13.9298 8.34639 13.8047 8.47141C13.6797 8.59644 13.5101 8.66668 13.3333 8.66668H2.66667C2.48986 8.66668 2.32029 8.59644 2.19526 8.47141C2.07024 8.34639 2 8.17682 2 8.00001Z"
        fill={color}
      />
    </svg>
  );
};

export default MinusIcon;
