import { CustomCheckbox } from "@/components/customCheckbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/selectCustom";
import { useGetListDistrict } from "@/managers/api-management/order/useGetListDistrict";
import { useGetListProvince } from "@/managers/api-management/order/useGetListProvince";
import { useGetListWard } from "@/managers/api-management/order/useGetListWard";
import { useAuthStore } from "@/stores/useAuthStores";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { z } from "zod";

// Schema xác thực cho thông tin giao hàng
const deliverySchema = z.object({
  customerName: z.string().min(1, "Vui lòng nhập họ tên người nhận"),
  phone: z
    .string()
    .min(10, "Số điện thoại không hợp lệ")
    .max(11, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  province: z.string().min(1, "Vui lòng chọn thành phố"),
  district: z.string().min(1, "Vui lòng chọn quận/huyện"),
  ward: z.string().min(1, "Vui lòng chọn phường/xã"),
  address: z.string().min(1, "Vui lòng nhập địa chỉ cụ thể"),
  note: z.string().optional(),
  needInvoice: z.boolean(),
});

// Kiểu dữ liệu từ schema
type DeliveryFormData = z.infer<typeof deliverySchema>;

const DeliveryInformation = forwardRef((props, ref) => {
  const { informationUser } = useAuthStore();

  // Khởi tạo state với giá trị từ informationUser
  const [selectedCity, setSelectedCity] = useState<string>(informationUser?.shipping?.city_shipping || "");
  const [selectedDistrict, setSelectedDistrict] = useState<string>(informationUser?.shipping?.district_shipping || "");
  const [selectedWard, setSelectedWard] = useState<string>(informationUser?.shipping?.ward_shipping || "");
  const [customerName, setCustomerName] = useState<string>(informationUser?.shipping?.name || "");
  const [phone, setPhone] = useState<string>(informationUser?.shipping?.phone || "");
  const [email, setEmail] = useState<string>(informationUser?.shipping?.email || "");
  const [address, setAddress] = useState<string>(informationUser?.shipping?.address || "");
  const [note, setNote] = useState<string>("");
  const [needInvoice, setNeedInvoice] = useState<boolean>(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof DeliveryFormData, string>>
  >({});

  const { data: listProvince } = useGetListProvince();
  const { data: listDistrict } = useGetListDistrict(selectedCity);
  const { data: listWard } = useGetListWard(selectedDistrict);

  // Cập nhật state khi informationUser thay đổi
  useEffect(() => {
    if (informationUser?.shipping) {
      setCustomerName(informationUser.shipping.name || informationUser.company || "");
      setPhone(informationUser.shipping.phone || informationUser.phonenumber || "");
      setEmail(informationUser.shipping.email || informationUser.email_client || "");
      setAddress(informationUser.shipping.address || "");
      setSelectedCity(informationUser.shipping.city_shipping || "");
      setSelectedDistrict(informationUser.shipping.district_shipping || "");
      setSelectedWard(informationUser.shipping.ward_shipping || "");
    }
  }, [informationUser]);

  // Cập nhật quận/huyện khi thành phố thay đổi
  useEffect(() => {
    if (selectedCity) {
      // Nếu đổi tỉnh/thành phố, reset quận/huyện và phường/xã
      if (selectedCity !== informationUser?.shipping?.city_shipping) {
        setSelectedDistrict("");
        setSelectedWard("");
      }
    } else {
      // Nếu không có tỉnh/thành phố, cũng reset quận/huyện và phường/xã
      setSelectedDistrict("");
      setSelectedWard("");
    }
  }, [selectedCity, informationUser?.shipping?.city_shipping]);

  useEffect(() => {
    if (selectedDistrict) {
      if (selectedDistrict !== informationUser?.shipping?.district_shipping) {
        setSelectedWard("");
      }
    } else {
      setSelectedWard("");
    }
  }, [selectedDistrict, informationUser?.shipping?.district_shipping]);
  
  // Hàm xác thực từng trường riêng lẻ
  const validateField = (field: keyof DeliveryFormData, value: any) => {
    try {
      const fieldSchema = deliverySchema.shape[field];
      fieldSchema.parse(value);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }));
      }
    }
  };

  // Cập nhật và xác thực khi thay đổi giá trị
  const handleCustomerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomerName(value);
    validateField("customerName", value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    validateField("phone", value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateField("email", value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
    validateField("address", value);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    validateField("province", value);
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    validateField("district", value);
  };

  const handleWardChange = (value: string) => {
    setSelectedWard(value);
    validateField("ward", value);
  };

  // Hàm xác thực dữ liệu
  const validateForm = () => {
    try {
      deliverySchema.parse({
        customerName,
        phone,
        email,
        province: selectedCity,
        district: selectedDistrict,
        ward: selectedWard,
        address,
        note,
        needInvoice,
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Partial<Record<keyof DeliveryFormData, string>> =
          {};
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof DeliveryFormData;
          formattedErrors[path] = err.message;
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  useImperativeHandle(ref, () => ({
    getDeliveryInfo: () => {
      // Kiểm tra xác thực dữ liệu trước khi trả về
      if (!validateForm()) {
        return null;
      }

      return {
        customerName,
        phone,
        email,
        province: selectedCity,
        district: selectedDistrict,
        ward: selectedWard,
        address,
        note,
        needInvoice,
      };
    },
  }));

  // CSS chung cho input
  const inputClassName =
    "w-full px-[14px] py-4 text-sm font-normal text-primary-new placeholder:text-disable-50 border border-[#919EAB33] rounded-lg focus:outline-none focus:border-brand-600 transition-colors";

  // CSS chung cho select trigger
  const selectClassName =
    "w-full px-[14px] py-3.5 text-sm font-normal text-primary-new placeholder:text-disable-50 border border-[#919EAB33] rounded-lg focus:outline-none focus:border-brand-600 transition-colors focus:ring-0 focus:ring-offset-0 h-auto data-[state=open]:border-brand-600 data-[state=open]:ring-0";

  // CSS cho thông báo lỗi
  const errorClassName = "text-red-500 text-xs mt-1";

  return (
    <div className="p-3 py-6 xl:p-6 w-full h-fit bg-white xl:rounded-xl shadow-sm flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-primary-new">
        Thông tin giao hàng
      </h2>
      <form action="" className="flex flex-col gap-3 xl:gap-6">
        <div className="flex flex-col xl:flex-row items-start gap-3 xl:gap-4">
          <div className="w-full">
            <input
              type="text"
              placeholder="Họ tên người nhận hàng"
              className={`${inputClassName} ${
                errors.customerName ? "border-red-500" : ""
              }`}
              value={customerName}
              onChange={handleCustomerNameChange}
            />
            {errors.customerName && (
              <p className={errorClassName}>{errors.customerName}</p>
            )}
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Số điện thoại"
              className={`${inputClassName} ${
                errors.phone ? "border-red-500" : ""
              }`}
              value={phone}
              onChange={handlePhoneChange}
            />
            {errors.phone && <p className={errorClassName}>{errors.phone}</p>}
          </div>
        </div>
        <div className="w-full">
          <input
            type="text"
            placeholder="E-mail (không bắt buộc)"
            className={`${inputClassName} ${
              errors.email ? "border-red-500" : ""
            }`}
            value={email}
            onChange={handleEmailChange}
          />
          {errors.email && <p className={errorClassName}>{errors.email}</p>}
        </div>
        <div className="flex flex-col xl:flex-row items-start gap-3 xl:gap-4">
          <div className="w-full">
            <Select value={selectedCity} onValueChange={handleCityChange}>
              <SelectTrigger
                className={`${selectClassName} ${
                  errors.province ? "border-red-500" : ""
                }`}
              >
                {selectedCity
                  ? listProvince?.data?.find(
                      (city: any) => city.provinceid === selectedCity
                    )?.name
                  : "Chọn thành phố"}
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="space-y-2">
                  {listProvince?.data?.map((city: any) => (
                    <SelectItem
                      key={city.provinceid}
                      value={city.provinceid}
                      className="w-full block focus:bg-[#98E6F6]/30 px-2 text-sm cursor-pointer"
                    >
                      <div className="flex justify-between w-full">
                        <div className="font-normal">{city.name}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.province && (
              <p className={errorClassName}>{errors.province}</p>
            )}
          </div>

          <div className="w-full">
            <Select
              value={selectedDistrict}
              onValueChange={handleDistrictChange}
              disabled={!selectedCity}
            >
              <SelectTrigger
                className={`${selectClassName} ${
                  errors.district ? "border-red-500" : ""
                }`}
              >
                {selectedDistrict
                  ? listDistrict?.data?.find(
                      (district: any) =>
                        district.districtid === selectedDistrict
                    )?.name
                  : "Quận/huyện"}
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="space-y-2">
                  {listDistrict?.data?.map((district: any) => (
                    <SelectItem
                      key={district.districtid}
                      value={district.districtid}
                      className="w-full block focus:bg-[#98E6F6]/30 px-2 text-sm cursor-pointer"
                    >
                      <div className="flex justify-between w-full">
                        <div className="font-normal">{district.name}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.district && (
              <p className={errorClassName}>{errors.district}</p>
            )}
          </div>

          <div className="w-full">
            <Select
              value={selectedWard}
              onValueChange={handleWardChange}
              disabled={!selectedDistrict}
            >
              <SelectTrigger
                className={`${selectClassName} ${
                  errors.ward ? "border-red-500" : ""
                }`}
              >
                {selectedWard
                  ? listWard?.data?.find(
                      (ward: any) => ward.wardid === selectedWard
                    )?.name
                  : "Phường/xã"}
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="space-y-2">
                  {listWard?.data?.map((ward: any) => (
                    <SelectItem
                      key={ward.wardid}
                      value={ward.wardid}
                      className="w-full block focus:bg-[#98E6F6]/30 px-2 text-sm cursor-pointer"
                    >
                      <div className="flex justify-between w-full">
                        <div className="font-normal">{ward.name}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.ward && <p className={errorClassName}>{errors.ward}</p>}
          </div>
        </div>
        <div className="w-full">
          <input
            type="text"
            placeholder="Nhập địa chỉ cụ thể"
            className={`${inputClassName} ${
              errors.address ? "border-red-500" : ""
            }`}
            value={address}
            onChange={handleAddressChange}
          />
          {errors.address && <p className={errorClassName}>{errors.address}</p>}
        </div>
        <input
          type="text"
          placeholder="Ghi chú thêm cho đơn hàng (không bắt buộc)"
          className={inputClassName}
          value={note}
          onChange={handleNoteChange}
        />
        <CustomCheckbox
          id="delivery"
          stroke="#637381"
          label="Yêu cầu xuất hoá đơn điện tử"
          checked={needInvoice}
          onChange={() => setNeedInvoice(!needInvoice)}
        />
      </form>
    </div>
  );
});

DeliveryInformation.displayName = "DeliveryInformation";

export default DeliveryInformation;
