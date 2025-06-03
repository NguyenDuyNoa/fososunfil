import { CustomCheckbox } from "@/components/customCheckbox";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/selectCustom";

// Mock data cho thành phố, quận huyện, phường xã
const mockCities = [
  { id: "1", value: "hanoi", label: "Hà Nội" },
  { id: "2", value: "hochiminh", label: "Hồ Chí Minh" },
  { id: "3", value: "danang", label: "Đà Nẵng" },
];

const mockDistricts = {
  hanoi: [
    { id: "h1", value: "badinh", label: "Ba Đình" },
    { id: "h2", value: "caugiay", label: "Cầu Giấy" },
    { id: "h3", value: "dongda", label: "Đống Đa" },
  ],
  hochiminh: [
    { id: "hcm1", value: "quan1", label: "Quận 1" },
    { id: "hcm2", value: "quan2", label: "Quận 2" },
    { id: "hcm3", value: "quan3", label: "Quận 3" },
  ],
  danang: [
    { id: "dn1", value: "haichau", label: "Hải Châu" },
    { id: "dn2", value: "sontra", label: "Sơn Trà" },
    { id: "dn3", value: "nguhanhson", label: "Ngũ Hành Sơn" },
  ],
};

const mockWards = {
  badinh: [
    { id: "bd1", value: "phucxa", label: "Phúc Xá" },
    { id: "bd2", value: "trungphung", label: "Trúc Phụng" },
  ],
  caugiay: [
    { id: "cg1", value: "dichvong", label: "Dịch Vọng" },
    { id: "cg2", value: "maidinh", label: "Mai Dịch" },
  ],
  dongda: [
    { id: "dd1", value: "catlinh", label: "Cát Linh" },
    { id: "dd2", value: "vanhoa", label: "Văn Hoa" },
  ],
  quan1: [
    { id: "q11", value: "bennghe", label: "Bến Nghé" },
    { id: "q12", value: "benthanhq1", label: "Bến Thành" },
  ],
  quan2: [
    { id: "q21", value: "thaodiena", label: "Thảo Điền" },
    { id: "q22", value: "anphu", label: "An Phú" },
  ],
  quan3: [
    { id: "q31", value: "phuongthai", label: "Phường Thái" },
    { id: "q32", value: "phuongnguyen", label: "Phường Nguyễn" },
  ],
  haichau: [
    { id: "hc1", value: "thachthang", label: "Thạch Thang" },
    { id: "hc2", value: "haichauhc", label: "Hải Châu" },
  ],
  sontra: [
    { id: "st1", value: "mantra", label: "Mân Trà" },
    { id: "st2", value: "thokhe", label: "Thọ Khê" },
  ],
  nguhanhson: [
    { id: "nhs1", value: "mykhue", label: "Mỹ Khuê" },
    { id: "nhs2", value: "khuemy", label: "Khuê Mỹ" },
  ],
};

const DeliveryInformation = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [availableDistricts, setAvailableDistricts] = useState<any[]>([]);
  const [availableWards, setAvailableWards] = useState<any[]>([]);

  // Cập nhật quận/huyện khi thành phố thay đổi
  useEffect(() => {
    if (selectedCity) {
      setAvailableDistricts(mockDistricts[selectedCity as keyof typeof mockDistricts] || []);
      setSelectedDistrict("");
      setSelectedWard("");
      setAvailableWards([]);
    } else {
      setAvailableDistricts([]);
      setSelectedDistrict("");
      setSelectedWard("");
      setAvailableWards([]);
    }
  }, [selectedCity]);

  // Cập nhật phường/xã khi quận/huyện thay đổi
  useEffect(() => {
    if (selectedDistrict) {
      setAvailableWards(mockWards[selectedDistrict as keyof typeof mockWards] || []);
      setSelectedWard("");
    } else {
      setAvailableWards([]);
      setSelectedWard("");
    }
  }, [selectedDistrict]);

  // CSS chung cho input
  const inputClassName = "w-full px-[14px] py-4 text-sm font-normal text-primary-new placeholder:text-disable-50 border border-[#919EAB33] rounded-lg focus:outline-none focus:border-brand-600 transition-colors";
  
  // CSS chung cho select trigger
  const selectClassName = "w-full px-[14px] py-3.5 text-sm font-normal text-primary-new placeholder:text-disable-50 border border-[#919EAB33] rounded-lg focus:outline-none focus:border-brand-600 transition-colors focus:ring-0 focus:ring-offset-0 h-auto data-[state=open]:border-brand-600 data-[state=open]:ring-0";

  return (
    <div className="p-3 py-6 xl:p-6 w-full h-fit bg-white xl:rounded-xl shadow-sm flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-primary-new">
        Thông tin giao hàng
      </h2>
      <form action="" className="flex flex-col gap-3 xl:gap-6">
        <div className="flex flex-col xl:flex-row items-center gap-3 xl:gap-4">
          <input
            type="text"
            placeholder="Họ tên người nhận hàng"
            className={inputClassName}
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            className={inputClassName}
          />
        </div>
        <input
          type="text"
          placeholder="E-mail (không bắt buộc)"
          className={inputClassName}
        />
        <div className="flex flex-col xl:flex-row items-center gap-3 xl:gap-4">
          <Select
            value={selectedCity}
            onValueChange={(value: string) => setSelectedCity(value)}
          >
            <SelectTrigger className={selectClassName}>
              {selectedCity ? mockCities.find(city => city.value === selectedCity)?.label : "Chọn thành phố"}
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="space-y-2">
                {mockCities.map((city) => (
                  <SelectItem
                    key={city.id}
                    value={city.value}
                    className="w-full block focus:bg-[#98E6F6]/30 px-2 text-sm cursor-pointer"
                  >
                    <div className="flex justify-between w-full">
                      <div className="font-normal">{city.label}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={selectedDistrict}
            onValueChange={(value: string) => setSelectedDistrict(value)}
            disabled={!selectedCity}
          >
            <SelectTrigger className={selectClassName}>
              {selectedDistrict ? availableDistricts.find(district => district.value === selectedDistrict)?.label : "Quận/huyện"}
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="space-y-2">
                {availableDistricts.map((district) => (
                  <SelectItem
                    key={district.id}
                    value={district.value}
                    className="w-full block focus:bg-[#98E6F6]/30 px-2 text-sm cursor-pointer"
                  >
                    <div className="flex justify-between w-full">
                      <div className="font-normal">{district.label}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={selectedWard}
            onValueChange={(value: string) => setSelectedWard(value)}
            disabled={!selectedDistrict}
          >
            <SelectTrigger className={selectClassName}>
              {selectedWard ? availableWards.find(ward => ward.value === selectedWard)?.label : "Phường/xã"}
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="space-y-2">
                {availableWards.map((ward) => (
                  <SelectItem
                    key={ward.id}
                    value={ward.value}
                    className="w-full block focus:bg-[#98E6F6]/30 px-2 text-sm cursor-pointer"
                  >
                    <div className="flex justify-between w-full">
                      <div className="font-normal">{ward.label}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <input
          type="text"
          placeholder="Nhập địa chỉ cụ thể"
          className={inputClassName}
        />
        <input
          type="text"
          placeholder="Ghi chú thêm cho đơn hàng (không bắt buộc)"
          className={inputClassName}
        />
        <CustomCheckbox
          id="delivery"
          stroke="#637381"
          label="Yêu cầu xuất hoá đơn điện tử"
          checked={false}
          onChange={() => {}}
        />
      </form>
    </div>
  );
};

export default DeliveryInformation;
