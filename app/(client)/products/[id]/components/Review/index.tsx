import { Rating } from "@smastrom/react-rating";
import React from "react";

const StarDrawing = (
  <path d="M13.6331 16.5003C13.4999 16.5008 13.3684 16.4694 13.2498 16.4086L8.9998 14.1836L4.7498 16.4086C4.6118 16.4812 4.4562 16.5136 4.3007 16.5021C4.1452 16.4906 3.99603 16.4358 3.87016 16.3438C3.74429 16.2517 3.64675 16.1263 3.58865 15.9816C3.53054 15.8369 3.5142 15.6788 3.54147 15.5253L4.3748 10.8336L0.941469 7.50027C0.83435 7.39338 0.758362 7.25933 0.721659 7.11252C0.684955 6.9657 0.688923 6.81167 0.733135 6.66694C0.781435 6.51883 0.870282 6.38723 0.989594 6.28707C1.10891 6.18691 1.2539 6.12219 1.40814 6.10027L6.15814 5.4086L8.2498 1.1336C8.31804 0.992712 8.42458 0.87389 8.55723 0.79075C8.68987 0.707609 8.84326 0.663513 8.9998 0.663513C9.15635 0.663513 9.30973 0.707609 9.44238 0.79075C9.57502 0.87389 9.68156 0.992712 9.7498 1.1336L11.8665 5.40027L16.6165 6.09194C16.7707 6.11386 16.9157 6.17857 17.035 6.27874C17.1543 6.3789 17.2432 6.5105 17.2915 6.6586C17.3357 6.80333 17.3396 6.95737 17.3029 7.10418C17.2662 7.251 17.1903 7.38504 17.0831 7.49194L13.6498 10.8253L14.4831 15.5169C14.5129 15.6732 14.4973 15.8347 14.4382 15.9823C14.3792 16.13 14.2791 16.2577 14.1498 16.3503C13.9989 16.456 13.8172 16.5088 13.6331 16.5003Z" />
);

const customStyles = {
  itemShapes: StarDrawing,
  activeFillColor: "#FFAB00",
  inactiveFillColor: "#919EAB",
};

const Review = () => {
  return (
    <div className="rounded-lg bg-white shadow-review">
      <h2 className="text-[28px]/[32px] font-semibold text-primary-new p-8">
        Đánh giá sản phẩm
      </h2>
      <div className="flex border-b border-[#919EAB33]">
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <h3 className="text-5xl font-extrabold text-primary-new">4/5</h3>
          <Rating
              value={4}
              readOnly
              style={{ maxWidth: 100 }}
              itemStyles={customStyles}
            />
          <p className="text-sm text-secondary-new">(8.24k đánh giá) </p>
        </div>
        <div className="flex-1 flex items-center gap-2"></div>
      </div>
    </div>
  );
};

export default Review;
