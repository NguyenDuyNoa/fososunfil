'use client'
import AnimateOnScroll from '@/components/animation/AnimateOnScroll'
import AboutCardFilter from '@/components/card/about/AboutCardFilter'
import TitleDash from '@/components/title/TitleDash'
import TitleHighlight from '@/components/title/TitleHighlight'
import { uuidv4 } from '@/lib/uuid'
import { useResizeStore } from '@/stores/useResizeStore'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
const data = [
    {
        id: "1",
        name: 'Bộ lọc dầu',
        description: 'Sử dụng lò xo tấm và gấp nếp chữ M của phương tiện gấp giúp tận dụng diện tích lọc cho các bộ lọc nhỏ gọn theo yêu cầu của các NSX xe mới.',
        icon: '/icons/about/product1.png',
        bg: '#15BCE01A'
    },
    {
        id: "2",
        name: 'Bộ lọc không khí',
        description: 'Không khí tạo ra khi giao thông đông đúc chứa khí thải, chất ô nhiễm và chất gây dị ứng nhiều gấp năm lần so với không khí bạn hít thở',
        icon: '/icons/about/product2.png',
        bg: '#7393D21A'
    },
    {
        id: "3",
        name: 'Bộ lọc nước',
        description: 'Bộ lọc cho phép không khí truyền theo đường dẫn tuyến tính, đi qua xuyên suốt bộ lọc để hạn chế việc lưu lượng không khí bị thấp.',
        icon: '/icons/about/product3.png',
        bg: '#FF8C051A'
    },
    {
        id: "4",
        name: 'Bộ lọc không khí',
        description: 'It is a long established fact that a reader will be the service.',
        icon: '/icons/about/product4.png',
        bg: '#F8659A1A'
    }
]

const SectionProductAbout = () => {
    const { isVisibleMobile, isVisibleTablet } = useResizeStore()
    return (
        <div
            className='flex flex-col gap-12 custom-py-section'
            id="service-about-us"
        >
            <div className="flex flex-col items-start gap-6 container">
                <TitleHighlight
                    title='Chúng tôi luôn mang đến những sản phẩm tốt nhất'
                    titleClassName='text-start'
                    highlightClassName='lg:w-[37%] md:w-[36%] w-[70%] lg:-right-0  md:right-0 right-5 bg-[#FF182269]/40'
                />
                <TitleDash
                    dashClassName='md:max-w-[85px] md:min-w-[85px] md:mt-0 mt-3'
                    text='It is a long established fact that a reader will be distracted by the service.'
                />
            </div>
            {isVisibleMobile ?
                <div className='flex flex-col gap-9 lg:px-0 px-4'>
                    {data.map((e, index) => {
                        return (
                            <AnimateOnScroll index={index} key={e.id}>
                                <AboutCardFilter index={index}  {...e} />
                            </AnimateOnScroll>
                        )
                    })}
                </div>
                :
                <div className="h-full lg:ml-[80px] ml-10">
                    <Swiper
                        spaceBetween={35}
                        modules={[Autoplay]}
                        slidesPerView={isVisibleTablet ? 2.2 : 3.2}
                        grabCursor={true}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            waitForTransition: false,
                            stopOnLastSlide: true,
                            pauseOnMouseEnter: true,
                            disableOnInteraction: false,
                        }}
                        lazyPreloadPrevNext={1500}
                        speed={1500}
                        lazyPreloaderClass='swiper-lazy-preloader'
                        className={`swiper-product-about xxl:h-[300px] h-[280px] w-full`}
                    >
                        {
                            data && data?.map((item: any, index: any) => (
                                <SwiperSlide
                                    key={item.id}
                                    className='py-2 pl-1'
                                >
                                    <AboutCardFilter  {...item} index={0} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            }
        </div>
    )
}

export default SectionProductAbout