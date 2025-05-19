import React from "react";
import Image from "next/image";
import { IMAGES } from "@/constants/Images";

const ServiceHighlights = () => {
  const services = [
    {
      icon: IMAGES.money,
      title: "Miễn phí vận chuyển",
      description: "Với hoá đơn từ 1 triệu",
    },
    {
      icon: IMAGES.support,
      title: "Hỗ trợ 24/7",
      description:
        "Đội ngũ CSKH tận tình sẵn sàng lắng nghe và phục vụ tận tâm",
    },
    {
      icon: IMAGES.delivery1,
      title: "Giao hàng nhanh 2h",
      description: "Trong vòng bán kính 10km nội thành TP HCM",
    },
    {
      icon: IMAGES.package1,
      title: "30 ngày đổi trả",
      description:
        "Hoàn tiền 100% nếu phát sinh lỗi từ NSX hoặc đơn vị vận chuyển",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
      {services.map((service, index) => (
        <div
          key={index}
          className="bg-white rounded-xl 3xl:py-5 py-3 3xl:px-6 px-4 flex items-center gap-4 shadow-[0px_8px_16px_0px_#919EAB29]"
        >
          <div className="w-12 h-12 flex-shrink-0">
            <Image
              src={service.icon}
              alt={service.title}
              width={48}
              height={48}
            />
          </div>
          <div className="flex flex-col 3xl:gap-2 gap-1">
            <h3 className="text-base font-bold text-primary-new">
              {service.title}
            </h3>
            <p className="text-sm font-medium text-secondary-new">
              {service.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceHighlights;
