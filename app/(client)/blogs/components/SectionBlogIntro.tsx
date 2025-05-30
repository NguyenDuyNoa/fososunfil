import { montserrat_sans } from '@/utils/fonts/fonts'
import React from 'react'

const SectionBlogIntro = () => {
    return (
        <div className='flex flex-col justify-center items-center gap-2 container'>
            <h1 className={`${montserrat_sans.className} text-center font-bold text-title-top`}>
                Tin tức
            </h1>
            <h2 className='text-[#1A1B20CC] text-sm font-normal md:max-w-[75%] max-w-[90%] text-center'>
                Track your workouts, get better results, and be the best version of you.
                Less thinking, more lifting.
            </h2>
        </div>
    )
}

export default SectionBlogIntro