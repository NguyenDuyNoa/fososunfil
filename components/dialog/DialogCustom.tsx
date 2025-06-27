import { useStatePageReveicedGift } from "@/app/(client)/reveiced-gift/_state/useStatePageReveicedGift";
import MinusIcon from "@/components/icons/MinusIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  TITLE_FORM_FAKE_INFORMATION,
  TITLE_FORM_FORGOT_PASSWORD,
  TITLE_FORM_LOGIN,
  TITLE_FORM_OTP,
  TITLE_FORM_PROMOTION,
  TITLE_FORM_REGISTER,
} from "@/constants/DialogContants";
import LoginComponent from "@/features/auth/components/login-card";
import RegisterOtp from "@/features/auth/components/otp-register";
import ReveicedGiftCodeOtp from "@/features/auth/components/otp-reveiced-gift-code";
import UpdatePasswordOtp from "@/features/auth/components/otp-update-password";
import RegisterComponent from "@/features/auth/components/register-card";
import { useStateAuth } from "@/managers/state-management/auth/useStateAuth";
import { useAuthStore } from "@/stores/useAuthStores";
import { useCartStore } from "@/stores/useCartStore";
import { useDialogStore } from "@/stores/useDialogStore";
import { FormatPhoneNumber } from "@/utils/format/FormatNumber";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

type Props = {};

export function DialogCustom({}: Props) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(1);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const { addToCartAPI, closeCart, fetchCart } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { isStateAuth } = useStateAuth();
  const { informationUser } = useAuthStore();
  const { isStatePageReveicedGift } = useStatePageReveicedGift();
  const {
    openDialogCustom,
    statusDialog,
    setOpenDialogCustom,
    setStatusDialog,
    productData,
  } = useDialogStore();

  useEffect(() => {
    if (productData) {
      setCurrentProduct(productData);
      setQuantity(1); // Reset quantity when new product is selected
    }
  }, [productData]);

  const handleCloseDialog = (value: boolean, type: string) => {
    if (type === "overlay") {
      let otp = [
        "otp_register",
        "otp_update_password",
        "otp_reveiced_gift",
      ].includes(statusDialog);
      let quantityDialog = ["quantity_selection"].includes(statusDialog);

      if (!otp && !quantityDialog) {
        setOpenDialogCustom(value);
      }
    } else if (type === "close") {
      setOpenDialogCustom(value);
    }
  };

  const handleIncrement = () => {
    if (quantity < 1234) {
      // Assuming 1234 is max available
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      if (value >= 1 && value <= 1234) {
        setQuantity(value);
      }
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleAddToCart = async () => {
    if (currentProduct && currentProduct.id) {
      try {
        await addToCartAPI(currentProduct.id, quantity);
        setOpenDialogCustom(false);
      } catch (error) {
        console.error("Lỗi khi thêm vào giỏ hàng:", error);
      }
    }
  };

  const handleBuyNow = async () => {
    if (currentProduct && currentProduct.id) {
      try {
        await addToCartAPI(currentProduct.id, quantity);
        await fetchCart();
        closeCart();
        router.push("/cart");
        setOpenDialogCustom(false);
      } catch (error) {
        console.error("Lỗi khi thêm vào giỏ hàng:", error);
      }
    }
  };

  if (!isMounted) {
    return null;
  }

  const isAuthTab = statusDialog === "login" || statusDialog === "register";
  const isAuthStatusDialog = [
    "login",
    "register",
    "otp_register",
    "otp_update_password",
    "otp_reveiced_gift",
    "update_account",
    "forgot_password",
    "promotions",
    "fake_information",
  ].includes(statusDialog);
  const isQuantityDialog = statusDialog === "quantity_selection";

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      y: 20,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  // Bottom sheet variants
  const bottomSheetVariants = {
    hidden: { opacity: 0, y: "100%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      y: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {openDialogCustom && (
        <Dialog
          open={openDialogCustom}
          onOpenChange={(value: boolean) => handleCloseDialog(value, "overlay")}
        >
          <DialogPortal>
            <DialogOverlay className="bg-[#09080D]/[48%]" />
            {isAuthStatusDialog && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalVariants}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                <DialogContent
                  className={`${
                    statusDialog === "otp_register" ||
                    statusDialog === "otp_update_password" ||
                    statusDialog === "otp_reveiced_gift"
                      ? "lg:max-w-[420px]"
                      : `lg:max-w-[520px]`
                  } bg-white !text-black p-0 border-none max-w-[95%] max-h-[98vh] overflow-hidden
                                                    focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0
                                                    !rounded-2xl custom-size-text custom-tailwind
                                        `}
                  style={{
                    boxShadow: "0px 64px 64px -48px #0F0F0F14",
                  }}
                >
                  <div className="h-full md:p-6 p-4 md:pr-3 pr-1 rounded-2xl">
                    <div className="3xl:mb-8 mb-6">
                      <DialogClose
                        onClick={() => handleCloseDialog(false, "close")}
                        className="3xl:size-6 size-5 z-20 flex items-center justify-center absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                      >
                        <X className="size-full text-[#505458]" />
                        <span className="sr-only">Close</span>
                      </DialogClose>

                      {isAuthTab && (
                        <div className="flex flex-row items-center justify-center w-full gap-4">
                          <DialogTitle
                            className={`${
                              statusDialog === "login"
                                ? "!text-[#333538]"
                                : "!text-[#C4CACC] hover:!text-[#333538]"
                            } relative px-4 pb-2 capitalize 3xl:text-[22px] text-[20px] font-semibold cursor-pointer transition-all duration-300`}
                            onClick={() => setStatusDialog("login")}
                          >
                            {TITLE_FORM_LOGIN}
                            {statusDialog === "login" && (
                              <div className="absolute bottom-0 left-[40%] w-8 h-1 bg-[#07A6FF] rounded-[3px]" />
                            )}
                          </DialogTitle>
                          <DialogTitle
                            className={`${
                              statusDialog === "register"
                                ? "!text-[#333538]"
                                : "!text-[#C4CACC] hover:!text-[#333538]"
                            } relative px-4 pb-2 capitalize 3xl:text-[22px] text-[20px] font-semibold cursor-pointer transition-all duration-300`}
                            onClick={() => setStatusDialog("register")}
                          >
                            {TITLE_FORM_REGISTER}
                            {statusDialog === "register" && (
                              <div className="absolute bottom-0 left-[40%] w-8 h-1 bg-[#07A6FF] rounded-[3px]" />
                            )}
                          </DialogTitle>
                        </div>
                      )}
                      {!isAuthTab && (
                        <DialogHeader className="flex items-center justify-center gap-4 w-full">
                          <DialogTitle
                            className={`text-[#333538] capitalize 3xl:text-[22px] text-[20px] font-semibold`}
                          >
                            {statusDialog === "otp_register" && TITLE_FORM_OTP}
                            {statusDialog === "forgot_password" &&
                              TITLE_FORM_FORGOT_PASSWORD}
                            {statusDialog === "promotions" &&
                              TITLE_FORM_PROMOTION}
                            {statusDialog === "fake_information" &&
                              TITLE_FORM_FAKE_INFORMATION}
                          </DialogTitle>
                          {(statusDialog === "otp_register" ||
                            statusDialog === "otp_update_password" ||
                            statusDialog === "otp_reveiced_gift") && (
                            <DialogDescription className="text-center text-[#808990] font-normal">
                              Please enter 4 digit verification code that have
                              been sent to your phone number:
                              {statusDialog === "otp_register" && (
                                <span className="font-bold text-[#07A6FF]">
                                  {" "}
                                  {FormatPhoneNumber(isStateAuth?.form?.phone)}
                                </span>
                              )}
                              {statusDialog === "otp_update_password" && (
                                <span className="font-bold text-[#07A6FF]">
                                  {" "}
                                  {FormatPhoneNumber(
                                    `${informationUser?.phonenumber}`
                                  )}
                                </span>
                              )}
                              {statusDialog === "otp_reveiced_gift" && (
                                <span className="font-bold text-[#07A6FF]">
                                  {" "}
                                  {FormatPhoneNumber(
                                    `${isStatePageReveicedGift?.form?.phone}`
                                  )}
                                </span>
                              )}
                            </DialogDescription>
                          )}
                          {statusDialog === "forgot_password" && (
                            <DialogDescription className="text-center text-[#808990] font-normal">
                              Chúng tôi sẽ gửi mật khẩu tạm thời đến EMAIL của
                              bạn đăng ký tài khoản. Vui lòng nhập thông tin
                              đăng ký!
                            </DialogDescription>
                          )}
                        </DialogHeader>
                      )}
                    </div>

                    <ScrollArea
                      type="hover"
                      className={`max-h-[calc(90vh_-_50px)] overflow-y-auto pr-3 z-20`}
                    >
                      {statusDialog === "login" && <LoginComponent />}
                      {statusDialog === "register" && <RegisterComponent />}
                      {statusDialog === "otp_register" && <RegisterOtp />}
                      {statusDialog === "otp_update_password" && (
                        <UpdatePasswordOtp />
                      )}
                      {statusDialog === "otp_reveiced_gift" && (
                        <ReveicedGiftCodeOtp />
                      )}
                      {/* {statusDialog === "forgot_password" && <ForgotPasswordComponent />}
                                                    {statusDialog === "promotions" && <PromotionsComponent />}
                                                    {statusDialog === "fake_information" && <FakeInformationComponent />} */}
                      <ScrollBar />
                    </ScrollArea>
                  </div>
                </DialogContent>
              </motion.div>
            )}

            {/* Bottom Sheet cho chọn số lượng sản phẩm */}
            {isQuantityDialog && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={bottomSheetVariants}
                className="fixed bottom-0 left-0 right-0 z-50 xl:hidden"
              >
                <div className="bg-white rounded-t-2xl w-full shadow-[0px_-4px_20px_rgba(0,0,0,0.15)]">
                  <div className="px-3 pt-6 pb-4 flex flex-col gap-6">
                    <div className="flex items-center justify-between pb-3 border-b border-[#919EAB3D]">
                      <h2 className="text-xl font-bold capitalize text-primary-new">
                        Chọn số lượng
                      </h2>
                      <DialogClose
                        onClick={() => handleCloseDialog(false, "close")}
                        className="size-6 z-20 flex items-center justify-center opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                      >
                        <X className="size-full text-[#505458]" />
                        <span className="sr-only">Close</span>
                      </DialogClose>
                    </div>

                    {currentProduct && (
                      <div className="flex gap-2">
                        <Image
                          src={currentProduct?.images}
                          alt={currentProduct?.name}
                          width={80}
                          height={80}
                          className="object-cover rounded-lg"
                        />
                        <div className="flex flex-col gap-3">
                          <h3 className="text-sm font-semibold text-primary-new line-clamp-2">
                            {currentProduct.name}
                          </h3>
                          <div className="flex gap-2 items-center">
                            <div className="text-error-dark font-semibold text-base leading-4">
                              {Number(currentProduct?.price_promotion) > 0 ? (
                                <>
                                  <span>
                                    {Number(
                                      currentProduct?.price_promotion
                                    ).toLocaleString() || "299,000"}{" "}
                                  </span>
                                  <span className="underline">đ</span>
                                </>
                              ) : (
                                <span>Liên hệ</span>
                              )}
                            </div>
                            {Number(currentProduct?.percent) &&
                              Number(currentProduct?.price_promotion) !== 0 && (
                                <div className="flex items-center gap-1">
                                  <p className="line-through text-disable-50 font-normal text-sm leading-3">
                                    {Number(
                                      currentProduct?.price
                                    ).toLocaleString()}{" "}
                                  </p>
                                  <span className="underline text-disable-50 font-normal text-sm leading-3">
                                    đ
                                  </span>
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <h4 className="text-base font-medium text-secondary-new">
                        Số lượng
                      </h4>

                      <div className="flex flex-col gap-3">
                        <div className="flex items-center rounded-lg border border-[#DFE4EA]">
                          <button
                            className="p-1.5 flex justify-center items-center h-full border-r border-[#DFE4EA]"
                            onClick={handleDecrement}
                            disabled={quantity <= 1}
                          >
                            <MinusIcon
                              className={`size-5 ${
                                quantity <= 1
                                  ? "text-[#919EAB66]"
                                  : "text-[#919EABCC]"
                              }`}
                            />
                          </button>
                          <div className="flex-1 h-full flex justify-center items-center py-1">
                            <input
                              type="number"
                              value={quantity}
                              onChange={handleQuantityChange}
                              onFocus={handleFocus}
                              className="w-full text-center text-base font-medium text-primary-new focus:outline-none"
                              min="1"
                              max="1234"
                            />
                          </div>
                          <button
                            className="p-1.5 flex justify-center items-center h-full border-l border-[#DFE4EA]"
                            onClick={handleIncrement}
                            disabled={quantity >= 1234}
                          >
                            <PlusIcon
                              className={`size-5 ${
                                quantity >= 1234
                                  ? "text-[#919EAB66]"
                                  : "text-[#919EABCC]"
                              }`}
                            />
                          </button>
                        </div>
                        <p className="text-sm text-gray-500">
                          còn 1234 sản phẩm
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        className="flex-1 bg-brand-50 text-brand-600 text-sm font-bold py-2.5 rounded-lg"
                        onClick={handleAddToCart}
                      >
                        Thêm vào giỏ
                      </button>
                      <button
                        className="flex-1 bg-brand-500 text-white text-sm font-bold py-2.5 rounded-lg"
                        onClick={handleBuyNow}
                      >
                        Đặt hàng
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </DialogPortal>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
