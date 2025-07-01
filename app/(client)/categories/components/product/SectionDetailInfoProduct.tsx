import Image from 'next/image';
import React, { useState } from 'react'

import { IDetailCodeProduct } from '@/types/products/IProducts';
import TableDetailCodeProduct from './TableDetailCodeProduct';
import { X } from 'lucide-react';

import { motion } from 'framer-motion'
import { useCartStore } from '@/stores/useCartStore';

type Props = {
    data: IDetailCodeProduct
}

const SectionDetailInfoProduct = ({ data }: Props) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // Hàm đóng modal
    const handleTogglePreview = (type: string, data?: any) => {
        const body = document.body;

        if (type === "on") {
            setPreviewImage(data?.images ?? "/default/default.png")
            body.style.overflow = 'hidden'; // Chặn cuộn
        } else {
            setPreviewImage(null)
            body.style.overflow = 'auto'; // Cho phép cuộn
        }
    };

    const { addToCartBuyNow } = useCartStore();

    const handleBuyNow = async () => {
        if (data && data.product_id) {
          await addToCartBuyNow(data?.product_id , 1);
        }
      };
    
      return (
        <div className='flex flex-col md:gap-6 gap-8 w-full'>
            <div className='text-title-detail-product font-bold w-fit'>
                {data?.name ?? ""}
            </div>

            <div className='bg-white 3xl:p-12 md:p-10 p-4 grid grid-cols-12 md:gap-0 gap-6 h-fit'>
                <div
                    className='md:col-span-3 col-span-12 flex flex-col gap-4 w-full h-auto md:min-h-[200px] min-h-[230px] xl:h-full relative cursor-pointer'
                >
                    <Image
                        onClick={() => handleTogglePreview('on', data)}
                        src={data?.images ?? "/default/default.png"}
                        width={600}
                        height={400}
                        alt="image"
                        className='relative size-full object-cover'
                    />
                    <button
                        className="bg-brand-500 rounded-lg w-full py-2 px-2 text-white text-sm xl:text-base font-bold hover:bg-brand-400 transition-colors duration-300"
                        onClick={handleBuyNow}
                        // disabled={isLoading}
                    >
                        Đặt hàng
                    </button>
                </div>
                <div className='md:col-span-9 col-span-12 flex flex-col 3xl:gap-6 gap-4 md:pl-20 '>
                    <div className='flex flex-col gap-4'>
                        <div className='text-title-common-product font-bold'>
                            Technical Specifications
                        </div>

                        <div className='grid grid-cols-2 gap-y-4 gap-x-2'>
                            {
                                data && data?.specification?.map((item, index) => (
                                    <div
                                        key={`specification-${index}`}
                                        className='flex items-center md:justify-start justify-between gap-4 md:col-span-1 col-span-2'
                                        style={{
                                            order: item.order_by ?? "initial"
                                        }}
                                    >
                                        <div className='text-content-common text-[#1A1B20]/[64%] font-normal 2xl:w-[40%] xl:w-[48%] lg:w-[45%] w-[50%]'>
                                            {item?.name ?? ""}
                                        </div>

                                        <div className='text-title-common text-[#272727] font-bold md:text-start text-end 2xl:w-[60%] xl:w-[52%] lg:w-[55%] w-[50%]'>
                                            {item?.is_value ?? ""}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {/* <Separator />

                                <div className='flex flex-col gap-4'>
                                    <div className='text-title-common-product font-bold'>
                                        Couple filter
                                    </div>

                                    <div className='flex flex-wrap items-center gap-3'>
                                        {
                                            dataCodeProduct && data?.couple_filter?.map((item, index) => (
                                                <div
                                                    key={`couple-filter-${index}`}
                                                    className='text-content-common py-2 px-4 border border-[#57A4FE] text-[#57A4FE] font-medium cursor-default'
                                                >
                                                    {item.code}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div> */}
                </div>
            </div>

            <div className='bg-white 3xl:p-12 md:p-10 p-4 flex flex-col 3xl:gap-6 gap-4'>
                <div className='text-title-common-product font-bold'>
                    Cross reference
                </div>

                <div className='grid lg:grid-cols-3 grid-cols-2 w-full'>
                    {
                        data && data?.reference?.map((item, index) => (
                            <div
                                key={`reference-${index}`}
                                className={`flex items-center md:justify-start justify-between gap-4 py-2 md:col-span-1 col-span-2
                                    ${(index + 1) % 3 !== 0 && index !== data?.reference?.length - 1 ? 'lg:border-r lg:border-gray-300' : ''}
                                    ${(index + 1) % 3 !== 1 ? '2xl:px-10 xl:px-8 lg:px-6' : ''}`}
                            >
                                <div className='text-content-common text-[#1A1B20]/[64%] font-normal 3xl:w-[35%] 2xl:w-[40%] xl:w-[48%] lg:w-[45%] w-[50%]'>
                                    {item?.name ?? ""}
                                </div>

                                <div className='text-title-common text-[#272727] font-bold md:text-start text-end md:w-auto w-[50%]'>
                                    {item?.is_value ?? ""}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Modal Preview Image */}
            {
                previewImage && (
                    <div className='fixed inset-0 flex justify-center items-center z-50'>
                        {/* <div className='fixed inset-0 flex justify-center items-center z-50'> */}
                        <div
                            className='absolute top-0 left-0 size-full bg-black bg-opacity-50'
                            onClick={() => handleTogglePreview('off')}
                        />

                        <button
                            className='absolute top-8 right-8 text-white size-10 border rounded-full p-1.5 hover:text-white/60 hover:border-white/60 custom-transition'
                            onClick={() => handleTogglePreview('off')}
                        >
                            <X className='size-full' />
                        </button>

                        <div className='relative flex items-center justify-center'>
                            <motion.div
                                exit={{
                                    y: -20,
                                    opacity: 0,
                                    filter: "blur(5px)",
                                    transition: { ease: "easeIn", duration: 0.22 }
                                }}
                                initial={{ opacity: 0, y: -15 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    filter: "blur(0px)",
                                    transition: { type: "spring", duration: 0.7 }
                                }}
                                className='3xl:h-[833px] h-[630px] w-auto'
                            >
                                <Image
                                    src={previewImage}
                                    width={1440}
                                    height={833}
                                    alt="Preview"
                                    className='size-full object-contain'
                                />
                            </motion.div>

                            {/* <div className='3xl:h-[833px] h-[630px] w-auto'>
                            </div> */}
                        </div>
                    </div>
                )
            }
            <TableDetailCodeProduct data={data} />
        </div >
    )
}

export default SectionDetailInfoProduct