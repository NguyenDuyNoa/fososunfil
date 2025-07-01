import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import { Select, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/selectCustom";
import { useLanguage } from "@/context/LanguageProvider";
import { useStateHeader } from "@/states/Header/useStateHeader";
import useCookieStore from "@/stores/useCookieStore";
import Image from "next/image";
import { useEffect, useState } from "react";

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

interface CountryOptionsProps {
  textColor?: string;
  sizeIcon?: string;
}

const CountryOptions = ({
  textColor = "text-primary-new",
  sizeIcon = "size-9",
}: CountryOptionsProps) => {
  const { setCookie } = useCookieStore();
  const { isStateHeader, queryKeyIsStateHeader } = useStateHeader();
  const { setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = dataCountryOptions.find(
    (option) => option.code === isStateHeader.selectedCodeCountry
  );

  useEffect(() => {
    // Chỉ khởi tạo ngôn ngữ mặc định nếu chưa có ngôn ngữ nào được chọn
    if (!isStateHeader.selectedCodeCountry) {
      queryKeyIsStateHeader({
        selectedCodeCountry: dataCountryOptions[0].code,
      });
      setLanguage(dataCountryOptions[0].code);
    }
  }, []);

  const handleCodeChange = (value: string) => {
    queryKeyIsStateHeader({
      selectedCodeCountry: value,
    });
    setLanguage(value);
    setCookie("googletranslate", value);

    // Reload trang khi chuyển từ tiếng Anh sang tiếng Việt (ai code sau có cách tốt hơn thì sửa nha)
    if (isStateHeader.selectedCodeCountry === "en" && value === "vi") {
      window.location.reload();
    }
  };

  return (
    <div className="flex items-center w-fit p-1 hover:bg-brand-50 transition-colors duration-300 rounded-full">
      <Select
        value={selectedOption?.code}
        onValueChange={handleCodeChange}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <SelectTrigger className="p-0 flex items-center gap-2 h-full border-none shadow-none focus:outline-none focus:ring-0 focus:ring-offset-0">
          {selectedOption && (
            <>
              <div className={`${sizeIcon} rounded-full`}>
                <Image
                  src={selectedOption.flag}
                  alt={`${selectedOption.country} flag`}
                  width={100}
                  height={100}
                  className="size-full object-cover rounded-full"
                />
              </div>
              <div
                className={`text-sm uppercase font-medium ${
                  textColor || "text-primary-new"
                }`}
              >
                {selectedOption.code}
              </div>
              <ArrowUpIcon
                className={`size-4 ${textColor || "text-primary-new"} ${
                  isOpen ? "" : "rotate-180"
                } transition-all duration-300`}
              />
            </>
          )}
        </SelectTrigger>
        <SelectContent>
          {dataCountryOptions.map((option) => (
            <SelectItem key={option.code} value={option.code}>
              {option.country} ({option.code})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountryOptions;
