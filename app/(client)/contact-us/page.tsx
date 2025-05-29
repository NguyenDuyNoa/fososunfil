import SectionIntroCommon from '../[products]/components/SectionIntroCommon'
import SectionFormContact from './components/SectionFormContact'
import SectionQuestionContact from './components/SectionQuestionContact'

const Page = () => {
    return (
        <div id="contact-us">
            <SectionIntroCommon
                classNameTitle='md:max-w-full max-w-[60%]'
                title='Liên hệ với chúng tôi'
                description='Sunfil-filter đại diện cho nhiều loại sản phẩm lọc dành cho dịch vụ hậu mãi ô tô của hầu hết các thương hiệu trên thế giới. 
                Bộ lọc JS kết hợp hiệu suất làm sạch cao, độ tin cậy, độ bền và dễ thay thế và sử dụng.'
            />
            <SectionFormContact />
            <SectionQuestionContact />
        </div>
    )
}   

export default Page