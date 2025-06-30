"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils"; // hoặc tự viết hàm gộp class
import { ChevronRight } from "lucide-react";
import { MenuItem } from "@/types/categories/ICategoryes";
import Image from "next/image";
import MenuContent from "@/components/Menu/MenuContent";

type MegaMenuDropdownProps = {
  triggerLabel?: React.ReactNode;
  // items: MenuItem[];
  IsProducts?: boolean;
  classNameButton?: string;
  classNameContent?: string;
  classNameSubItem?: string;
  icon?: React.ReactNode;
  allowHover?: boolean;
  isMiniHeader?: boolean;
};

const MegaMenuDropdown = ({
  triggerLabel = "Menu",
  // items,
  IsProducts = false,
  classNameButton = "",
  classNameContent = "",
  classNameSubItem = "",
  icon,
  allowHover = true,
  isMiniHeader = false,
}: MegaMenuDropdownProps) => {
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCLickDropdown = () => {
    if (allowHover) {
      setIsOpen((prev) => !prev);
    }
  };

  // const handleMouseLeave = () => {
  //   if (allowHover) {
  //     setIsOpen(false);
  //     setActiveItem(null);
  //   }
  // };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setActiveItem(null);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  return (
    <div ref={containerRef} className="relative ">
      {/* Trigger button */}
      <button
        className={cn(
          "flex items-center gap-2 py-3 px-4 relative z-10 bg-brand-650 hover:bg-brand-500 transition-all duration-300 text-white font-bold rounded-md whitespace-nowrap cursor-pointer",
          classNameButton
        )}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
        onClick={handleCLickDropdown}
      >
        {icon} {triggerLabel}{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-all duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown content - khi mở ra sẽ tạo một invisible "cầu nối" */}
      {isOpen && (
        <>
          {/* Cầu nối vô hình giữa button và dropdown */}
          <div
            className="absolute left-0 w-full h-4 bg-transparent z-50 "
            style={{ top: "100%" }}
            onMouseEnter={() => setIsOpen(true)}
          />

          <MenuContent
            classNameContent={classNameContent}
            classNameSubItem={classNameSubItem}
            // activeItem={activeItem}
            // items={items}
            // setActiveItem={setActiveItem}
            // onClose={handleMouseLeave}
            // onHover={() => setIsOpen(true)}
            // setActiveItem={handleItemHover}
            onClose={() => {
              setIsOpen(false);
              setActiveItem(null);
            }}
            onHover={() => {}}
            isMiniHeader={isMiniHeader}
          />
        </>
      )}
    </div>
  );
};

export default MegaMenuDropdown;
