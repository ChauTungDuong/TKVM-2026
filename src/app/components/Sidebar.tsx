import { Building2 } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Đơn vị tổ chức">
      <div className="sidebar-sticky">
        {/* ── Đơn vị chủ trì ── */}
        <div className="sidebar-section">
          <div className="sidebar-section-header">
            <Building2 size={16} className="sidebar-section-icon" />
            <span className="sidebar-section-title">Đơn vị chủ trì</span>
          </div>
          <div className="sidebar-org">
            <div className="sidebar-logo-wrap">
              <img
                src="/images/kma.png"
                alt="Logo Học viện Kỹ thuật mật mã"
                className="sidebar-logo"
                loading="lazy"
              />
            </div>
            <p className="sidebar-org-name">Học viện Kỹ thuật mật mã</p>
          </div>
        </div>

        {/*
          ── Placeholder: Đơn vị phối hợp ──
          Bỏ comment khi có dữ liệu:

        <div className="sidebar-section">
          <div className="sidebar-section-header">
            <Users size={16} className="sidebar-section-icon" />
            <span className="sidebar-section-title">Đơn vị phối hợp</span>
          </div>
          // logo + tên đơn vị...
        </div>
        */}

        {/*
          ── Placeholder: Đơn vị đồng hành ──
          Bỏ comment khi có dữ liệu:

        <div className="sidebar-section">
          <div className="sidebar-section-header">
            <Shield size={16} className="sidebar-section-icon" />
            <span className="sidebar-section-title">Đơn vị đồng hành</span>
          </div>
          // logo + tên đơn vị...
        </div>
        */}
      </div>
    </aside>
  );
}
