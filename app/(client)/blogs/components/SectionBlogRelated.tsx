'use client'
import AnimateOnScroll from '@/components/animation/AnimateOnScroll';
import BlogCardVerticalBig from '@/components/card/blog/BlogCardVerticalBig';
import { Skeleton } from '@/components/ui/skeleton';
import { useBlogList } from '@/managers/api-management/blog/useBlogList';
import { uuidv4 } from '@/lib/uuid';
import { FiLoader } from "react-icons/fi";

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
    {
        id: uuidv4(),
        name: 'Bật mí các loại ống thủy lực phổ biến nhất hiện nay',
        image: '/example/blogs/b4.png',
        tag: [
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
        name: 'Đầu phun sprinkler là gì? Cấu tạo, ứng dụng và nguyên lý hoạt động',
        image: '/example/blogs/b1.png',
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
        image: '/example/blogs/b5.png',
        tag: [
            {
                id: 1,
                name: 'fitness'
            },
            {
                id: 3,
                name: 'cabin'
            }
        ],
        avata: '/example/blogs/avt3.png',
        date: 'Feb 03, 2021',
        user: 'Porter Daniel',
    },
]
const SectionBlogRelated = () => {
    const { data: dataNews, isLoading, isFetching, hasNextPage, fetchNextPage } = useBlogList({ limit: "6" })
    const newData = dataNews?.pages?.flatMap((page) => page?.new)
    return (
        <div className='flex flex-col gap-8 container'>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 col-span-1 gap-8">
                {isLoading
                    ?
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
                    newData?.map((e, index) => {
                        return (
                            <AnimateOnScroll index={index} key={e.id}>
                                <BlogCardVerticalBig {...e} />
                            </AnimateOnScroll>
                        )
                    })}
            </div>
            {hasNextPage &&
                <div
                    onClick={() => { fetchNextPage() }}
                    className="flex justify-center items-center gap-3 w-fit mx-auto border-[#E6E8EC] bg-white transition-all duration-300 ease-in-out hover:bg-[#1D1D1D]/[8%] border-2 py-2 lg:px-4 px-3 cursor-pointer">
                    <FiLoader className={`${isFetching ? 'animate-spin' : ""} text-base text-[#23262F]`} />
                    <h2 className='text-[#23262F] font-normal text-sm'>Load more</h2>
                </div>
            }
        </div>
    )
}

export default SectionBlogRelated