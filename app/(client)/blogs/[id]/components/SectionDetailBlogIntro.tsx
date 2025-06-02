"use client"
import { Skeleton } from '@/components/ui/skeleton'
import { FORMAT_DATE } from '@/constants/FormatDate'
import { useBlogDetail } from '@/managers/api-management/blog/useBlogDetail'
import { momentCore } from '@/lib/moment'
import { montserrat_sans } from '@/utils/fonts/fonts'
import { useParams } from 'next/navigation'

const SectionDetailBlogIntro = () => {
    const params = useParams()
    const id = params?.id as string

    const { data, isLoading } = useBlogDetail(id as string)

    if (isLoading) {
        return (
            <div className="custom-px-responsive w-full flex flex-col justify-center items-center gap-2">
                <Skeleton className='h-6 w-1/5' />
                <Skeleton className='h-8 w-full' />
                <Skeleton className='h-6 w-1/2' />
            </div>
        )
    }

    return (
        <div className='flex flex-col justify-center items-center gap-2 container'>
            <h2 className='text-[#1A1B20A3] font-normal text-base'>{data?.data?.date ? momentCore(data?.data?.date).format(FORMAT_DATE.DD_MM_YYYY_TEXT) : ""} </h2>
            <h1 className={`${montserrat_sans.className} text-center font-bold text-title-top`}>
                {data?.data?.title}
            </h1>
            <h2 className='text-[#1A1B20CC] text-sm font-normal'>
                {/* Bài viết sẽ hướng dẫn chi tiết cụ thể nhất các bước cũng như thông tin khi thực hiện hoàn trả hàng */}
                <span dangerouslySetInnerHTML={{ __html: data?.data?.description ?? '' }}></span>
            </h2>
        </div>
    )
}

export default SectionDetailBlogIntro