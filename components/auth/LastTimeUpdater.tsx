'use client';

import { KEY_COOKIES } from '@/constants/Cookie';
import useCookieStore from '@/stores/useCookieStore';
import { useUpdateLastTime } from '@/utils/updateLastTime';
import { useEffect } from 'react';

/**
 * Component để quản lý việc cập nhật thời gian hoạt động của người dùng
 * Component này sẽ tự động bắt đầu interval khi được mount và người dùng đã đăng nhập
 * Và sẽ dừng interval khi component unmount
 */
const LastTimeUpdater = () => {
  const { getCookie } = useCookieStore();
  const token = getCookie(KEY_COOKIES.WEBSITE);
  
  // Sử dụng hook TanStack Query để cập nhật thời gian hoạt động
  // Chỉ kích hoạt khi có token (đã đăng nhập)
  const { error } = useUpdateLastTime(!!token);
  
  // Log lỗi nếu có
  useEffect(() => {
    if (error) {
      console.error('Lỗi khi cập nhật thời gian hoạt động:', error);
    }
  }, [error]);

  // Component này không render bất kỳ UI nào
  return null;
};

export default LastTimeUpdater; 