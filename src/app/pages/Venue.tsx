import { MapPin, ExternalLink, Info } from 'lucide-react';
import { venue } from '../data/contestData';
import './Venue.css';

export default function Venue() {
  return (
    <div className="venue page-sections">
      <h1 className="page-title">Địa điểm tổ chức</h1>

      <div className="venue-grid">
        {/* ── Left: Info ── */}
        <div className="venue-info">
          {/* Address Card */}
          <section className="section-block" aria-labelledby="venue-address-heading">
            <div className="section-heading">
              <MapPin size={22} className="venue-icon-teal" />
              <h2 id="venue-address-heading">Địa điểm tổ chức</h2>
            </div>
            <p className="venue-name">{venue.name}</p>
            <p className="venue-address">{venue.address}</p>
            <a
              href={venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm venue-maps-btn"
              id="venue-maps-btn"
            >
              <ExternalLink size={15} />
              Mở Google Maps
            </a>
          </section>

          {/* Info for participants */}
          <section className="section-block-teal venue-note" aria-labelledby="venue-info-heading">
            <div className="section-heading">
              <Info size={20} className="venue-icon-teal" />
              <h2 id="venue-info-heading" style={{ fontSize: '1.1rem' }}>Thông tin dành cho thí sinh</h2>
            </div>
            <ul className="venue-note-list">
              <li>Chung kết dự kiến tổ chức tại Hội trường Học viện Kỹ thuật mật mã.</li>
              <li>Thí sinh mang theo giấy tờ tùy thân và xác nhận đăng ký.</li>
              <li>Bãi giữ xe tại sân Học viện, miễn phí cho thí sinh tham dự.</li>
              <li>Thông tin chi tiết về địa điểm cụ thể sẽ được thông báo sau.</li>
            </ul>
          </section>
        </div>

        {/* ── Right: Map ── */}
        <div className="venue-map-wrapper" aria-label="Bản đồ địa điểm">
          <iframe
            src={venue.mapEmbed}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '420px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bản đồ Học viện Kỹ thuật mật mã, 141 Chiến Thắng, Hà Nội"
          />
        </div>
      </div>
    </div>
  );
}
