import { Outlet } from 'react-router';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

export default function Root() {
  return (
    <div className="site-wrapper">
      <Header />
      {/* Push content below fixed header */}
      <div style={{ height: 'var(--header-h)' }} aria-hidden="true" />
      
      {/* Banner cố định trên tất cả các trang: tự động chuyển ảnh theo kích thước màn hình */}
      <div className="global-banner-wrapper">
        <picture className="global-banner-picture">
          <source media="(min-width: 1200px)" srcSet="/banner-extension.jpg" />
          <img
            src="/banner.jpg"
            alt="Cuộc thi Thiết kế Vi mạch Bảo mật và An toàn Thông tin 2026"
            className="global-banner-img"
          />
        </picture>
      </div>

      <div className="content-area">
        <main className="main-content" id="main-content">
          <Outlet />
        </main>
        <Sidebar />
      </div>
      <Footer />
    </div>
  );
}
