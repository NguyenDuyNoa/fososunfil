import AnimateOnScroll from '@/components/animation/AnimateOnScroll'
import TitleDash from '@/components/title/TitleDash'
import TitleHighlight from '@/components/title/TitleHighlight'
import { useGetDataPageAboutUs } from '@/managers/api-management/ui/about-us/useGetDataPageAboutUs'
import { montserrat_sans } from '@/utils/fonts/fonts'

const timelineData = [
    {
        year: '2007',
        content: 'Năm 2007, chúng tôi thành lập trụ sở bản hàng tại Việt Nam, nơi nổi tiếng là cơ sở của ngành công nghiệp ô tô. Các sản phẩm của chúng tôi như sau: lọc, dầu, két nước, má phanh từ ô tô đến xe tải hạng nặng.'
    },
    {
        year: '2009',
        content: 'Sunfil-filter bắt đầu sản xuất với phun nhựa tiêu.'
    },
    {
        year: '2010-2015',
        content: 'Công ty mở rộng phạm vi sản xuất với các dòng sản phẩm mới như áp dụng trên các phương tiện cơ lớn lọc bụi, độ bó chỉ cần thay thế cao bộ phận lọc và lọi lọc trong quá trình bảo dưỡng, trong khi các lõi lọc bụi và các linh kiện khác không cần buộc phải thay trong toàn bộ quá trình hoạt động của xe. Điều này làm cho chức năng lọc hoạt động dễ dàng hơn, rẻ hơn và thân thiện với môi trường hơn.'
    },
    {
        year: '2018',
        content: 'Bộ lọc dầu được tích hợp vào các sản phẩm của JS và trở thành "sản phẩm độc đáo" cho Asasakhi. JS trở thành một trong số ít các công ty có sản phẩm này trên thị trường.'
    },
    {
        year: '2019-2024',
        content: 'Sunfil-filter lên đầu tiên ra mắt bộ lọc nhiên liệu trong bình chứa.'
    },
]

const SectionStepsAbout = () => {
    const { data: dataPageAboutUs } = useGetDataPageAboutUs({ enebled: true })

    return (
        <div
            className='lg:py-[80px] py-[64px] bg-[url("/background/about/bg.jpg")] 3xl:bg-left bg-center bg-no-repeat'
            id="history-about-us"
        >
            <div className='container flex flex-col lg:gap-[80px] gap-10'>

            <div className="flex flex-col lg:items-center items-start gap-6 ">
                <TitleHighlight
                    title='Lịch sử hình thành công ty'
                    titleClassName='text-start'
                    highlightClassName='lg:w-[31%] w-[29%] lg:-left-4 md:-left-2 -left-1 bg-[#FFBC05]/85'
                />
                <TitleDash
                    dashClassName='md:max-w-[85px] md:min-w-[85px] md:mt-0 mt-3'
                    text='It is a long established fact that a reader will be distracted by the service.'
                />
            </div>
            <div className="relative ">
                {/* Timeline line with arrow */}
                <div className="absolute lg:top-0 lg:left-1 lg:right-0 lg:h-0.5 lg:w-auto top-0 left-1 bottom-0 w-0.5 h-auto bg-[#0081F8] flex items-center">
                    <div className="absolute lg:-right-3 -right-[7px] lg:top-1/2 top-0 -translate-y-1/2 lg:w-0 lg:h-0 -bottom-1 w-0 h-0 z-10
                                    lg:border-t-[8px] 
                                    lg:border-t-transparent 
                                    lg:border-l-[14px] 
                                    lg:border-l-[#0081F8] 
                                    lg:border-b-[8px]
                                    lg:border-b-transparent 
                                    border-b-[14px] border-b-[#0081F8] 
                                    border-l-[8px] border-l-transparent 
                                    border-r-[8px] border-r-transparent 
                                    border-t-[8px] border-t-transparent
                                  "
                    >
                    </div>
                </div>
                {/* Starting point */}
                <div className="absolute lg:left-0 -left-0.5 lg:top-0 top-full -translate-y-1/2">
                    <div className="w-4 h-4 bg-[#0081F8] rounded-full"></div>
                </div>

                {/* Timeline items */}
                <div className="flex lg:flex-row flex-col-reverse justify-between relative pl-8">
                    {
                        dataPageAboutUs?.history && dataPageAboutUs?.history?.map((item: any, index: number) => (
                            <div key={index} className="flex flex-col items-start gap-6 lg:w-1/5 w-full">
                                <div className="relative">
                                    {/* Outer glow circle */}
                                    <div className="w-8 h-8 bg-[#57A4FE52]/30 animate-pulse rounded-full absolute top-1/2 lg:left-1/2 left-0 transform lg:-translate-x-[30%] -translate-x-[130%] lg:-translate-y-1/2 translate-y-[60%]" />

                                    {/* Inner dot */}
                                    {/* shadow-[0_0_10px_4px_rgba(59,130,246,0.5)] */}
                                    <div className="w-5 h-5 bg-[#57A4FE] rounded-full absolute lg:top-1/2 top-0 lg:left-1/2 left-0 transform lg:-translate-x-[20%] -translate-x-[180%] lg:-translate-y-1/2 translate-y-[130%] z-10" />
                                </div>
                                <AnimateOnScroll
                                    index={index}
                                    className={`${montserrat_sans.className} 3xl:text-[36px] xxl:text-[30px] lg:text-2xl text-2xl font-extrabold text-[#181818] leading-6`}
                                >
                                    {item.title}
                                </AnimateOnScroll>
                                <AnimateOnScroll
                                    index={index}
                                    className="text-[#1A1B20CC] font-normal 3xl:text-lg xl:text-base text-base text-start max-w-[90%]"
                                >
                                    {item.description}
                                </AnimateOnScroll>
                            </div>
                        ))
                    }
                </div>
            </div>
            </div>

        </div>
    )
}

export default SectionStepsAbout