import React from "react";
import Link from "next/link";
import ArrowRightBreadcrumbIcon from "../icons/ArrowRightBreadcrumbIcon";

interface BreadcrumbsProps {
  items: {
    label: string;
    href: string;
  }[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <div className="flex items-center">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Link href={item.href} className={` ${index === items.length - 1 ? "truncate" : ""}`}>
            <span
              className={`text-xs xl:text-sm whitespace-nowrap ${
                index === items.length - 1
                  ? "font-semibold text-brand-700"
                  : "font-normal text-[#919EAB] hover:text-brand-700"
              }`}
            >
              {item.label}
            </span>
          </Link>
          {index < items.length - 1 && (
            <ArrowRightBreadcrumbIcon className="mx-2 xl:mx-4 text-disabled text-[#919EAB] size-2 flex-shrink-0" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
