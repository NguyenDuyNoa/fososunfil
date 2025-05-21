import AppleStoreIcon from "@/components/icons/AppleStoreIcon";
import PlayStoreIcon from "@/components/icons/PlayStoreIcon";
import { Select, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/selectCustom";
import { IMAGES } from "@/constants/Images";
import { useGetDataFooter } from "@/managers/api-management/ui/footer/useGetDataFooter";
import { useStateHeader } from "@/states/Header/useStateHeader";
import { FormatPhoneNumber } from "@/utils/format/FormatNumber";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import PhoneLink from "../../contact/PhoneLink";
import CountryOptions from "../header/CountryOptions";
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
const FooterContainer = () => {
  const { data: dataFooter } = useGetDataFooter({ enebled: true });
  const { isStateHeader } = useStateHeader();
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const selectedOption = dataCountryOptions.find(
    (option) => option.code === isStateHeader.selectedCodeCountry
  );
  const sitemapLinks = [
    { href: "/about-us", text: "About us" },
    { href: "/blogs", text: "Article" },
    { href: "/cart", text: "Cart" },
    { href: "/contact-us", text: "Contact" },
  ];

  const legalLinks = [
    { href: "/privacy-policy", text: "Privacy policy" },
    { href: "/cookie-policy", text: "Cookie policy" },
    { href: "/delivery-policy", text: "Delivery policy" },
    { href: "/faqs", text: "FAQs" },
  ];

  return (
    <div className='bg-[url("/background/common/footer.jpg")] bg-cover bg-center bg-no-repeat py-6 xl:py-24'>
      <div className="container flex flex-col lg:flex-row justify-between gap-6 xl:gap-1">
        <div className="flex flex-col gap-3 xl:gap-8 w-full lg:w-1/2">
          <h1 className="text-sm xl:text-xl font-bold uppercase">
            {dataFooter?.company ?? ""}
          </h1>
          <div className="text-[#000000] font-normal text-sm xl:text-xl space-y-1">
            <div className="flex items-start gap-1">
              <span className="font-normal text-nowrap">Tax code:</span>
              <span className="font-semibold">{dataFooter?.tax ?? ""}</span>
            </div>
            {/* <div className="flex items-start gap-1"> */}
            <div>
              <span className="font-normal text-nowrap">Address:</span>
              <span className="font-semibold">
                {" "}
                {dataFooter?.address ?? ""}
              </span>
            </div>

            {/* </div> */}
            <div className="flex items-start gap-1">
              <span className="font-normal text-nowrap">Phone number:</span>
              <PhoneLink
                phoneNumber={`${dataFooter?.phonenumber ?? ""}`}
                className="font-semibold hover:text-[#07A6FF] custom-transition"
              >
                {FormatPhoneNumber(`${dataFooter?.phonenumber ?? ""}`)}
              </PhoneLink>
            </div>
            <div className="flex items-start gap-1">
              <span className="font-normal text-nowrap">Opening hour:</span>
              <span className="font-semibold">
                09:00 - 22:00 from Mon - Fri
              </span>
              {/* <span className="font-semibold"> {dataFooter?.address ?? ""}</span> */}
            </div>
          </div>
          <Image
            src={IMAGES.boCongThuong}
            alt="bo cong thuong"
            width={500}
            height={250}
            className="w-[200px] h-auto hidden xl:block"
          />
        </div>
        <div className="flex gap-1">
          <div className="flex flex-col gap-9 w-full xl:w-[160px]">
            <h3 className="text-title-common font-bold">Sitemap</h3>
            <div className="flex flex-col gap-2">
              {sitemapLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="group text-secondary-new hover:text-primary-new font-normal hover:font-semibold flex items-center gap-1"
                >
                  <div className="opacity-0 group-hover:opacity-100 border border-primary-new w-0 group-hover:w-4 transition-all duration-300 ease-in-out"></div>
                  <p>{link.text}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-9 w-full xl:w-[200px]">
            <h3 className="text-title-common font-bold">Legal</h3>
            <div className="flex flex-col gap-2">
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="group text-secondary-new hover:text-primary-new font-normal hover:font-semibold flex items-center gap-1"
                >
                  <div className="opacity-0 group-hover:opacity-100 border border-primary-new w-0 group-hover:w-4 transition-all duration-300 ease-in-out"></div>
                  <p>{link.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 xl:gap-9">
          <h3 className="text-title-common font-bold">Download App</h3>
          <div className="flex xl:flex-col gap-3">
            <button className="flex items-center gap-2 bg-primary-new text-white rounded-xl xl:px-5 xl:py-2.5 px-3 py-2 w-full">
              <PlayStoreIcon className="size-6" />
              <div className="flex flex-col justify-start">
                <p className="text-sm font-normal text-left">Get It On</p>
                <p className="text-base font-semibold text-left flex">
                  <span className="hidden xl:block">Google&nbsp; </span>
                  Play Store
                </p>
              </div>
            </button>
            <button className="flex items-center gap-2 bg-brand-500 text-white rounded-xl xl:px-5 xl:py-2.5 px-3 py-2 w-full">
              <AppleStoreIcon className="size-6" />
              <div className="flex flex-col justify-start">
                <p className="text-sm font-normal text-left">Download from</p>
                <p className="text-base font-semibold text-left flex">
                  <span className="hidden xl:block">Apple&nbsp; </span>App Store
                </p>
              </div>
            </button>
          </div>
          <div className="w-full xl:justify-start justify-between flex items-center gap-2 mt-4">
            <Image
              src={IMAGES.boCongThuong}
              alt="bo cong thuong"
              width={500}
              height={250}
              className="w-[150px] h-auto xl:hidden "
            />
            <CountryOptions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterContainer;
