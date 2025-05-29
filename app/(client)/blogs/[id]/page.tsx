import SectionDetailBlogContent from './components/SectionDetailBlogContent'
import SectionDetailBlogIntro from './components/SectionDetailBlogIntro'
import SectionDetailBlogRelated from './components/SectionDetailBlogRelated'

const Page = () => {
    return (
        <div className='xl:pt-16 pt-10 lg:bg-[url("/background/product/slug/bg.svg")] bg-[url("/background/product/slug/bg-mobi.svg")] 
        flex flex-col items-center lg:gap-12 gap-8 lg:bg-bottom bg-top bg-cover bg-no-repeat h-full lg:pb-[127px] pb-[61px]'
        >
            <SectionDetailBlogIntro />
            <SectionDetailBlogContent />
            <SectionDetailBlogRelated />
        </div>
    )
}

export default Page