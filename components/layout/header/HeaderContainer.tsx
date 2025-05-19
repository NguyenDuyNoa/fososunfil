"use client";

import React, { useEffect, useState } from "react";

import TabletHeader from "@/components/layout/header/TabletHeader";
import DesktopHeader from "@/components/layout/header/DesktopHeader";

import { useResizeStore } from "@/stores/useResizeStore";
import { useStateHeader } from "@/states/Header/useStateHeader";

import { uuidv4 } from "@/lib/uuid";
import { IMenuHeader } from "@/types/menu/IMenu";
import { useLanguage } from "@/context/LanguageProvider";
import useCookieStore from "@/stores/useCookieStore";
import { useDialogStore } from "@/stores/useDialogStore";
import NewDesktopHeader from "@/components/layout/header/NewDesktopHeader";
import NewDesktopHeaderMini from "@/components/layout/header/NewDesktopHeaderMini";
import { AnimatePresence, motion } from "framer-motion";

const dataHeader: IMenuHeader[] = [
  {
    id: uuidv4(),
    name: "About Us",
    link: "/about-us",
    children: false,
    visible: true,
  },
  {
    id: uuidv4(),
    name: "Product",
    link: "/products",
    children: false,
    visible: true,
  },
  {
    id: uuidv4(),
    name: "Category",
    link: "/categories",
    children: false,
    visible: true,
  },
  {
    id: uuidv4(),
    name: "News",
    link: "/blogs",
    children: false,
    visible: true,
  },
  {
    id: uuidv4(),
    name: "Contact",
    link: "/contact-us",
    children: false,
    visible: true,
  },
];

const dataCountryOptions = [
  {
    code: "VI",
    country: "Việt Nam",
    flag: "/flag/vi.png",
  },
  {
    code: "EN",
    country: "English",
    flag: "/flag/en.png",
  },
];

const HeaderContainer = () => {
  const { getCookie, setCookie, removeCookie } = useCookieStore();
  const { isVisibleTablet } = useResizeStore();
  const { isStateHeader, queryKeyIsStateHeader } = useStateHeader();
  const { setOpenDialogCustom, setStatusDialog } = useDialogStore();
  const { language, setLanguage } = useLanguage();

  const [isMiniHeader, setIsMiniHeader] = useState(false);

  useEffect(() => {
    if (isVisibleTablet) return; // chỉ áp dụng cho desktop

    const handleScroll = () => {
      const shouldShowMini = window.scrollY > 200;
      setIsMiniHeader(shouldShowMini);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisibleTablet]);

  useEffect(() => {
    const body = document.body;
    if (!isStateHeader?.isShowMenuScreen) {
      body.style.overflow = "auto"; // Cho phép cuộn
    } else {
      body.style.overflow = "hidden"; // Chặn cuộn
    }
  }, [isStateHeader?.isShowMenuScreen]);

  useEffect(() => {
    queryKeyIsStateHeader({
      selectedCodeCountry: dataCountryOptions[0].code,
    });

    setLanguage(dataCountryOptions[0].code);
  }, []);

  const handleToggleMenu = (action: string): void => {
    if (action === "on") {
      queryKeyIsStateHeader({
        isShowMenuScreen: true,
      });
    } else if (action === "off") {
      queryKeyIsStateHeader({
        isShowMenuScreen: false,
      });
    }
  };

  const handleCodeChange = (value: string) => {
    queryKeyIsStateHeader({
      selectedCodeCountry: value,
    });
    setLanguage(value);
    setCookie("googletranslate", value);
    // if (dataCountryOptions[0].code !== value) {
    //     setCookie('googletranslate', value)
    // }
    //  else {
    //     removeCookie('googletranslate')
    // }
  };

  const handleOpenDialog = (status: string, type_device: string) => {
    if (type_device === "desktop") {
      setOpenDialogCustom(true);
      setStatusDialog(status);
    } else {
      queryKeyIsStateHeader({
        isShowMenuScreen: false,
      });

      setTimeout(() => {
        setOpenDialogCustom(true);
        setStatusDialog(status);
      }, 500);
    }
  };

  return (
    <header className="md:bg-transparent bg-white w-full z-[999]">
      <div
      //   className="custom-container"
      >
        {isVisibleTablet ? (
          // màn hình mobile, tablet
          <TabletHeader
            dataHeader={dataHeader}
            handleToggleMenu={handleToggleMenu}
            handleOpenDialog={handleOpenDialog}
          />
        ) : (
          // màn hình laptop
          <>
            {/* <DesktopHeader
              dataHeader={dataHeader}
              dataCountryOptions={dataCountryOptions}
              handleToggleMenu={handleToggleMenu}
              handleCodeChange={handleCodeChange}
              handleOpenDialog={handleOpenDialog}
            /> */}
            <AnimatePresence mode="wait">
              {isMiniHeader ? (
                <motion.div
                  key="mini"
                  initial={{ y: -80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -80, opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                  <NewDesktopHeaderMini
                    dataHeader={dataHeader}
                    dataCountryOptions={dataCountryOptions}
                    handleToggleMenu={handleToggleMenu}
                    handleCodeChange={handleCodeChange}
                    handleOpenDialog={handleOpenDialog}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="full"
                  initial={{ y: -80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -80, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <NewDesktopHeader
                    dataHeader={dataHeader}
                    dataCountryOptions={dataCountryOptions}
                    handleToggleMenu={handleToggleMenu}
                    handleCodeChange={handleCodeChange}
                    handleOpenDialog={handleOpenDialog}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </header>
  );
};

export default HeaderContainer;
