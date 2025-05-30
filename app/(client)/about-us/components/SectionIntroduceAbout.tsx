import AnimateOnScroll from '@/components/animation/AnimateOnScroll'
import TitleDash from '@/components/title/TitleDash'
import TitleHighlight from '@/components/title/TitleHighlight'
import { Button } from '@/components/ui/button'
import { uuidv4 } from '@/lib/uuid'
import { useGetDataPageAboutUs } from '@/managers/api-management/ui/about-us/useGetDataPageAboutUs'
import ConvertToSlug from '@/utils/convertToSlug/ConvertToSlug'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const data = {
    image: '/example/about/left-no.png',
    content: ` Đối mặt với sự cạnh tranh ngày càng gay gắt trên thị trường quốc tế, chúng tôi đang tìm kiếm một bước đột phá cho khách hàng. Năm 2007, 
    chúng tôi thành lập trụ sở bán hàng của mình—CÔNG TY CỔ PHẦN SẢN XUẤT THƯƠNG MẠI Ô TÔ VIỆT HƯNG tại Việt Nam,  nơi nổi tiếng là cơ sở của ngành công nghiệp ô tô. Các sản phẩm của chúng tôi như sau: bộ lọc, cảm biến, 
    bộ tản nhiệt, má phanh từ ô tô đến xe tải hạng nặng. Để phát huy lợi thế về giá cả và chất lượng, chúng tôi đã thành lập nhà máy lọc khí.`,
    thumb: [
        {
            id: uuidv4(),
            name: 'Asaka',
            code: 'JX-0814C',
            image: '/example/about/thum1.png'
        },
        {
            id: uuidv4(),
            name: 'Asaka',
            code: 'JX-0814C',
            image: '/example/about/thum2.png'
        },
        {
            id: uuidv4(),
            name: 'Asaka',
            code: 'JX-0814C',
            image: '/example/about/thum3.png'
        },
        {
            id: uuidv4(),
            name: 'Asaka',
            code: 'JX-0814C',
            image: '/example/about/thum4.png'
        }
    ]
}
const Sectionintroduce = () => {
    const router = useRouter()
    const { data: dataPageAboutUs } = useGetDataPageAboutUs({ enebled: true })

    return (
        <div
            className='flex flex-col gap-12 custom-py-section bg-white'
            id="intro-about-us"
        >
            <div className="flex flex-col items-start gap-6 container">
                <TitleHighlight
                    title='Giới thiệu chung về VietHung Auto'
                    titleClassName='text-start'
                    highlightClassName='w-full lg:w-[42%] md:w-[43%] w-[55%] lg:right-0 md:-right-1 bg-[#6AD6EEA6]/65'
                />
                <TitleDash
                    dashClassName='md:max-w-[76px] md:min-w-[76px] md:mt-0 mt-3'
                    // text='It’s short title here'
                    text={dataPageAboutUs?.banner[0]?.title ?? ""}
                />
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 2xl:gap-[80px] xl:gap-16 lg:gap-5 gap-8 xxl:pr-[112px] xl:pr-[92px] lg:pr-[72px] lg:pl-0 px-4">
                <div className="col-span-1 h-full bg-[#F8F9F9] flex justify-center items-center lg:p-[92px] md:p-10 p-[60px] group">
                    <Image
                        src={dataPageAboutUs?.banner[0]?.image ?? "/default/default.png"}
                        width={1280}
                        height={1024}
                        alt=''
                        className='size-full cursor-pointer object-contain lg:aspect-3/1 aspect-3/2 drop-shadow-xl group-hover:scale-105 ease-in-out duration-300'
                    />
                </div>
                <div className="col-span-1 flex flex-col xxl:gap-[62px] lg:gap-12 gap-[58px]">
                    <AnimateOnScroll className="flex flex-col gap-[30px]">
                        <h2 className='text-[#1A1B20CC]/80 text-content-common font-normal'>
                            {dataPageAboutUs?.banner[0]?.description}
                        </h2>
                        <div className='w-full text-start'>
                            <Button
                                type="button"
                                className='3xl:text-lg text-base h-full uppercase font-bold bg-white hover:bg-[#1D1D1D]/[8%] text-[#1D1D1D] border-2 border-[#1D1D1D] rounded-[4px] md:group-hover:translate-x-2 transition-all duration-300 ease-in-out'
                            >
                                Liên hệ ngay
                            </Button>
                        </div>
                    </AnimateOnScroll>
                    <div className="grid lg:grid-cols-4 grid-cols-2 items-center xxl:gap-12 xl:gap-8 lg:gap-4 gap-5 xl:justify-start lg:justify-start md:justify-between justify-start">
                        {
                            dataPageAboutUs?.banner[0] && dataPageAboutUs?.banner[0]?.product?.map((e: any, index: number) => {
                                return (
                                    <AnimateOnScroll
                                        index={index}
                                        key={`banner-${e.id}`}
                                        className="col-span-1 flex flex-col gap-2.5 group overflow-hidden cursor-pointer"
                                        onClick={() => { router.push(`/categories?code=${e.code}&type=list&isKey=1`) }}
                                    >
                                        <div className='w-full h-auto aspect-square'>
                                            <Image
                                                src={e.images ?? '/default/default.png'}
                                                width={1280}
                                                height={1024}
                                                alt='image'
                                                className='size-full aspect-square objcet-contain group-hover:scale-105 ease-in-out duration-300'
                                            />
                                        </div>

                                        <h1 className='text-[#1A1B20CC]/80 3xl:text-base 2xl:text-sm xxl:text-sm xl:text-sm lg:text-xs text-lg text-center'>
                                            {e.name}
                                            {/* <span className='border-b border-black'>{e.code}</span> */}
                                        </h1>
                                    </AnimateOnScroll>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sectionintroduce