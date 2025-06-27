import apiAuth from '@/services/auth/auth.services';
import { useQuery, useQueryClient } from '@tanstack/react-query';

let intervalId: NodeJS.Timeout | null = null;

/**
 * Hook để cập nhật thời gian hoạt động cuối cùng của người dùng mỗi phút
 */
export const useUpdateLastTime = (enabled = true) => {
  const queryClient = useQueryClient();
  
  // Sử dụng TanStack Query để gọi API
  const { error } = useQuery({
    queryKey: ['updateLastTime'],
    queryFn: apiAuth.postUpdateLastTime,
    refetchInterval: 60000, // Tự động gọi lại mỗi 60000ms = 1 phút
    refetchIntervalInBackground: true, // Vẫn gọi khi tab không active
    refetchOnWindowFocus: false, // Không gọi lại khi focus vào cửa sổ
    retry: 3, // Thử lại 3 lần nếu lỗi
    enabled: enabled, // Chỉ gọi API khi enabled = true
  });

  // Trả về lỗi nếu có
  return { error };
};

/**
 * Bắt đầu cập nhật thời gian hoạt động cuối cùng của người dùng mỗi phút
 * Phương thức này giữ lại để tương thích với code cũ
 */
export const startUpdateLastTimeInterval = () => {
  // Dừng interval hiện tại nếu có
  stopUpdateLastTimeInterval();
  
  // Gọi API ngay lập tức lần đầu
  apiAuth.postUpdateLastTime();
  
  // Thiết lập interval gọi API mỗi phút
  intervalId = setInterval(() => {
    apiAuth.postUpdateLastTime()
      .catch(error => {
        console.error('Lỗi khi cập nhật thời gian hoạt động:', error);
      });
  }, 60000); // 60000ms = 1 phút
};

/**
 * Dừng cập nhật thời gian hoạt động
 */
export const stopUpdateLastTimeInterval = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}; 