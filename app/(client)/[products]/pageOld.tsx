'use client'

import { useGetListCategories } from '@/managers/api-management/categories/useGetListCategories'
import { uuidv4 } from '@/lib/uuid'
import React from 'react'
import SectionCategoryCommon from './components/SectionCategoryCommon'
import SectionIntroCommon from './components/SectionIntroCommon'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetDataPageAboutUs } from '@/managers/api-management/ui/about-us/useGetDataPageAboutUs'

const dataListProducts = [
    {
        id: uuidv4(),
        name: "Bộ lọc không khí",
        description: "Sunfil-filter đại diện cho nhiều loại sản phẩm lọc dành cho dịch vụ hậu mãi ô tô của hầu hết các thương hiệu trên thế giới. Bộ lọc JS kết hợp hiệu suất làm sạch cao, độ tin cậy, độ bền và dễ thay thế và sử dụng.",
        backgroundImage: "/example/products/product5.png"
    },
    {
        id: uuidv4(),
        name: "Bộ lọc dầu",
        description: "Sunfil-filter đại diện cho nhiều loại sản phẩm lọc dành cho dịch vụ hậu mãi ô tô của hầu hết các thương hiệu trên thế giới. Bộ lọc JS kết hợp hiệu suất làm sạch cao, độ tin cậy, độ bền và dễ thay thế và sử dụng.",
        backgroundImage: "/example/products/product2.png"
    },
    {
        id: uuidv4(),
        name: "Bộ lọc dầu trong cabin",
        description: "Sunfil-filter đại diện cho nhiều loại sản phẩm lọc dành cho dịch vụ hậu mãi ô tô của hầu hết các thương hiệu trên thế giới. Bộ lọc JS kết hợp hiệu suất làm sạch cao, độ tin cậy, độ bền và dễ thay thế và sử dụng.",
        backgroundImage: "/example/products/product3.png"
    },
    {
        id: uuidv4(),
        name: "Bộ lọc không khí",
        description: "Sunfil-filter đại diện cho nhiều loại sản phẩm lọc dành cho dịch vụ hậu mãi ô tô của hầu hết các thương hiệu trên thế giới. Bộ lọc JS kết hợp hiệu suất làm sạch cao, độ tin cậy, độ bền và dễ thay thế và sử dụng.",
        backgroundImage: "/example/products/product4.png"
    },
    // {
    //     id: uuidv4(),
    //     name: "Bộ lọc dầu trong cabin",
    //     description: "Sunfil-filter đại diện cho nhiều loại sản phẩm lọc dành cho dịch vụ hậu mãi ô tô của hầu hết các thương hiệu trên thế giới. Bộ lọc JS kết hợp hiệu suất làm sạch cao, độ tin cậy, độ bền và dễ thay thế và sử dụng.",
    //     backgroundImage: "/example/products/product1.png"
    // },
]

const dataStyle = [
    {
        id: uuidv4(),
        highlightClassName: "w-[65%] xxl:top-7 top-6 -right-3 bg-[#6AD6EE]/65",
    },
    {
        id: uuidv4(),
        highlightClassName: "w-[45%] xxl:top-7 top-6 -right-3 bg-[#FFBC05]/65",
    },
    {
        id: uuidv4(),
        highlightClassName: "w-[74%] xxl:top-7 top-6 -right-3 bg-[#FF1822]/[41%]",
    },
    {
        id: uuidv4(),
        highlightClassName: "w-[65%] xxl:top-7 top-6 -right-3 bg-[#6AD6EE]/65",
    },
    {
        id: uuidv4(),
        highlightClassName: "w-[65%] xxl:top-7 top-6 -right-3 bg-[#6AD6EE]/65",
    },
    {
        id: uuidv4(),
        highlightClassName: "w-[45%] xxl:top-7 top-6 -right-3 bg-[#FFBC05]/65",
    },
    {
        id: uuidv4(),
        highlightClassName: "w-[74%] xxl:top-7 top-6 -right-3 bg-[#FF1822]/[41%]",
    },
    {
        id: uuidv4(),
        highlightClassName: "w-[65%] xxl:top-7 top-6 -right-3 bg-[#6AD6EE]/65",
    },
    {
        id: uuidv4(),
        highlightClassName: "w-[65%] xxl:top-7 top-6 -right-3 bg-[#6AD6EE]/65",
    },
    {
        id: uuidv4(),
        highlightClassName: "w-[45%] xxl:top-7 top-6 -right-3 bg-[#FFBC05]/65",
    },
    {
        id: uuidv4(),
        highlightClassName: "w-[74%] xxl:top-7 top-6 -right-3 bg-[#FF1822]/[41%]",
    },
    {
        id: uuidv4(),
        highlightClassName: "w-[65%] xxl:top-7 top-6 -right-3 bg-[#6AD6EE]/65",
    },
    {
        id: uuidv4(),
        highlightClassName: "w-[65%] xxl:top-7 top-6 -right-3 bg-[#6AD6EE]/65",
    },
    {
        id: uuidv4(),
        highlightClassName: "w-[45%] xxl:top-7 top-6 -right-3 bg-[#FFBC05]/65",
    },
    {
        id: uuidv4(),
        highlightClassName: "w-[74%] xxl:top-7 top-6 -right-3 bg-[#FF1822]/[41%]",
    },
    {
        id: uuidv4(),
        highlightClassName: "w-[65%] xxl:top-7 top-6 -right-3 bg-[#6AD6EE]/65",
    },
    {
        id: uuidv4(),
        highlightClassName: "w-[65%] xxl:top-7 top-6 -right-3 bg-[#6AD6EE]/65",
    },
    {
        id: uuidv4(),
        highlightClassName: "w-[45%] xxl:top-7 top-6 -right-3 bg-[#FFBC05]/65",
    },
    {
        id: uuidv4(),
        highlightClassName: "w-[74%] xxl:top-7 top-6 -right-3 bg-[#FF1822]/[41%]",
    },
    {
        id: uuidv4(),
        highlightClassName: "w-[65%] xxl:top-7 top-6 -right-3 bg-[#6AD6EE]/65",
    },
]

const Products = () => {
    const { data: dataListProducts, isLoading } = useGetListCategories()
    const { data: dataIntroduceProduct } = useGetDataPageAboutUs({ enebled: true })

    console.log('dataIntroduceProduct', dataIntroduceProduct);


    return (
        <div className='' id="page-product">
            <SectionIntroCommon
                title={`${dataIntroduceProduct?.content_product[0]?.title}`}
                description={`${dataIntroduceProduct?.content_product[0]?.description}`} />
            {
                isLoading ?
                    (
                        [...Array(4)].map((_, index) => {
                            return (
                                <div key={index} className="grid grid-cols-12 animate-pulse">
                                    <div className={`${index % 2 !== 0 ? "lg:order-2" : ""} lg:col-span-6 col-span-12 overflow-hidden 3xl:h-[500px] xxl:h-[400px] md:h-[365px] h-[300px]`}>
                                        <Skeleton className="w-full h-full rounded-none" />
                                    </div>
                                    <div className={`lg:col-span-6 col-span-12 flex flex-col justify-center relative lg:h-full md:h-[365px] h-[300px]`}>
                                        <div className="space-y-4 px-4">
                                            <Skeleton className="h-8 w-3/4" />
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-1/2" />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                    :
                    (
                        dataListProducts && dataListProducts?.map((item, index) => (
                            <React.Fragment key={`product-${item.id}`}>
                                <SectionCategoryCommon
                                    item={item}
                                    backgroundImage={item.images_items_detail ?? ''}
                                    index={index % 2 !== 0}
                                    description={item.description ?? ''}
                                    highlightClassName={dataStyle[index]?.highlightClassName}
                                />
                            </React.Fragment>
                        ))
                    )
            }
        </div>
    )
}

export default Products