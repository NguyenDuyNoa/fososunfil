'use client'

import SectionFeelAbout from './components/SectionFeelAbout'
import SectionIntroAbout from './components/SectionIntroAbout'
import SectionIntroduceAbout from './components/SectionIntroduceAbout'
import SectionProductAbout from './components/SectionProductAbout'
import SectionStepsAbout from './components/SectionStepsAbout'

const Page = () => {
    return (
        <div className=''>
            {/* <div className='flex flex-col 2xl:gap-[124px] gap-[84px] lg:pt-[112px] pt-[104px]'> */}
            <SectionIntroAbout />
            <SectionIntroduceAbout />
            <SectionStepsAbout />
            <SectionProductAbout />
            <SectionFeelAbout />
        </div>
    )
}

export default Page