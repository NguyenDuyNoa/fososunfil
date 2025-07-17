'use client'

import { cn } from "@/lib/utils"
import Image from "next/image"
import { useEffect, useState } from "react"

interface State {
    title: string,
    image: string
}
const SystemNodata = ({ type, className, classNameTitle }: { type: string, className?: string, classNameTitle?: string }) => {
    const [data, setData] = useState<State>({ title: '', image: '/background/system/no-data.svg', })

    const quertyState = (key: any) => setData((prev: State) => ({ ...prev, ...key }))

    useEffect(() => {
        switch (type) {
            case 'search-history':
                quertyState({ title: 'No history!', image: '/product/productEmpty.png' })
                break;
            case 'gift-history':
                quertyState({ title: 'No history!', image: '/product/productEmpty.png' })
                break;
            default:
                quertyState({ title: '', image: '/product/productEmpty.png' })
                break;
        }
    }, [type])

    return (
        <div className={`${className} flex flex-col gap-2 items-center justify-center h-full`}>
            <Image
                alt='nodata'
                src={data.image ? data.image : "/product/productEmpty.png"}
                unoptimized
                width={1280}
                height={1024}
                className={`mx-auto w-full object-contain
                     ${['search-history'].includes(type) && '3xl:h-[560px] h-[420px] aspect-square'}
                     ${['gift-history'].includes(type) && '3xl:h-[420px] h-[380px] aspect-square'}
                     ${['history',].includes(type) && 'h-[120px] aspect-square'}
                `}
            />

            <h1 className={cn(`3xl:text-lg text-base font-semibold text-[#07A6FF] leading-6`, classNameTitle)}>
                {data?.title}
            </h1>
        </div>
    )

}
export default SystemNodata