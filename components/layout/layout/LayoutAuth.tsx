"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
// desktop
import AvatarCustom from "@/components/avatar/AvatarCustom";
import { DottedSeparator } from "@/components/dotted-separator/dotted-separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
// import { useTranslate } from '@/contexts/TranslateContext'
// import { usePostChangeAvatar } from '@/managers/api-management/auth/account/usePostChangeAvatar'
// import { useGetInfoByToken } from '@/managers/api-management/auth/info/useGetInfoByToken'
import { useAlertDialogStore } from "@/stores/useAlertDialogStore";
import { useResizeStore } from "@/stores/useResizeStore";
import {
  Camera,
  Gift,
  Heart,
  Location,
  Lock,
  Lock1,
  MessageQuestion,
  Note,
  SearchNormal,
  ShoppingBag,
  Tag,
  UserSquare,
} from "iconsax-react";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/stores/useAuthStores";
import { usePostChangeAvatar } from "@/managers/api-management/auth/account/usePostChangeAvatar";
import { useGetInfoByToken } from "@/managers/api-management/auth/info/useGetInfoByToken";
import { useStateHeader } from "@/states/Header/useStateHeader";

const LayoutAuth = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const pathname = usePathname();

  const { isLoading: isLoadingRefreshInfo } = useGetInfoByToken();

  const { isVisibleTablet, isVisibleMobile } = useResizeStore();

  const { informationUser } = useAuthStore();

  const { setOpenAlertDialog } = useAlertDialogStore();

  const { isLoading: isLoadingChangeAvatar, onSubmit: onSubmitChangeAvatar } =
    usePostChangeAvatar();
  const { queryKeyIsStateHeader } = useStateHeader();

  // sidebar desktop
  const listNavbar = [
    {
      id: 1,
      lable: "Thông tin chung",
      list: [
        {
          id: 144324,
          name: `Tài khoản của tôi`,
          icon: UserSquare,
          link: "/auth/information/profile",
        },
        {
          id: 5231234,
          name: `Lịch sử tìm kiếm`,
          icon: SearchNormal,
          link: "/auth/information/search-history",
        },
        {
          id: 542322,
          name: `Lịch sử quà tặng`,
          icon: Gift,
          link: "/auth/information/gift-history",
        },
        {
          id: 542323,
          name: `Lịch sử đơn hàng`,
          icon: ShoppingBag,
          link: "/auth/information/order-history",
        },
      ],
    },
    {
      id: 2,
      lable: "Cài đặt tài khoản",
      list: [
        {
          id: 323,
          name: `Đổi mật khẩu`,
          icon: Lock,
          link: "/auth/setting/change-password",
        },
      ],
    },
  ];

  // sidebar tablet/mobile
  const listSidebar = [
    {
      id: 144324,
      name: `Tài khoản của tôi`,
      icon: UserSquare,
      link: "/auth/information/profile",
    },
    {
      id: 5232134,
      name: `Lịch sử tìm kiếm`,
      icon: SearchNormal,
      link: "/auth/information/search-history",
    },
    {
      id: 54,
      name: `Lịch sử quà tặng`,
      icon: Gift,
      link: "/auth/information/gift-history",
    },
    {
      id: 542323,
      name: `Lịch sử đơn hàng`,
      icon: ShoppingBag,
      link: "/auth/information/order-history",
    },
    {
      id: 323,
      name: `Đổi mật khẩu`,
      icon: Lock,
      link: "/auth/setting/change-password",
    },
  ];

  const handleChangeSidebar = (value: any) => {
    if (value == "/profile/logout") {
      console.log("check1");

      setOpenAlertDialog(true);
    } else {
      router.push(value);
      console.log("check2");
    }
  };

  const handeNav = () => {};

  return (
    <div className="w-full bg-white">
      <div className="pt-4 lg:h-screen grid xl:grid-cols-12 lg:grid-cols-14 grid-cols-12 xxl:gap-6 xl:gap-4 gap-8 container">
        <div className="xl:col-span-2 lg:col-span-3 col-span-12">
          <div className="sticky 3xl:top-[110px] top-[102px] flex flex-col 3xl:gap-4 gap-3 pb-4">
            <div className="flex flex-col 3xl:gap-3 gap-2 justify-center items-center caret-transparent">
              <div className="3xl:w-24 3xl:h-24 w-20 h-20 rounded-full">
                <Input
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (event.target.files && event.target.files?.length > 0) {
                      onSubmitChangeAvatar(event.target.files[0]);
                    }
                  }}
                  accept="image/*, application/pdf"
                  id={"avatar"}
                  type="file"
                  multiple
                  className="hidden"
                />
                <Label
                  htmlFor="avatar"
                  className="relative cursor-pointer group"
                >
                  <AvatarCustom
                    avatar={
                      informationUser?.client_image ??
                      "/avatar/avatar_default.png"
                    }
                    classNameContainer="size-full"
                  />
                  <div className="absolute bottom-0 right-0 border-2 border-white 3xl:size-9 size-8 p-1.5 bg-[#07A6FF] rounded-full flex justify-center items-center">
                    <Camera variant="Bold" className="size-full text-white" />
                  </div>
                </Label>
              </div>

              {isLoadingRefreshInfo ? (
                <Skeleton className="w-[60%] 3xl:h-7 h-6" />
              ) : (
                <div className="w-fit text-default text-[#333538] font-bold">
                  {informationUser?.company}
                </div>
              )}

              {informationUser?.status_sunfil !== "0" ? (
                <p className="whitespace-nowrap text-xs text-success-main font-medium bg-success-lighter/50 rounded-full px-2 py-1">
                  Đã xác thực
                </p>
              ) : (
                <p className="whitespace-nowrap text-xs text-error-main font-medium bg-error-lighter/50 rounded-full px-2 py-1">
                  Chưa xác thực
                </p>
              )}
            </div>

            {isVisibleTablet ? (
              <Select
                value={
                  pathname !== "/profile/logout"
                    ? listSidebar.find((item) =>
                        pathname?.startsWith(item.link)
                      )?.link || ""
                    : ""
                }
                onValueChange={(value) => {
                  handleChangeSidebar(value);
                }}
              >
                <SelectTrigger className="w-full focus:outline-none focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="">
                    {listSidebar &&
                      listSidebar.map((item) => {
                        const checkActive =
                          pathname?.startsWith(item.link) ||
                          pathname === item.link;

                        return (
                          <SelectItem
                            key={`nav-${item.id}`}
                            value={`${item.link}`}
                            className="flex flex-row items-center"
                          >
                            {item.link !== "/profile/logout" ? (
                              <div
                                key={item.id}
                                className="flex items-center gap-3 cursor-pointer w-fit hover:opacity-90 duration-200 transition group"
                              >
                                <div
                                  className={`size-6 max-w-6 
                                                                        ${
                                                                          checkActive
                                                                            ? "text-[#07A6FF]"
                                                                            : "text-[#505458]"
                                                                        } group-hover:text-[#07A6FF] transition-all duration-150 ease-linear`}
                                >
                                  <item.icon
                                    variant={checkActive ? "Bold" : "Linear"}
                                    className="size-full"
                                  />
                                </div>
                                <div
                                  className={`${
                                    pathname?.startsWith(item.link) ||
                                    pathname === item.link
                                      ? "text-[#07A6FF]"
                                      : "text-[#383A43]"
                                  } group-hover:text-[#07A6FF] transition-all duration-150 ease-linear text-base font-semibold`}
                                >
                                  {item.name}
                                </div>
                              </div>
                            ) : (
                              <div
                                className={`3xl:text-lg lg:text-base text-lg text-[#FA3434] font-semibold w-fit cursor-pointer hover:text-[#FA3434]/80 duration-200 transition`}
                              >
                                Đăng xuất
                              </div>
                            )}
                          </SelectItem>
                        );
                      })}
                    <DottedSeparator className="my-2" />

                    <div className="flex items-center justify-center caret-transparent py-2">
                      <div
                        onClick={() => {
                          setOpenAlertDialog(true, "logout");
                          queryKeyIsStateHeader({
                            isShowMenuScreen: false,
                          });
                        }}
                        className={`text-sm-default text-[#FA3434] hover:text-[#FA3434]/80 font-semibold w-fit cursor-pointer custom-transition`}
                      >
                        Đăng xuất
                      </div>
                    </div>
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <React.Fragment>
                <DottedSeparator className="my-2" />
                {/* <Separator className='my-2' /> */}

                {listNavbar &&
                  listNavbar.map((e) => {
                    return (
                      <div
                        key={e.id}
                        className="flex flex-col 3xl:gap-4 gap-3 caret-transparent"
                      >
                        <div className="text-sm-default uppercase font-normal text-[#808990]">
                          {e.lable}
                        </div>

                        <div className="flex flex-col 3xl:gap-4 gap-3">
                          {e.list?.map((item, index) => {
                            const checkActive =
                              pathname?.startsWith(item.link) ||
                              pathname === item.link;
                            return (
                              <Link
                                key={item.id}
                                href={item.link}
                                onClick={() => handeNav()}
                                className="flex items-center gap-2 cursor-pointer w-fit hover:opacity-90 duration-200 transition group"
                              >
                                <div
                                  className={`3xl:size-6 size-5 3xl:max-w-6 max-w-5 
                                                                            ${
                                                                              checkActive
                                                                                ? "text-[#07A6FF]"
                                                                                : "text-[#505458]"
                                                                            } group-hover:text-[#07A6FF] transition-all duration-150 ease-linear`}
                                >
                                  <item.icon
                                    variant={checkActive ? "Bold" : "Linear"}
                                    className="size-full"
                                  />
                                </div>
                                <div
                                  className={`${
                                    pathname?.startsWith(item.link) ||
                                    pathname === item.link
                                      ? "text-[#07A6FF]"
                                      : "text-[#505458]"
                                  } transition-all duration-150 ease-linear group-hover:text-[#07A6FF] text-sm-default font-medium`}
                                >
                                  {item.name}
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                        <DottedSeparator className="my-2" />
                        {/* <Separator className='my-2' /> */}
                      </div>
                    );
                  })}
                <div className="flex items-center justify-center caret-transparent">
                  <div
                    onClick={() => setOpenAlertDialog(true, "logout")}
                    className={`text-sm-default text-[#FA3434] hover:text-[#FA3434]/80 font-semibold w-fit cursor-pointer custom-transition`}
                  >
                    Đăng xuất
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>

        <div
          className={`xl:col-span-10 lg:col-span-11 col-span-12 h-full 3xl:pb-8 pb-6`}
        >
          <ScrollArea
            type="hover"
            className="max-w-full rounded-2xl bg-white 3xl:max-h-[calc(100vh_-_142px)] lg:max-h-[calc(100vh_-_134px)] lg:h-full h-fit"
            style={{
              boxShadow: "0px 0px 80px 0px #0000000A",
            }}
            classNameScrollBar="py-2 mr-2"
          >
            {children}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default LayoutAuth;
