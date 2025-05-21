import React, { useEffect, useState } from "react";

interface CountdownProps {
  endTime: Date; // Thời gian kết thúc
  onComplete?: () => void;
}

const Countdown: React.FC<CountdownProps> = ({
  endTime,
  onComplete,
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Hàm tính toán thời gian còn lại
    const calculateTimeLeft = () => {
      const difference = endTime.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        // Đã hết thời gian
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        if (onComplete) {
          onComplete();
        }
        return false;
      }
      
      // Tính toán giờ, phút, giây còn lại
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ hours, minutes, seconds });
      return true;
    };

    // Tính toán lần đầu
    const hasTimeLeft = calculateTimeLeft();
    if (!hasTimeLeft) return;

    // Cập nhật mỗi giây
    const interval = setInterval(() => {
      const hasTimeLeft = calculateTimeLeft();
      if (!hasTimeLeft) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime, onComplete]);

  // Đảm bảo số hiển thị luôn có 2 chữ số
  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : `${time}`;
  };

  return (
    <div className="flex items-center gap-1.5">
      <div className="bg-gradient-to-b from-white to-transparent p-[1px] rounded-[2px]">
        <div className="bg-red-700 text-white size-[26px] xl:size-9 text-sm xl:text-base font-bold flex justify-center items-center rounded-[2px]">
          {formatTime(timeLeft.hours)}
        </div>
      </div>
      <span className="text-red-700 font-bold text-sm xl:text-2xl">:</span>
      <div className="bg-gradient-to-b from-white to-transparent p-[1px] rounded-[2px]">
        <div className="bg-red-700 text-white size-[26px] xl:size-9 text-sm xl:text-base font-bold flex justify-center items-center rounded-[2px]">
          {formatTime(timeLeft.minutes)}
        </div>
      </div>
      <span className="text-red-700 font-bold text-sm xl:text-2xl">:</span>
      <div className="bg-gradient-to-b from-white to-transparent p-[1px] rounded-[2px]">
        <div className="bg-red-700 text-white size-[26px] xl:size-9 text-sm xl:text-base font-bold flex justify-center items-center rounded-[2px]">
          {formatTime(timeLeft.seconds)}
        </div>
      </div>
    </div>
  );
};

export default Countdown; 