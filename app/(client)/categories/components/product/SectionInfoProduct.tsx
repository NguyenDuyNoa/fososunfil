import Link from 'next/link';
import Image from 'next/image';
import React from 'react'

import { useStateCategories } from '../../_state/useStateCategories';

import { useResizeStore } from '@/stores/useResizeStore';
import { useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { IDetailCodeProduct, IFullCodeProduct } from '@/types/products/IProducts';
import SectionDetailInfoProduct from './SectionDetailInfoProduct';

type Props = {}

const dataHeaderTableArray = [
    {
        id: "reference_number",
        name: "Reference Number",
        icon: "",
    },
    {
        id: "manufacturer",
        name: "Manufacturer",
        icon: "",
    },
    {
        id: "filter_type",
        name: "Filter Type",
        icon: "",
    },
]

const SectionInfoProduct = (props: Props) => {
    const queryClient = useQueryClient()
    const codeParam = useSearchParams()?.get('code') ?? ""
    const type = useSearchParams()?.get('type') ?? ""

    const { isVisibleMobile } = useResizeStore()

    const dataCodeProduct = queryClient.getQueryData(["postCodeProductRelative", codeParam]) as IFullCodeProduct
    const dataDetailCodeProduct = queryClient.getQueryData(["getCodeProductAbsolute", codeParam]) as IDetailCodeProduct

    return (
        <>
            {
                type !== "list" || type === "list" && dataCodeProduct?.data_active ?
                    (
                        type === "list" && dataCodeProduct?.data_active
                            ?
                            <SectionDetailInfoProduct data={dataCodeProduct?.data_active} />
                            :
                            <SectionDetailInfoProduct data={dataDetailCodeProduct} />
                    )
                    :
                    (
                        <div className='bg-white'>
                            <div className='grid grid-cols-3 border-b'>
                                {
                                    dataHeaderTableArray && dataHeaderTableArray.map((item) => (
                                        <div
                                            key={`header-${item.id}`}
                                            className='col-span-1 flex items-center justify-center gap-2 w-full py-4'
                                        >
                                            {
                                                item.icon &&
                                                <div className='size-6'>
                                                    <Image
                                                        width={100}
                                                        height={100}
                                                        alt="icon"
                                                        className='size-full object-contain filter grayscale-[1] brightness-[2]'
                                                        src={item?.icon ?? "/default/default.png"}
                                                    />
                                                </div>
                                            }

                                            <div className='text-title-common text-[#000000] font-bold'>
                                                {item?.name ?? ""}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            {
                                dataCodeProduct && dataCodeProduct?.data?.map((item, index) => (
                                    <div
                                        key={`code-${item.id}`}
                                        className={`grid grid-cols-3 border-b md:py-4 text-[#1A1B20CC]/80 text-base font-normal max-w-full`}
                                    >
                                        <div className='md:col-span-1 col-span-3 flex md:justify-center justify-between gap-2 md:border-none border-b md:px-0 px-2 md:py-0 py-4'>
                                            {
                                                isVisibleMobile &&
                                                <span className='text-content-common uppercase text-[#1A1B20]/[64%]'>Reference Number</span>
                                            }
                                            <div className='md:w-full w-[60%] flex items-center justify-center'>
                                                <Link
                                                    href={item?.code_leads ? `/categories?code=${item.code_leads}` : "#"}
                                                    target='_blank'
                                                    className={`text-[#57A4FE] hover:text-[#57A4FE]/80 text-content-common font-medium md:text-center text-end w-fit`}
                                                >
                                                    {item?.code_leads ?? ""}
                                                </Link>
                                            </div>
                                        </div>

                                        <div className='md:col-span-1 col-span-3 flex md:justify-center justify-between gap-2 md:border-none border-b md:px-0 px-2 md:py-0 py-4'>
                                            {
                                                isVisibleMobile &&
                                                <span className='text-content-common uppercase text-[#1A1B20]/[64%]'>Manufacturer</span>
                                            }
                                            <span className='text-content-common text-[#000000] font-medium md:w-full w-[60%] md:text-center text-end'>
                                                {item?.type_code ?? ""}
                                            </span>
                                        </div>

                                        <div className='md:col-span-1 col-span-3 flex md:justify-center justify-between gap-2 md:border-none border-b md:px-0 px-2 md:py-0 py-4'>
                                            {
                                                isVisibleMobile &&
                                                <span className='text-content-common uppercase text-[#1A1B20]/[64%]'>Filter Type</span>
                                            }
                                            <span className='text-content-common text-[#000000] font-medium md:w-full w-[60%] md:text-center text-end'>
                                                {item?.filter_type ?? ""}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
            }
        </>
    )
}

export default SectionInfoProduct