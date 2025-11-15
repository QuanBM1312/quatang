import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Lấy GA ID từ biến môi trường thay vì hardcode
const GA_TRACKING_ID = "G-88X69NNQ2K"; // import.meta.env.VITE_GA_ID;

// Khai báo kiểu cho window.gtag để TypeScript không báo lỗi
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event',
      targetId: string,
      config?: { [key: string]: any }
    ) => void;
  }
}

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Kiểm tra xem gtag có tồn tại không và có GA_TRACKING_ID không
    if (!GA_TRACKING_ID || typeof window.gtag !== 'function') {
      return;
    }

    // Gửi sự kiện page_view mỗi khi location thay đổi
    window.gtag('config', GA_TRACKING_ID, {
      page_path: location.pathname + location.search,
    });

  }, [location]); // Dependency array này đảm bảo useEffect chạy lại mỗi khi URL thay đổi

  return null; // Component này không render gì ra giao diện cả
};

export default AnalyticsTracker;
