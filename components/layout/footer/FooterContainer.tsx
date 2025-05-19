import { FormatPhoneNumber } from "@/utils/format/FormatNumber";
import React from "react";
import PhoneLink from "../../contact/PhoneLink";
import { useGetDataFooter } from "@/managers/api-management/ui/footer/useGetDataFooter";
import Link from "next/link";
import PlayStoreIcon from "@/components/icons/PlayStoreIcon";
import AppleStoreIcon from "@/components/icons/AppleStoreIcon";

const FooterContainer = () => {
  const { data: dataFooter } = useGetDataFooter({ enebled: true });

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
    <div className='bg-[url("/background/common/footer.jpg")] bg-cover bg-center bg-no-repeat lg:px-[60px] px-4 py-24'>
      <div className="container flex justify-between space-y-1">
        <div className="flex flex-col gap-8 w-1/2">
          <h1 className="text-title-common font-bold uppercase">
            {dataFooter?.company ?? ""}
            {/* Viet Hung Auto Production Trading Joint Stock Company */}
          </h1>
          <div className="text-[#000000] font-normal text-content-common space-y-1">
            <div className="flex items-start gap-1">
              <span className="font-normal text-nowrap">Tax code:</span>
              <span className="font-semibold">{dataFooter?.tax ?? ""}</span>
            </div>
            <div className="flex items-start gap-1">
              <span className="font-normal text-nowrap">Address:</span>
              <span className="font-semibold">
                {" "}
                {dataFooter?.address ?? ""}
              </span>
            </div>
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
        </div>
        <div className="flex flex-col gap-9 w-[160px]">
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
        <div className="flex flex-col gap-9 w-[200px]">
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
        <div className="flex flex-col gap-9">
          <h3 className="text-title-common font-bold">Download App</h3>
          <div className="flex flex-col gap-3">
            <button className="flex items-center gap-2 bg-primary-new text-white rounded-xl px-5 py-2.5">
              <PlayStoreIcon className="size-6" />
              <div className="flex flex-col justify-start">
                <p className="text-sm font-normal text-left">Get It On</p>
                <p className="text-base font-semibold">Google Play Store</p>
              </div>
            </button>
            <button className="flex items-center gap-2 bg-brand-500 text-white rounded-xl px-5 py-2.5">
              <AppleStoreIcon className="size-6" />
              <div className="flex flex-col justify-start">
                <p className="text-sm font-normal text-left">Download from</p>
                <p className="text-base font-semibold">Apple App Store</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterContainer;
