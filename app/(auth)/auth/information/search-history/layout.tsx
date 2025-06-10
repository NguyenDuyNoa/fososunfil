// import { createMetadata } from "@/managers/api-management/server/createMetadata";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "SUNFIL1 - Search History",
    description: "CÔNG TY CỔ PHẦN SẢN XUẤT THƯƠNG MẠI Ô TÔ VIỆT HƯNG tại Việt Nam, nơi nổi tiếng là cơ sở của ngành công nghiệp ô tô. Các sản phẩm của chúng tôi như sau: bộ lọc, cảm biến, bộ tản nhiệt, má phanh từ ô tô đến xe tải hạng nặng. Để phát huy lợi thế về giá cả và chất lượng, chúng tôi đã thành lập nhà máy lọc khí.",
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL_WEBSITE}`),
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
    },
    openGraph: {
        title: "SUNFIL1 - Search History",
        description: "CÔNG TY CỔ PHẦN SẢN XUẤT THƯƠNG MẠI Ô TÔ VIỆT HƯNG tại Việt Nam, nơi nổi tiếng là cơ sở của ngành công nghiệp ô tô. Các sản phẩm của chúng tôi như sau: bộ lọc, cảm biến, bộ tản nhiệt, má phanh từ ô tô đến xe tải hạng nặng. Để phát huy lợi thế về giá cả và chất lượng, chúng tôi đã thành lập nhà máy lọc khí.",
        type: "website",
        url: `${process.env.NEXT_PUBLIC_URL_WEBSITE}`,
        siteName: "SUNFIL1",
        images: {
            url: '/opengraph-image1.png',
            alt: "logo",
            width: 1200,
            height: 630,
        }
    },
    twitter: {
        title: "SUNFIL1 - Search History",
        description: "CÔNG TY CỔ PHẦN SẢN XUẤT THƯƠNG MẠI Ô TÔ VIỆT HƯNG tại Việt Nam, nơi nổi tiếng là cơ sở của ngành công nghiệp ô tô. Các sản phẩm của chúng tôi như sau: bộ lọc, cảm biến, bộ tản nhiệt, má phanh từ ô tô đến xe tải hạng nặng. Để phát huy lợi thế về giá cả và chất lượng, chúng tôi đã thành lập nhà máy lọc khí.",
        images: [
            '/opengraph-image1.png', // Replace with the actual image URL field
        ],
        card: "summary_large_image",
    },
};

interface SearchHistoryLayoutProps {
    children: React.ReactNode
}

const SearchHistoryLayout = ({ children }: SearchHistoryLayoutProps) => {
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export default SearchHistoryLayout