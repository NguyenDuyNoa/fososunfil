import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "SUNFIL1 - Chi tiết tin tức",
    description: "SUNFIL1 chi tiết tin tức",
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL_WEBSITE}`),
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
    },
    openGraph: {
        title: "SUNFIL1 - Chi tiết tin tức",
        description: "SUNFIL1 chi tiết tin tức",
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
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return children
}
