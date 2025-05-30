import { Brand } from "@/types/home/IHome";
import { motion } from "framer-motion";
import Image from "next/image";

type BrandListProps = {
  brands: Brand[];
};
const BrandList = ({ brands = [] }: BrandListProps) => {
  return (
    <div className="container">
      <div className="relative w-full overflow-hidden bg-[#F4F6F8]">
        <div className="flex">
          <motion.div
            className="flex gap-2 lg:gap-3 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {Array.isArray(brands) && [...brands, ...brands]?.map((brand: Brand, index: any) => (
              <div
                key={index}
                className="w-[64px] lg:w-[133px] p-1 lg:p-2.5 aspect-square bg-white rounded-sm lg:rounded-xl border border-[#919EAB] border-opacity-20 flex flex-col items-center justify-center hover:shadow-md transition-all duration-300"
              >
                {/* <div className="w-[120px] h-[120px] relative"> */}
                <Image
                  width={500}
                  height={500}
                  src={brand.image}
                  alt={brand.name}
                  className="object-cover w-full"
                />
                {/* </div> */}
                <div className="w-full h-[1px] bg-[#919EAB] bg-opacity-20 my-[4px] lg:my-[5px]" />
                <p className="text-[7px]/[11px] lg:text-base font-medium text-[#454F5B]">
                  {brand.name}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BrandList;
