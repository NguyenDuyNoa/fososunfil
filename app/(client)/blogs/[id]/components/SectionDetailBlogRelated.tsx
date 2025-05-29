'use client'
import AnimateOnScroll from '@/components/animation/AnimateOnScroll'
import BlogCardVerticalBig from '@/components/card/blog/BlogCardVerticalBig'
import TitleHighlight from '@/components/title/TitleHighlight'
import { Skeleton } from '@/components/ui/skeleton'
import { useBlogDetail } from '@/managers/api-management/blog/useBlogDetail'
import { useBlogList } from '@/managers/api-management/blog/useBlogList'
import { uuidv4 } from '@/lib/uuid'
import { useParams } from 'next/navigation'
const data = [
    {
        id: uuidv4(),
        name: 'Đầu phun sprinkler là gì? Cấu tạo, ứng dụng và nguyên lý hoạt động',
        image: '/example/blogs/b1.png',
        tag: [
            {
                id: 1,
                name: 'car'
            },
            {
                id: 2,
                name: 'OIL'
            }
        ],
        avata: '/example/blogs/avt1.png',
        date: 'Feb 03, 2021',
        user: 'Porter Daniel'
    },
    {
        id: uuidv4(),
        name: 'Check Valve là gì? 4 loại Check Valve phổ biến nhất hiện nay',
        image: '/example/blogs/b2.png',
        tag: [
            {
                id: 2,
                name: 'OIL'
            },
            {
                id: 3,
                name: 'CABIN'
            },
        ],
        avata: '/example/blogs/avt2.png',
        date: 'Feb 03, 2021',
        user: 'Porter Daniel'
    },
    {
        id: uuidv4(),
        name: 'Bảng đơn vị đo áp suất thông dụng nhất hiện nay',
        image: '/example/blogs/b3.png',
        tag: [
            {
                id: 1,
                name: 'car'
            },
            {
                id: 2,
                name: 'OIL'
            }
        ],
        avata: '/example/blogs/avt3.png',
        date: 'Feb 03, 2021',
        user: 'Porter Daniel',
    },
]
const SectionDetailBlogRelated = () => {
    const params = useParams()
    const id = params?.id as string

    const { data } = useBlogDetail(id as string)

    const { data: dataRelated, isLoading: isLoadingRelated } = useBlogList(
        {
            id_detail: id,
            post_category_id: data?.data?.post_category_id,
            page: "1",
            limit: "3"
        },
        !!data?.data?.post_category_id && !!id
    )

    const flatDataRelated = dataRelated?.pages?.flatMap((page) => page?.new) ?? []
    return (
        <div className='flex flex-col lg:gap-12 gap-8 custom-px-responsive'>
            <TitleHighlight
                title='Bài viết liên quan'
                highlightClassName='md:-right-2 right-0 lg:w-[57%]  md:w-[58%] 
                w-[55%] bg-[#6AD6EEA6]/65'
            />
            <div className="grid lg:grid-cols-3 grid-cols-1 xxl:gap-8 gap-6">
                {isLoadingRelated ?
                    [...Array(3)].map((_, index) => {
                        return (
                            <div key={index} className="border border-[#DCDFE4] col-span-1 w-full rounded-2xl p-4 flex flex-col lg:gap-8 gap-6 h-full">
                                <div className="overflow-hidden rounded-xl w-full aspect-4/3">
                                    <Skeleton className="w-[380px] h-full rounded-xl" />
                                </div>
                                <div className="flex flex-col justify-between gap-4 3xl:h-[32%] 2xl:h-[40%] lg:h-[38%]">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-2">
                                            <Skeleton className="h-6 w-16 rounded-md" />
                                        </div>
                                        <Skeleton className="h-8 w-3/4 rounded-md" />
                                    </div>

                                    <div className="flex justify-start items-center gap-3">
                                        <Skeleton className="w-8 h-8 rounded-full" />
                                        <Skeleton className="h-6 w-20 rounded-md" />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    :
                    flatDataRelated.map((e, index: number) => {
                        return (
                            <AnimateOnScroll index={index} key={e.id}>
                                <BlogCardVerticalBig {...e} />
                            </AnimateOnScroll>
                        )
                    })}
            </div>
        </div>
    )
}

export default SectionDetailBlogRelated