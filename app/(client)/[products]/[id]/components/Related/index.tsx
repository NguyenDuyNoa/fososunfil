import ProductCardWithAuthCheck from "@/components/productCard/withAuthCheck";
import SwiperCarousel from "@/components/SwiperCarousel";

const breakpoints = {
  320: { slidesPerView: 2.5 },
  640: { slidesPerView: 3 },
  768: { slidesPerView: 3 },
  1024: { slidesPerView: 4 },
  1280: { slidesPerView: 4 },
};

const Related = ({ detailItem }: { detailItem: any }) => {
  return (
    <div className="flex flex-col gap-3 xl:gap-8 p-3 xl:p-8 bg-white rounded-lg">
      <h2 className="text-lg xl:text-2xl font-semibold text-primary-new">
        Sản phẩm liên quan
      </h2>

      {/* Mobile View */}
      <div className="block xl:hidden">
        <SwiperCarousel
          items={detailItem}
          breakpoints={breakpoints}
          spaceBetween={8}
          showNavigation={false}
        />
      </div>

      {/* Desktop View */}
      <div className="hidden xl:grid grid-cols-1 gap-4">
        {detailItem?.map((product: any, index: number) => (
          <ProductCardWithAuthCheck
            key={index}
            isHorizontal
            product={product}
            isRelated={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Related;
