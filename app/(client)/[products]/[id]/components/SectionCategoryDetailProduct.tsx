'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetListCategories } from '@/managers/api-management/categories/useGetListCategories'
import { uuidv4 } from '@/lib/uuid'
import ConvertToSlug from '@/utils/convertToSlug/ConvertToSlug'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useStateProductDetail } from '../../_state/useStateProductDetail'

const category = [
    {
        id: uuidv4(),
        name: 'Dầu',
        image: '/icons/product/slug/category1.svg'
    },
    {
        id: uuidv4(),
        name: 'Điều hòa',
        image: '/icons/product/slug/category2.svg'
    },
    {
        id: 3,
        name: 'Không khí',
        image: '/icons/product/slug/category3.svg'
    },
    {
        id: uuidv4(),
        name: 'Nhiên liệu',
        image: '/icons/product/slug/category4.svg'
    },
    {
        id: uuidv4(),
        name: 'Khác',
        image: '/icons/product/slug/category5.svg'
    }
]

const SectionCategoryDetailProduct = () => {
    const params = useParams()

    const { push } = useRouter()

    const { data: listCategory, isLoading } = useGetListCategories()

    const { isStateProductDetail, queryKeyIsStateProductDetail } = useStateProductDetail()

    useEffect(() => {
        if (!listCategory || !params?.id) return;

        const categoryExists = listCategory.find((category) => category?.id === params?.id);

        if (categoryExists) {
            queryKeyIsStateProductDetail({ idTabActive: params?.id });
        } else {
            push('/products');
        }
    }, [listCategory, params?.id]);


    return (
        <div className='border-t-[#ED1B24] border-t-4 flex flex-col gap-6 p-6 bg-white select-none'>
            <div className="">
                <h1 className='text-base text-center underline underline-offset-4 text-[#1A1B20CC]/80 uppercase'>Danh mục sản phẩm</h1>
            </div>
            <div className="grid lg:grid-cols-2 md:grid-cols-4 grid-cols-3 gap-2">
                {isLoading ?
                    [...Array(6)].map((_, index) =>
                        <div key={index}
                            className="bg-transparent flex flex-col justify-center cursor-pointer gap-2.5 md:px-4 px-3 3xl:py-14 2xl:py-8 xxl:py-7 xl:py-5 lg:py-7 md:py-10 py-4 size-full transition-all duration-150 ease-linear"
                        >
                            <div className="mx-auto">
                                <Skeleton className="w-[92px] h-[40px] rounded-md" />
                            </div>
                            <Skeleton className="w-[80%] h-4 mx-auto mt-2 rounded" />
                        </div>
                    )
                    :
                    listCategory?.map(e => {
                        return (
                            <div
                                onClick={() => {
                                    push(`/products/${e.id}?${ConvertToSlug(e.title)}`)
                                    queryKeyIsStateProductDetail({ idTabActive: e.id })
                                }}
                                key={e.id}
                                className={`${isStateProductDetail.idTabActive === e.id ? "bg-[#FFF8B3]" : "bg-transparent hover:bg-[#C0D2E424]"} 
                            flex flex-col justify-center cursor-pointer gap-2.5 md:px-4 px-3 3xl:py-14 2xl:py-8 xxl:py-7 xl:py-5 lg:py-7 md:py-10 py-4 size-full transition-all duration-150 ease-linear`}
                            >
                                <div className="mx-auto">
                                    <Image
                                        src={e.images}
                                        width={1280}
                                        height={1024}
                                        alt=''
                                        className='h-full w-[62px] aspect-3/2 filter grayscale-[1] brightness-[3]'
                                    />
                                </div>
                                <h1 className='text-[#00000099]/60 font-normal text-content-common text-center'>{e.name}</h1>
                            </div>

                        )
                    })}
            </div>
        </div>
    )
}

export default SectionCategoryDetailProduct