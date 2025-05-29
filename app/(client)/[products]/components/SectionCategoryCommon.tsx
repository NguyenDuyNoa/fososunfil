import TitleHighlight from '@/components/title/TitleHighlight'
import { Button } from '@/components/ui/button'
import { useResizeStore } from '@/stores/useResizeStore';
import ConvertToSlug from '@/utils/convertToSlug/ConvertToSlug';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { HiOutlineArrowLongRight } from "react-icons/hi2";

type Props = {
    backgroundImage: string
    index: boolean
    item: any
    description: string
    highlightClassName: string
}

const SectionCategoryCommon = ({ backgroundImage, index, item, description, highlightClassName }: Props) => {
    const { isVisibleTablet } = useResizeStore()
    return (
        <Link
            href={`/products/${item.id}?${ConvertToSlug(item?.title ?? "")}`}
            className='3xl:min-h-[500px] xxl:min-h-[400px] md:min-h-[365px] min-h-[300px] grid grid-cols-12 group'
        >
            <div className={`${index && "lg:order-2"} lg:col-span-6 col-span-12 overflow-hidden 3xl:h-[500px] xxl:h-[400px] md:h-[365px] h-[300px]`}>
                <Image
                    width={1920}
                    height={1080}
                    alt="product"
                    className='size-full object-cover object-center group-hover:scale-105 custom-transition'
                    src={backgroundImage}
                />
            </div>

            <div className={`lg:col-span-6 col-span-12 flex flex-col justify-center relative lg:h-full md:h-[365px] h-[300px]`}>
                <div className={`${index ? "lg:order-1 xxl:pl-40 xl:pl-36 lg:pl-32 lg:max-w-[95%] max-w-full" : "xxl:pl-20 xl:pl-16 lg:pl-14 3xl:max-w-[85%] xxl:max-w-[80%] lg:max-w-[78%] max-w-full"} lg:mx-0 mx-4 flex flex-col 3xl:gap-10 gap-8`}>
                    <div className='3xl:space-y-8 space-y-6'>
                        <TitleHighlight
                            title={item.title}
                            containerClassName='text-start w-full md:group-hover:translate-x-2 custom-transition'
                            titleClassName='text-start'
                            highlightClassName={highlightClassName}
                        />
                        <div dangerouslySetInnerHTML={{ __html: description }} className='text-content-common text-[#1A1B20]/80 md:group-hover:translate-x-2 custom-transition'>
                        </div>
                    </div>

                    <div className='w-full text-start'>
                        <Button
                            type="button"
                            className='3xl:text-lg text-base h-full uppercase font-bold bg-white group-hover:bg-[#1D1D1D]/[8%] text-[#1D1D1D] border-2 border-[#1D1D1D] rounded-[4px] md:group-hover:translate-x-2 transition-all duration-300 ease-in-out'
                        >
                            Tìm Hiểu thêm
                        </Button>
                    </div>
                    {
                        !isVisibleTablet &&
                        <div className={`${index ? "top-[25%] 3xl:-left-[12%] xxl:-left-[15%] xl:-left-[18%] -left-[20%] bg-[#ED1B24] group-hover:bg-[#F6DE00] pr-12 items-end" : "top-[25%] 3xl:-right-[12%] xxl:-right-[15%] xl:-right-[18%] -right-[20%] bg-[#F6DE00] group-hover:bg-[#ED1B24] pl-10 items-start"} aspect-square xl:w-[224px] w-[200px] flex flex-col justify-center rounded-full absolute custom-transition`}>
                            <HiOutlineArrowLongRight className={`${index ? "text-white group-hover:text-[#1D1D1D]" : "text-[#1D1D1D] group-hover:text-white"} size-12 md:group-hover:translate-x-2 custom-transition`} />
                        </div>
                    }
                </div>
            </div>
        </Link >
    )
}

export default SectionCategoryCommon