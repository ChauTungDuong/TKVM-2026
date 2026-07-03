import { Link } from 'react-router';
import { Mail, MapPin } from 'lucide-react';
import { navLinks, CONTEST, venue } from '../data/contestData';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* ── Col 1: Brand ── */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-name">TKVM</span>
              <span className="footer-logo-year">2026</span>
            </div>
            <p className="footer-tagline">
              Cuộc thi Thiết kế Vi mạch<br />Bảo mật và An toàn Thông tin
            </p>
            <a
              href={`mailto:${CONTEST.contactEmail}`}
              className="footer-contact-link"
              id="footer-email-link"
            >
              <Mail size={15} />
              {CONTEST.contactEmail}
            </a>
          </div>

          {/* ── Col 2: Nav ── */}
          <div className="footer-nav-col">
            <h3 className="footer-col-title">Điều hướng</h3>
            <nav aria-label="Footer navigation">
              {navLinks.map(link => (
                <Link key={link.path} to={link.path} className="footer-nav-link">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Col 3: Contact ── */}
          <div className="footer-contact-col">
            <h3 className="footer-col-title">Liên hệ</h3>
            <div className="footer-contact-items">
              <div className="footer-contact-item">
                <MapPin size={15} className="footer-contact-icon" />
                <span>{venue.name}, {venue.address}</span>
              </div>
              <div className="footer-contact-item">
                <Mail size={15} className="footer-contact-icon" />
                <a href={`mailto:${CONTEST.contactEmail}`}>{CONTEST.contactEmail}</a>
              </div>
            </div>
          </div>

          {/* ── Col 4: Map ── */}
          <div className="footer-map-col">
            <h3 className="footer-col-title">Bản đồ</h3>
            <a
              href={venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-map-link"
              id="footer-map-link"
              aria-label="Mở Google Maps"
            >
              <iframe
                src={venue.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, pointerEvents: 'none' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ Học viện Kỹ thuật mật mã"
              />
              <div className="footer-map-overlay">
                <span>Mở Google Maps</span>
              </div>
            </a>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="footer-bottom">
          <p>© 2026 Cuộc thi Thiết kế Vi mạch Bảo mật · Học viện Kỹ thuật mật mã</p>
          <a
            href={CONTEST.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-register-link"
          >
            Đăng ký tham dự →
          </a>
        </div>
      </div>
    </footer>
  );
}
