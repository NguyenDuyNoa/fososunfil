'use client'

import { scrollToTop } from '@/utils/scroll/ScrollFunction';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { HiOutlineArrowNarrowUp } from "react-icons/hi";

const ButtonToTop = () => {
    const pathname = usePathname();
    const [isShow, sIsShow] = useState(false);

    const handleNavigation = useCallback(() => {
        var heightScreen = window.innerHeight;
        if (heightScreen > window.scrollY) {
            sIsShow(false)
        } else if (heightScreen < window.scrollY) {
            sIsShow(true)
        }
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleNavigation);
        return () => {
            window.removeEventListener("scroll", handleNavigation);
        };
    }, [handleNavigation]);

    // Ẩn nếu đang ở trang /cart
    if (pathname === '/cart') return null;

    return (
        <div className='fixed bottom-10 lg:right-10 right-5 md:space-y-4 space-y-4 z-[999]'>
            <div className={`${isShow ? "translate-x-0" : "translate-x-[200%]"} transition-transform duration-300 relative flex flex-col justify-center items-center`}>
                <button
                    type="button"
                    onClick={() => scrollToTop()}
                    className='relative z-[1] lg:w-14 w-12 lg:h-14 h-12 rounded-full text-white flex flex-col justify-center items-center'
                    style={{
                        background: "linear-gradient(92.73deg, #07A6FF 6.78%, #07A6FF 83.55%)"
                    }}
                >
                    <HiOutlineArrowNarrowUp className='text-2xl' />
                </button>
                <div className='size-14 rounded-full absolute animate-ping bg-[#07A6FF]/50' />
            </div>
        </div>
    )
}

export default ButtonToTop;
