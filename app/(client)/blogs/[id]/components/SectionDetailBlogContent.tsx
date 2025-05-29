'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { useBlogDetail } from '@/managers/api-management/blog/useBlogDetail'
import { useResizeStore } from '@/stores/useResizeStore'
import Image from 'next/image'
import { useParams } from 'next/navigation'

const SectionDetailBlogContent = () => {
    const params = useParams()
    const id = params?.id as string

    const { isVisibleMobile } = useResizeStore()

    const { data, isLoading } = useBlogDetail(id as string)

    return (
        <div className='flex flex-col items-center xl:gap-[60px] lg:gap-12 gap-8 '>
            <div className="xxl:px-[112px] xl:px-[92px] lg:px-[72px] px-0">
                {
                    isLoading
                        ?
                        <Skeleton className='aspect-5/3 object-cover lg:h-[700px] md:h-[450px] h-[278px] w-full' />
                        :
                        <Image
                            // src={isVisibleMobile ? '/example/blogs/slug/1mobi.svg' : '/example/blogs/slug/1.svg'}
                            // alt={isVisibleMobile ? '/example/blogs/slug/1mobi.svg' : '/example/blogs/slug/1.svg'}
                            src={data?.data?.featured_image}
                            alt={data?.data?.title}
                            className='aspect-5/3 object-cover lg:h-[700px] md:h-[450px] h-[278px]'
                            width={1280}
                            height={1024}
                        />
                }
            </div>
            <div className="xxl:max-w-[73%] xl:max-w-[80%] lg:max-w-[93%] max-w-[100%] custom-px-responsive">
                <span dangerouslySetInnerHTML={{ __html: data?.data?.content ?? '' }}></span>
            </div>
            {/* <div className="flex flex-col items-center xl:gap-12 lg:gap-10 gap-8 xxl:max-w-[73%] xl:max-w-[80%] lg:max-w-[93%] max-w-[100%] custom-px-responsive">
                <div className="flex flex-col gap-4">
                    <h1 className='text-[#23262F] font-bold text-2xl'>Kính gửi Quý Đối tác,</h1>
                    <div className="text-[#1A1B20CC] font-normal text-base flex flex-col gap-4">
                        <h2 className=''>
                            Sau khi cập nhập phương thức xác nhận chụp ảnh HOÀN TRẢ HÀNG cho đơn hàng giao THẤT BẠI với toàn dịch vụ. AhaMove đã nhận được rất nhiều hình ảnh hoàn trả không hợp lệ, dẫn đến tình trạng bị khóa tài khoản 1 ngày, ảnh hưởng tới công việc của Đối tác.
                        </h2>
                        <h2>
                            Chính vì vậy, AhaMove sẽ gửi tới các Đối tác hướng dẫn, quy định về việc HOÀN TRẢ ĐƠN HÀNG mà Đối tác thường xuyên gặp phải trong quá trình làm việc.
                        </h2>
                        <h2>
                            1. Thời gian quy định hoàn trả.
                        </h2>
                        <h2
                        >Đối với các đơn hàng giao thất bại, Đối tác cần lưu ý:

                        </h2>
                        <li>
                            Thời gian để Đối tác hoàn trả hàng hóa là 4h đồng hồ, được tính kể từ khi đối tác hoàn thành đơn hàng.
                        </li>
                        <h2>
                            2. Quy chuẩn Hình ảnh xác thực hoàn trả.
                        </h2>
                        <div className="flex flex-col gap-4">
                            <Image src={isVisibleMobile ? '/example/blogs/slug/2mobi.svg' : '/example/blogs/slug/2.svg'} alt='' className='aspect-auto lg:h-auto md:h-[350px] h-full' width={1280} height={1024} />
                            <h3 className='text-[#5F6D7E]'>It is a long established fact that a reader </h3>
                        </div>
                    </div>

                </div>

                <div className="flex flex-col gap-4">
                    <h1 className='text-[#23262F] font-bold text-2xl'>Voluptas dignissimos voluptatem aut qui dolores. </h1>
                    <div className="text-[#1A1B20CC] font-normal text-base flex flex-col gap-4">
                        <h2 className=''>
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                            The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                            as opposed to using 'Content here, content here', making it look like readable English. Sit dolores dolor minima.
                            Nulla autem possimus maiores voluptas beatae corporis aliquam saepe corporis. Ipsam autem beatae. Sed libero similique.
                            Tempora aut ut quos assumenda consectetur et ipsam nemo. Natus aperiam esse est vel eos dolor nesciunt sapiente fuga,
                            making it look like readable English.
                        </h2>
                        <h2>
                            Facere necessitatibus labore molestiae placeat non quod. Et minus qui natus dolor fugiat est repudiandae reiciendis nisi.
                            Adipisci quia nihil repellendus non rerum corporis suscipit. Maiores architecto nostrum quos voluptatum voluptas rerum
                            voluptatem.Nulla autem possimus maiores voluptas beatae corporis aliquam saepe corporis.
                            Ipsam autem beatae. Sed libero similique.
                        </h2>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h1 className='text-[#23262F] font-bold text-title-section'>Bộ lọc không khí bảng Panel</h1>
                    <div className="flex lg:flex-row flex-col gap-6">
                        <div className="text-[#1A1B20CC] font-normal text-base flex flex-col gap-4 lg:w-1/2 w-full">
                            <h2 className=''>
                                Bộ lọc cho phép không khí truyền theo đường dẫn tuyến tính, đi qua xuyên suốt bộ lọc để hạn chế việc lưu lượng không khí bị thấp.
                            </h2>

                            <h2>
                                Quy trình tạo hình đặc biệt giúp hình thành nếp gấp túi độc quyền cho phương tiện lọc của chúng tôi.
                            </h2>

                            <h2>
                                Các phát minh công nghệ sử dụng các loại bộ lọc có chất liệu KHÔNG DỆT, KHUNG NHỰA và KHUÔN POLYURETANE.
                            </h2>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <Image src={'/example/blogs/slug/3.svg'} alt='' className='size-full object-cover xxl:h-[225px] xl:h-[225px] lg:h-[248px] md:h-[350px] h-[248px]' width={1280} height={1024} />
                        </div>
                    </div>

                    <h3 className='text-[#006EFF] font-normal text-base text-center w-full'>
                        “Facere necessitatibus labore molestiae placeat non quod. Et minus qui natus dolor fugiat est repudiandae reiciendis nisi. Adipisci quia nihil repellendus non rerum corporis suscipit.
                        Maiores architecto nostrum quos voluptatum voluptas rerum voluptatem.”
                    </h3>
                </div>

                <div className="flex flex-col gap-4">
                    <h1 className='text-[#23262F] font-bold text-2xl'>Enim voluptas corporis:</h1>
                    <div className="text-[#1A1B20CC] font-normal text-base flex flex-col gap-4">
                        <li>
                            Facere necessitatibus labore
                        </li>
                        <li>
                            Vero fugiat consequatur
                        </li>
                        <li>
                            Numquam repellat
                        </li>
                        <li>
                            Mollitia exercitationem sunt
                        </li>
                        <li>
                            Quis sed sed consectetur.
                        </li>
                        <li>
                            Nobis eos provident
                        </li>
                        <h2>
                            Quis rerum ex tempore ut aut hic est. Nam nobis minus eos quaerat.
                            Officiis ex dolor et beatae minus doloribus sint quo. Fugiat cupiditate quaerat minima minima dolor necessitatibus.Vero fugiat consequatur. Numquam repellat et quo saepe et asperiores. Mollitia exercitationem sunt.
                            Quis sed sed consectetur. Nobis eos provident. Excepturi qui voluptatum maxime quae sit.
                        </h2>
                    </div>
                </div>

            </div> */}
        </div>
    )
}

export default SectionDetailBlogContent