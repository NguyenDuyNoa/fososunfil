'use client'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { FORMAT_DATE } from '@/constants/FormatDate'
import { useBlogOutStanding } from '@/managers/api-management/blog/useBlogOutStanding'
import { momentCore } from '@/lib/moment'
import ConvertToSlug from '@/utils/convertToSlug/ConvertToSlug'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const SectionBlogItem = () => {

    const { push } = useRouter()

    const { data: blogHot, isLoading } = useBlogOutStanding({ outstanding: "1", page: "1", limit: "1" })

    if (isLoading) {

        return (

            <div className='w-full border border-[#E6E8EC] group flex md:flex-row flex-col bg-[#FCFCFD] md:rounded-bl-2xl md:rounded-tl-2xl rounded-2xl'>
                <Skeleton className="lg:w-[65%] md:w-[60%] w-full aspect-4/3 md:rounded-bl-2xl md:rounded-tl-2xl md:rounded-tr-none rounded-tr-2xl rounded-tl-2xl" /> {/* Skeleton for image */}
                <div className="lg:w-[35%] md:w-[40%] w-full px-6 py-[32px]">

                    <Skeleton className="h-6 w-1/3 mb-2" />

                    <Skeleton className="h-6 w-1/2 mb-2" />

                    <Skeleton className="h-4 w-full mb-4" />

                    <Skeleton className="h-10 w-full" />

                </div>

            </div>
        )
    }

    return (
        <Link
            href={`/blogs/${blogHot?.new[0]?.id}?${ConvertToSlug(blogHot?.new[0]?.title)}`}
            style={{
                boxShadow: `0px 64px 64px -48px #0F0F0F1A`
            }}
            className='container w-full border border-[#E6E8EC] group flex md:flex-row flex-col bg-[#FCFCFD] md:rounded-bl-2xl md:rounded-tl-2xl  rounded-2xl'
        >
            <div className="lg:w-[65%] md:w-[60%] w-full overflow-hidden md:aspect-5/3 aspect-4/3 md:rounded-bl-2xl md:rounded-tl-2xl md:rounded-tr-none rounded-tr-2xl rounded-tl-2xl">
                <Image
                    src={blogHot?.new[0]?.featured_image}
                    // src={'/example/blogs/blog-main.png'}
                    width={1280}
                    height={1024}
                    alt='blog-main.png'
                    className='size-full object-cover group-hover:scale-105 custom-transition md:rounded-bl-2xl md:rounded-tl-2xl md:rounded-tr-none rounded-tr-2xl rounded-tl-2xl'
                />
            </div>
            <div className="lg:w-[35%] md:w-[40%] w-full 3xl:px-[58px] xxl:px-[58px] xl:px-8 px-6 2xl:py-[64px] xxl:py-[48px] xl:py-[40px] lg:py-[32px] md:py-[24px] py-[32px]">
                <div className="flex flex-col gap-6 h-full">
                    <div className="text-[#FCFCFD] bg-[#57A4FE] rounded font-medium p-1.5 px-3 uppercase text-xs w-fit">
                        NEW
                    </div>
                    <h2 className='text-[#000000] font-bold 3xl:text-[68px] 2xl:text-[44px] xl:text-[40px] text-3xl 3xl:leading-[78px] 2xl:leading-[56px] xl:leading-[48px]'>
                        {blogHot?.new[0]?.title ?? ""}
                    </h2>
                    <h3 dangerouslySetInnerHTML={{ __html: blogHot?.new[0]?.description ?? "" }} className='text-[#1A1B20CC] font-normal text-base'>
                    </h3>
                    <div className="flex flex-col h-full justify-between 2xl:gap-14 xl:gap-8 md:gap-5 gap-8">
                        <div className='w-full text-start'>
                            <Button
                                type="button"
                                onClick={() => push(`/blogs/${blogHot?.new[0]?.id}?${ConvertToSlug(blogHot?.new[0]?.title)}`)}
                                className='3xl:text-lg text-base h-full uppercase font-bold bg-white group-hover:bg-[#1D1D1D]/[8%] text-[#1D1D1D] border-2 border-[#1D1D1D] rounded-[4px] md:group-hover:translate-x-2 transition-all duration-300 ease-in-out'
                            >
                                Tìm hiểu thêm
                            </Button>
                        </div>
                        <h3 className='text-[#777E90] md:order-2 order-1 font-bold text-xs lg:my-0 md:my-6'>  {blogHot?.new[0]?.date ? momentCore(blogHot?.new[0]?.date).format(FORMAT_DATE.MMM_D_YYYY) : ''} </h3>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default SectionBlogItem