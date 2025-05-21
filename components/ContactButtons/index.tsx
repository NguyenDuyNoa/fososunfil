import ZaloIcon from "@/components/icons/ZaloIcon";
import EmailIcon from "../icons/EmailIcon";
import PhoneIcon from "../icons/PhoneIcon";
import Link from "next/link";

const ContactButtons = () => {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col rounded-l-sm overflow-hidden">
      <Link
        href="https://zalo.me/0901136968"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-brand-500 p-1.5 lg:p-3 flex justify-center items-center border-b border-brand-400 hover:opacity-80 transition"
      >
        <ZaloIcon className="text-white size-4 lg:size-6" />
      </Link>

      <Link
        href="tel:0901136968"
        className="bg-brand-500 p-1.5 lg:p-3 flex justify-center items-center border-b border-brand-400 hover:opacity-80 transition"
      >
        <PhoneIcon className="text-white size-4 lg:size-6" />
      </Link>

      <Link
        href="mailto:info@fososoft.com"
        className="bg-brand-500 p-1.5 lg:p-3 flex justify-center items-center hover:opacity-80 transition"
      >
        <EmailIcon className="text-white size-4 lg:size-6" />
      </Link>
    </div>
  );
};

export default ContactButtons;
