import AvatarCustom from "@/components/avatar/AvatarCustom";
import { DottedSeparator } from "@/components/dotted-separator/dotted-separator";
import IconAccountHeader from "@/components/icon/IconAccountHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useStateLayoutMain } from "@/managers/state-management/layout/useStateLayoutMain";
import { useAlertDialogStore } from "@/stores/useAlertDialogStore";
import { useAuthStore } from "@/stores/useAuthStores";
import {
  ArrowDown2,
  Gift,
  Lock,
  Logout,
  SearchNormal,
  ShoppingBag,
  UserSquare,
} from "iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const dataTabProfile = [
  {
    id: 144324,
    name: `Tài khoản của tôi`,
    icon: UserSquare,
    link: "/auth/information/profile",
  },
  {
    id: 54,
    name: `Lịch sử tìm kiếm`,
    icon: SearchNormal,
    link: "/auth/information/search-history",
  },
  {
    id: 542,
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

const Account = ({
  handleOpenDialog,
}: {
  handleOpenDialog: (value: string, type_device: string) => void;
}) => {
  const pathname = usePathname();
  const { informationUser } = useAuthStore();
  const { isStateLayoutMain, queryKeyIsStateLayoutMain } = useStateLayoutMain();
  const { setOpenAlertDialog } = useAlertDialogStore();

  const handleDropdownChange = (value: boolean) => {
    queryKeyIsStateLayoutMain({
      header: {
        ...isStateLayoutMain?.header,
        openDropdownProfile: value,
      },
    });
  };

  return (
    <>
      {informationUser ? (
        <DropdownMenu
          open={isStateLayoutMain?.header?.openDropdownProfile}
          onOpenChange={(value) => handleDropdownChange(value)}
        >
          <DropdownMenuTrigger className="focus:outline-none focus:ring-0 select-none group">
            <div
              className={`text-white flex gap-2 items-center cursor-pointer font-medium col-span-1 3xl:text-[17px] xxl:text-base xl:text-sm text-sm hover:text-[#0E0E0E] custom-transition`}
            >
              <div className="3xl:size-10 3xl:min-w-10 3xl:min-h-10 size-8 min-w-8 min-h-8 caret-inherit">
                <AvatarCustom
                  classNameContainer="w-full h-full shadow"
                  avatar={
                    informationUser?.client_image ??
                    "/avatar/avatar_default.png"
                  }
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div
                    className={`${
                      isStateLayoutMain?.header?.openDropdownProfile
                        ? "text-[#07A6FF]"
                        : "text-[#333538]"
                    } text-sm-default font-semibold group-hover:text-[#07A6FF] text-nowrap whitespace-nowrap custom-transition`}
                  >
                    {informationUser?.company}
                  </div>
                  <ArrowDown2
                    variant="Bold"
                    className={`${
                      isStateLayoutMain?.header?.openDropdownProfile
                        ? "rotate-180 text-[#07A6FF]"
                        : "text-[#333538]"
                    } group-hover:text-[#07A6FF] size-5 custom-transition`}
                  />
                </div>
                {Number(informationUser?.status_sunfil) !== 0 &&
                informationUser?.phonenumber !== "" ? (
                  <p className="w-fit whitespace-nowrap text-xs text-success-main font-medium bg-success-lighter/50 rounded-full px-2 py-1">
                    Đã xác thực
                  </p>
                ) : (
                  <p className="w-fit whitespace-nowrap text-xs text-error-main font-medium bg-error-lighter/50 rounded-full px-2 py-1">
                    Chưa xác thực
                  </p>
                )}
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="min-w-60 border-none p-4 space-y-2 dark:bg-[#09112B]"
            style={{
              boxShadow:
                "0px 4px 4px 0px #0000004D, 0px 8px 12px 6px #00000026",
            }}
            side="bottom"
            sideOffset={10}
            collisionPadding={{ right: 30 }}
          >
            <div className="flex flex-col items-center justify-center">
              <AvatarCustom
                avatar={
                  informationUser?.client_image ?? "/avatar/avatar_default.png"
                }
                classNameContainer="size-10"
              />

              <div className="text-sm-default text-neutral-500 font-semibold">
                {informationUser?.company}
              </div>

              {Number(informationUser?.status_sunfil) !== 0 &&
              informationUser?.phonenumber !== "" ? (
                <p className="w-fit whitespace-nowrap text-xs text-success-main font-medium bg-success-lighter/50 rounded-full px-2 py-1">
                  Đã xác thực
                </p>
              ) : (
                <p className="w-fit whitespace-nowrap text-xs text-error-main font-medium bg-error-lighter/50 rounded-full px-2 py-1">
                  Chưa xác thực
                </p>
              )}
            </div>

            <DottedSeparator />
            {dataTabProfile &&
              dataTabProfile.map((item: any, index) => {
                const checkActive =
                  pathname?.startsWith(item.link) || pathname === item.link;

                return (
                  <React.Fragment key={`tab-profile-${item.id}`}>
                    {index === 4 && <Separator />}
                    <Link
                      href={item.link ?? ""}
                      className="flex items-center gap-2 group"
                      onClick={() => handleDropdownChange(false)}
                    >
                      <div
                        className={`size-5 max-w-[10%] ${
                          checkActive ? "text-[#07A6FF]" : "text-[#545454]"
                        } transition-all duration-150 ease-linear group-hover:text-[#07A6FF] custom-transition`}
                      >
                        <item.icon
                          variant={checkActive ? "Bold" : "Linear"}
                          className="size-full"
                        />
                      </div>
                      <div
                        className={`text-sm-default ${
                          checkActive ? "text-[#07A6FF]" : "text-[#545454]"
                        } transition-all duration-150 ease-linear group-hover:text-[#07A6FF] custom-transition`}
                      >
                        {item?.name ?? ""}
                      </div>
                    </Link>
                  </React.Fragment>
                );
              })}
            <DottedSeparator />

            <div
              className="flex items-center gap-2 text-red-500  group cursor-pointer"
              onClick={() => {
                setOpenAlertDialog(true, "logout");
                handleDropdownChange(false);
                // router.push("/");
              }}
            >
              <Logout className="size-5 group-hover:text-red-500 hover:text-red-500 custom-transition" />
              <div className="text-default group-hover:text-red-500 hover:text-red-500 custom-transition">
                Đăng xuất
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div
          className="flex items-center gap-2 cursor-pointer hover:bg-brand-50 rounded-full py-1 px-2"
          onClick={() => handleOpenDialog("login", "desktop")}
        >
          <IconAccountHeader fill="#0154C5" className="size-9" />
          <span className="text-sm font-medium whitespace-nowrap text-primary-new">
            Tài khoản
          </span>
        </div>
      )}
    </>
  );
};

export default Account;
