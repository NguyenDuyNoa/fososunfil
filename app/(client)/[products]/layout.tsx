import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "SUNFIL1 - Sản phẩm",
    description: "CÔNG TY CỔ PHẦN SẢN XUẤT THƯƠNG MẠI Ô TÔ VIỆT HƯNG tại Việt Nam, nơi nổi tiếng là cơ sở của ngành công nghiệp ô tô. Các sản phẩm của chúng tôi như sau: bộ lọc, cảm biến, bộ tản nhiệt, má phanh từ ô tô đến xe tải hạng nặng. Để phát huy lợi thế về giá cả và chất lượng, chúng tôi đã thành lập nhà máy lọc khí.",
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL_WEBSITE}`),
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
    },
    openGraph: {
        title: "SUNFIL1 - Sản phẩm",
        description: "CÔNG TY CỔ PHẦN SẢN XUẤT THƯƠNG MẠI Ô TÔ VIỆT HƯNG tại Việt Nam, nơi nổi tiếng là cơ sở của ngành công nghiệp ô tô. Các sản phẩm của chúng tôi như sau: bộ lọc, cảm biến, bộ tản nhiệt, má phanh từ ô tô đến xe tải hạng nặng. Để phát huy lợi thế về giá cả và chất lượng, chúng tôi đã thành lập nhà máy lọc khí.CÔNG TY CỔ PHẦN SẢN XUẤT THƯƠNG MẠI Ô TÔ VIỆT HƯNG tại Việt Nam, nơi nổi tiếng là cơ sở của ngành công nghiệp ô tô. Các sản phẩm của chúng tôi như sau: bộ lọc, cảm biến, bộ tản nhiệt, má phanh từ ô tô đến xe tải hạng nặng. Để phát huy lợi thế về giá cả và chất lượng, chúng tôi đã thành lập nhà máy lọc khí.",
        type: "website",
        url: `${process.env.NEXT_PUBLIC_URL_WEBSITE}`,
        siteName: "SUNFIL1",
        images: {
            url: '/opengraph-image.png',
            alt: "logo",
            width: 1200,
            height: 630,
        }
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return children
}
