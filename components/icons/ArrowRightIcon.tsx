
const ArrowRightIcon = ({
  color = "currentColor",
  className = "",
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.85469 4.43057C9.16919 4.161 9.64266 4.19743 9.91223 4.51192L15.9122 11.5119C16.153 11.7928 16.153 12.2072 15.9122 12.4881L9.91223 19.4881C9.64266 19.8026 9.16919 19.839 8.85469 19.5695C8.5402 19.2999 8.50378 18.8264 8.77334 18.5119L14.355 12L8.77334 5.48811C8.50378 5.17361 8.5402 4.70014 8.85469 4.43057Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowRightIcon;
