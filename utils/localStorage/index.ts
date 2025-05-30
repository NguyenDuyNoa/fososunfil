"use client";

/**
 * Lưu dữ liệu vào localStorage
 * @param key Khóa lưu trữ
 * @param value Giá trị cần lưu
 */
export const setLocalStorage = (key: string, value: any): void => {
  if (typeof window !== "undefined") {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Lỗi khi lưu vào localStorage:", error);
    }
  }
};

/**
 * Lấy dữ liệu từ localStorage
 * @param key Khóa cần lấy
 * @param defaultValue Giá trị mặc định nếu không tìm thấy
 * @returns Dữ liệu đã lưu hoặc giá trị mặc định
 */
export const getLocalStorage = <T>(key: string, defaultValue?: T): T | undefined => {
  if (typeof window !== "undefined") {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return defaultValue;
      }
      return JSON.parse(serializedValue);
    } catch (error) {
      console.error("Lỗi khi đọc từ localStorage:", error);
      return defaultValue;
    }
  }
  return defaultValue;
};

/**
 * Xóa dữ liệu từ localStorage
 * @param key Khóa cần xóa
 */
export const removeLocalStorage = (key: string): void => {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Lỗi khi xóa từ localStorage:", error);
    }
  }
};

/**
 * Lưu ID sản phẩm đã xem vào localStorage
 * @param productId ID sản phẩm
 * @param maxItems Số lượng sản phẩm tối đa lưu trữ
 */
export const saveViewedProduct = (productId: string, maxItems: number = 8): void => {
  if (typeof window !== "undefined" && productId) {
    try {
      const VIEWED_PRODUCTS_KEY = "viewed_products";
      // Lấy danh sách sản phẩm đã xem
      const viewedProducts = getLocalStorage<string[]>(VIEWED_PRODUCTS_KEY, []) || [];
      
      // Loại bỏ ID sản phẩm nếu đã tồn tại (để đưa lên đầu danh sách)
      const filteredProducts = viewedProducts.filter(id => id !== productId);
      
      // Thêm ID sản phẩm mới vào đầu danh sách
      const newViewedProducts = [productId, ...filteredProducts];
      
      // Giới hạn số lượng sản phẩm lưu trữ
      const limitedProducts = newViewedProducts.slice(0, maxItems);
      
      // Lưu danh sách mới
      setLocalStorage(VIEWED_PRODUCTS_KEY, limitedProducts);
    } catch (error) {
      console.error("Lỗi khi lưu sản phẩm đã xem:", error);
    }
  }
};

/**
 * Lấy danh sách ID sản phẩm đã xem
 * @returns Mảng chứa ID các sản phẩm đã xem
 */
export const getViewedProducts = (): string[] => {
  const VIEWED_PRODUCTS_KEY = "viewed_products";
  return getLocalStorage<string[]>(VIEWED_PRODUCTS_KEY, []) || [];
}; 