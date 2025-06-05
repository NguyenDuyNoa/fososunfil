"use client";
import NewDesktopHeader from "@/components/layout/header/NewDesktopHeader";
import NewDesktopHeaderMini from "@/components/layout/header/NewDesktopHeaderMini";
import TabletHeader from "@/components/layout/header/TabletHeader";
import { useLanguage } from "@/context/LanguageProvider";
import { uuidv4 } from "@/lib/uuid";
import { useStateHeader } from "@/states/Header/useStateHeader";
import useCookieStore from "@/stores/useCookieStore";
import { useDialogStore } from "@/stores/useDialogStore";
import { useResizeStore } from "@/stores/useResizeStore";
import { IMenuHeader } from "@/types/menu/IMenu";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

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
    code: "vi",
    country: "Việt Nam",
    flag: "/flag/vi.png",
  },
  {
    code: "en",
    country: "English",
    flag: "/flag/en.png",
  },
];

const HeaderContainer = () => {
  const { getCookie, setCookie, removeCookie } = useCookieStore();
  const { isVisibleTablet } = useResizeStore();
  const { isStateHeader, queryKeyIsStateHeader } = useStateHeader();
  const { setOpenDialogCustom, setStatusDialog, setHandleOpenDialog } =
    useDialogStore();
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

  // Set handleOpenDialog to the store
  useEffect(() => {
    setHandleOpenDialog(handleOpenDialog);
  }, []);

  return (
    <header className="md:bg-transparent bg-white w-full z-[999]">
      <div>
        {/* Header chính luôn hiển thị */}
        <div className="w-full">
          <NewDesktopHeader
            dataHeader={dataHeader}
            dataCountryOptions={dataCountryOptions}
            handleToggleMenu={handleToggleMenu}
            handleCodeChange={handleCodeChange}
            handleOpenDialog={handleOpenDialog}
          />
        </div>

        {/* Header mini dạng sticky khi cuộn xuống */}
        <AnimatePresence>
          {isStateHeader.isHeaderFixed && (
            <motion.div
              className="fixed top-0 left-0 right-0 z-50 shadow-md"
              key="mini"
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -80, opacity: 0 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
            >
              <NewDesktopHeaderMini
                dataHeader={dataHeader}
                dataCountryOptions={dataCountryOptions}
                handleToggleMenu={handleToggleMenu}
                handleCodeChange={handleCodeChange}
                handleOpenDialog={handleOpenDialog}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default HeaderContainer;
