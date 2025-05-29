'use client'

import SectionCategoryDetailProduct from './components/SectionCategoryDetailProduct'
import SectionContentDetailProduct from './components/SectionContentDetailProduct'


const DetailProduct = () => {
    return (
        <div className='pt-[162px] custom-px-responsive lg:bg-[url("/background/product/slug/bg.svg")] bg-[url("/background/product/slug/bg-mobi.svg")] flex items-start lg:gap-12 gap-8 lg:bg-bottom bg-top bg-cover bg-no-repeat h-full lg:pb-[127px] pb-[61px]'>
            <div className="xl:w-[72%] lg:w-[60%] w-full">
                <SectionContentDetailProduct />
            </div>
            <div className="xl:w-[28%] lg:w-[40%] lg:block hidden">
                <SectionCategoryDetailProduct />
            </div>
        </div>
    )
}

export default DetailProduct