import { Skeleton } from "../ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white shadow rounded-xl overflow-hidden">
      <div className="bg-white h-[150px] xl:h-[235px] w-full p-1 rounded-sm">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="p-3 pt-2 flex flex-col gap-2">
        <Skeleton className="w-1/2 h-6" />
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-1/2 h-6" />
        <Skeleton className="w-1/2 h-6" />
        <Skeleton className="w-full h-9" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
