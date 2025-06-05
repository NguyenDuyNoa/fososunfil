import { useDialogStore } from "@/stores/useDialogStore";
import { ComponentType } from "react";
import ProductCard from ".";

// HOC để tự động cung cấp handleOpenDialog cho ProductCard
export const withAuthCheck = (Component: ComponentType<any>) => {
  return (props: any) => {
    const { handleOpenDialog } = useDialogStore();

    return <Component {...props} handleOpenDialog={handleOpenDialog} />;
  };
};

// Tạo phiên bản ProductCard với AuthCheck
const ProductCardWithAuthCheck = withAuthCheck(ProductCard);

export default ProductCardWithAuthCheck;
