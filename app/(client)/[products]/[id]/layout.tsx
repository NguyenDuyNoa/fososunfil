import apiProducts from "@/services/products/products.services";
import type { Metadata } from "next";

async function getDetailProduct(id: string) {
  try {
    const response = await apiProducts.getDetailItem(id);
    return response.data.item;
  } catch (error) {
    console.error("Error fetching product detail:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  try {
    const { id } = await params;
    const productId = id.split("-").pop() || "";
    const productData = await getDetailProduct(productId);

    if (!productData) {
      return {
        title: "Sản phẩm không tồn tại",
        description: "Không tìm thấy sản phẩm bạn yêu cầu",
      };
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_URL_WEBSITE || "https://sunfil1.com";
    const canonicalUrl = `${baseUrl}/product/${id}`;

    return {
      title: productData.name,
      description: "SUNFIL1 chi tiết sản phẩm",
      metadataBase: new URL(baseUrl),
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: productData.name,
        description: "SUNFIL1 chi tiết sản phẩm",
        url: canonicalUrl,
        siteName: "Sunfil1",
        images: [
          {
            url: productData.image_detail,
            width: 1200,
            height: 630,
            alt: productData.name,
          },
        ],
        locale: "vi_VN",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: productData.name,
        description: "SUNFIL1 chi tiết sản phẩm",
        images: [productData.image_detail],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Sản phẩm - Sunfil1",
      description:
        "Các sản phẩm của Sunfil1",
    };
  }
}
// export const metadata: Metadata = {
//   title: "SUNFIL1 - Chi tiết sản phẩm",
//   description: "SUNFIL1 chi tiết sản phẩm",
//   metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL_WEBSITE}`),
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon.ico",
//   },
//   openGraph: {
//     title: "SUNFIL1 - Chi tiết sản phẩm",
//     description: "SUNFIL1 chi tiết sản phẩm",
//     type: "website",
//     url: `${process.env.NEXT_PUBLIC_URL_WEBSITE}`,
//     siteName: "SUNFIL1",
//     images: {
//       url: "/opengraph-image2.png",
//       alt: "logo",
//       width: 1200,
//       height: 630,
//     },
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
