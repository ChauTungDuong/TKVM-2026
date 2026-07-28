import { Link, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks, CONTEST } from '../data/contestData';
import './Header.css';

export default function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="header-inner">
        {/* ── Logo ── */}
        <Link to="/" className="header-logo" aria-label="TKVM 2026 – Trang chủ">
          <div className="logo-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <rect width="28" height="28" rx="7" fill="currentColor" opacity="0.12"/>
              <path d="M7 21V10l7-4 7 4v11" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <rect x="11" y="15" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.8"/>
              <circle cx="14" cy="18" r="1.2" fill="currentColor"/>
            </svg>
          </div>
          <div className="logo-text">
            <span className="logo-name">ICD <span className="logo-year">2026</span></span>
            <span className="logo-sub">Thiết kế Vi mạch Bảo mật</span>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="header-nav" aria-label="Điều hướng chính">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link${location.pathname === link.path ? ' active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── CTA ── */}
        <div className="header-actions">
          <a
            href={CONTEST.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm header-cta"
            id="header-register-btn"
          >
            Đăng ký tham dự
          </a>

          {/* Mobile toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <nav className="mobile-menu" aria-label="Menu di động">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-nav-link${location.pathname === link.path ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={CONTEST.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mobile-cta"
            id="mobile-register-btn"
          >
            Đăng ký tham dự
          </a>
        </nav>
      )}
    </header>
  );
}
