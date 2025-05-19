"use client";

import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AnimatePresence } from "framer-motion";
import ButtonToTop from "@/components/button/ButtonToTop";

import { Toaster } from "react-hot-toast";

import { useResizeStore } from "@/stores/useResizeStore";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/thumbs";
import "swiper/swiper-bundle.css";
import "@/styles/globals.scss";
import "@smastrom/react-rating/style.css";

import { usePathname, useSearchParams } from "next/navigation";
import { scrollToSection } from "@/utils/scroll/ScrollFunction";
// import LayoutTranslate from './LayoutTranslate'
import dynamic from "next/dynamic";
import { useDialogStore } from "@/stores/useDialogStore";
import { DialogCustom } from "../../dialog/DialogCustom";

import { Toaster as ToastShadcnUi } from "@/components/ui/toaster";
import { useToastStore } from "@/stores/useToastStore";
import ToastCustom from "../../toast/ToastCustom";
import { useToast } from "@/hooks/use-toast";
import HeaderContainer from "@/components/layout/header/HeaderContainer";
import FooterContainer from "@/components/layout/footer/FooterContainer";
import AlertDialogCustom from "@/components/dialog/AlertDialogCustom";
import { useAlertDialogStore } from "@/stores/useAlertDialogStore";

const LayoutTranslate = dynamic(() => import("./LayoutTranslate"), {
  ssr: false,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const LayoutMain = ({ children }: { children: React.ReactNode }) => {
  const sectionId = useSearchParams().get("sectionId");

  const { toast } = useToast();

  const { openDialogCustom } = useDialogStore();
  const { openAlertDialog } = useAlertDialogStore();
  const { duration, openToast, message, type, setToast, description } =
    useToastStore();

  const pathname = usePathname();

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const {
    isVisibleMobile,
    isVisibleTablet,
    onResizeMobile,
    onResizeTablet,
    onCloseResizeMobile,
    onCloseResizeTablet,
  } = useResizeStore();

  useEffect(() => {
    setIsMounted(true);
    const rootElement = document.documentElement;
    rootElement.removeAttribute("cz-shortcut-listen");
  }, []);

  // ẩn/hiện khi chuyển qua màn hình nhỏ khi không dùng chung div để tránh xung đột
  useEffect(() => {
    // Kiểm tra kích thước màn hình và cập nhật trạng thái isVisible
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // khi đến màn 768 thì bắt đầu thực hiện function
        onResizeMobile();
      } else {
        onCloseResizeMobile();
      }
      if (window.innerWidth <= 768) {
        onResizeTablet();
      } else {
        onCloseResizeTablet();
      }
    };

    // Gọi hàm handleResize khi kích thước màn hình thay đổi
    window.addEventListener("resize", handleResize);

    // Gọi hàm handleResize một lần khi component được render
    handleResize();

    // Hủy lắng nghe sự kiện resize khi component bị unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [
    isVisibleMobile,
    isVisibleTablet,
    onCloseResizeMobile,
    onCloseResizeTablet,
    onResizeMobile,
    onResizeTablet,
  ]);

  useEffect(() => {
    if (sectionId) {
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    }
  }, [sectionId]);

  const showToast = (
    type: "success" | "error" | "warning",
    message: string,
    description?: string
  ) => {
    return toast({
      duration: duration,
      className: "rounded-[13px] max-w-[336px]",
      description: (
        <ToastCustom type={type} content={message} description={description} />
      ),
    });
  };

  useEffect(() => {
    if (openToast && type && message) {
      setTimeout(() => {
        setToast(false);
      }, duration);
      showToast(type, message, description);
    }
  }, [openToast]);

  if (!isMounted) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <LayoutTranslate>
        <Toaster position="top-right" reverseOrder={false} />
        <div className="w-screen min-h-screen text-responsive custom-swiper bg-white relative">
          {/* <HeaderContainer /> */}
          <div className="fixed top-0 left-0 right-0 z-[999]">
            <HeaderContainer />
          </div>
          <main className="size-full pt-[210px] bg-[#F4F6F8]">
            {/* <main className={`${!['/home', '/'].includes(pathname) && "pt-[112px]"} overflow-hidden size-full`}> */}
            <AnimatePresence
              mode="wait"
              onExitComplete={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
            >
              {children}
            </AnimatePresence>
            <ButtonToTop />
            {/* {!['/home', '/'].includes(pathname) && !pathname.startsWith("/auth") &&  */}
            <FooterContainer />
          </main>

          {openDialogCustom && <DialogCustom />}
          {openAlertDialog && <AlertDialogCustom />}
        </div>

        <ToastShadcnUi />
      </LayoutTranslate>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

export default LayoutMain;
