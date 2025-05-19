import "@/styles/globals.scss";
import LayoutMain from "@/components/layout/layout/LayoutMain";
// import { space_grotesk_sans } from "@/utils/fonts/fonts";
import { Suspense } from "react";
import { Epilogue } from "next/font/google";

const epilogue = Epilogue({
  subsets: ['latin'],
  variable: '--font-epilogue',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${epilogue.variable}`}>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            </head>
            <body className={`${epilogue.className} antialiased custom-tailwind text-responsive`}>
                <Suspense>
                    <LayoutMain>
                        {children}
                    </LayoutMain>
                </Suspense>
            </body>
        </html>
    );
}
