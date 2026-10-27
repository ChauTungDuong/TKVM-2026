import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ShieldCheck, Calendar, MapPin, Users, Award, BookOpen, Clock, ChevronRight } from 'lucide-react';
import { CONTEST } from '../data/contestData';
import './Home.css';

// ── Countdown Timer component ─────────────────────────────────
function CountdownTimer({ target }: { target: string | Date }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const targetDate = new Date(target).getTime();
    const update = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / 1000 / 60) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="countdown">
      <div className="countdown-unit">
        <span className="countdown-val">{String(timeLeft.days).padStart(2, '0')}</span>
        <span className="countdown-label">Ngày</span>
      </div>
      <div className="countdown-unit">
        <span className="countdown-val">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="countdown-label">Giờ</span>
      </div>
      <div className="countdown-unit">
        <span className="countdown-val">{String(timeLeft.mins).padStart(2, '0')}</span>
        <span className="countdown-label">Phút</span>
      </div>
      <div className="countdown-unit">
        <span className="countdown-val">{String(timeLeft.secs).padStart(2, '0')}</span>
        <span className="countdown-label">Giây</span>
      </div>
    </div>
  );
}

// ── Animate on scroll hook ────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const keywords = ['Bảo mật phần cứng', 'Sáng tạo vi mạch', 'An toàn thông tin', 'Thiết kế IC'];

const quickInfoItems = [
  { icon: <Calendar size={22} />, label: 'Thời gian', val: 'Tháng 6–11/2026' },
  { icon: <MapPin size={22} />,   label: 'Địa điểm', val: 'Học viện KTMM, Hà Nội' },
  { icon: <Users size={22} />,    label: 'Nhóm',     val: 'Tối đa 5 thành viên' },
  { icon: <Award size={22} />,    label: 'Giải thưởng', val: '8 giải + chứng nhận' },
];

const intro =
  'Cuộc thi Thiết kế vi mạch bảo mật và an toàn thông tin nhằm tạo môi trường học thuật cho sinh viên ' +
  'các trường đại học nghiên cứu, sáng tạo và vận dụng kiến thức chuyên ngành thiết kế vi mạch, ' +
  'an toàn thông tin vào thực tiễn. Góp phần phát hiện, bồi dưỡng và phát triển nguồn nhân lực ' +
  'chất lượng cao trong lĩnh vực thiết kế vi mạch, đặc biệt là thiết kế vi mạch bảo mật và an toàn phần cứng. ' +
  'Tăng cường kết nối, trao đổi chuyên môn giữa sinh viên với đội ngũ giảng viên, chuyên gia trong lĩnh vực thiết kế vi mạch và an toàn thông tin.';

const targetAudience = [
  {
    icon: <BookOpen size={24} />,
    title: 'Đối tượng tham dự',
    desc: 'Sinh viên tại các trường đại học, học viện trên toàn quốc có ý tưởng, dự án, đề tài nghiên cứu ứng dụng trong lĩnh vực thiết kế vi mạch bảo mật, an toàn phần cứng.',
  },
  {
    icon: <Users size={24} />,
    title: 'Hình thức đăng ký',
    desc: 'Thí sinh có thể đăng ký cá nhân hoặc theo nhóm; mỗi nhóm dự thi không quá 05 thành viên. Mỗi thí sinh chỉ được tham gia 01 nhóm dự thi; mỗi nhóm được đăng ký tối đa 01 sản phẩm dự thi.',
  },
];

const quickLinks = [
  { path: '/thoigian',  label: 'Lịch trình thi',      desc: 'Chi tiết các mốc từ phát động đến Chung kết', icon: <Clock size={22} />,      color: 'teal' },
  { path: '/hinhthuc',  label: 'Thể lệ & Quy định',   desc: 'Hồ sơ, yêu cầu sản phẩm và quy chế',         icon: <ShieldCheck size={22} />,color: 'amber' },
  { path: '/noidung',   label: 'Nội dung & Tiêu chí', desc: 'Chủ đề bảo mật và bộ tiêu chí đánh giá',     icon: <BookOpen size={22} />,   color: 'navy' },
  { path: '/diadiem',   label: 'Địa điểm tổ chức',    desc: 'Sơ đồ, chỉ dẫn đến Học viện Kỹ thuật mật mã', icon: <MapPin size={22} />,     color: 'slate' },
];

const prizes = [
  { rank: 'Giải Nhất',        qty: '01', icon: '', type: 'first' },
  { rank: 'Giải Nhì',         qty: '01', icon: '', type: 'second' },
  { rank: 'Giải Ba',          qty: '02', icon: '', type: 'third' },
  { rank: 'Giải Khuyến khích',qty: '04', icon: '', type: 'honorable' },
];

export default function Home() {
  const infoRef   = useReveal();
  const introRef  = useReveal();
  const targetRef = useReveal();
  const qrRef     = useReveal();
  const linksRef  = useReveal();

  return (
    <div className="home-page-seamless">
      {/* ══════ ACTION & OVERVIEW BLOCK ════════════════════════ */}
      <section className="home-action-block" aria-label="Tổng quan cuộc thi">
        <div className="home-action-grid">
          {/* Left Block: Intro & CTA */}
          <div className="home-cta-box">
            <div className="home-cta-header">
              <span className="badge badge-amber">TKVM 2026</span>
              <div className="home-keyword-list">
                {keywords.map(kw => (
                  <span key={kw} className="home-keyword-tag">{kw}</span>
                ))}
              </div>
            </div>
            <h1 className="home-cta-title">
              Sân chơi học thuật uy tín về<br />
              <span className="text-highlight">Vi mạch Bảo mật & An toàn Thông tin</span>
            </h1>
            <p className="home-cta-desc">
              Tạo môi trường nghiên cứu, sáng tạo và vận dụng kiến thức chuyên ngành
              vào thực tiễn, thúc đẩy phát triển nguồn nhân lực chất lượng cao.
            </p>
            <div className="home-info-row">
              <div className="info-chip">
                <Calendar size={16} />
                Tháng 6 – 11 / 2026
              </div>
              <div className="info-chip">
                <MapPin size={16} />
                Học viện Kỹ thuật mật mã, Hà Nội
              </div>
            </div>
            <div className="home-button-group">
              <a
                href={CONTEST.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
                id="home-register-btn"
              >
                Đăng ký ngay
              </a>
              <Link to="/hinhthuc" className="btn btn-secondary btn-lg" id="home-rules-btn">
                Xem thể lệ chi tiết
              </Link>
            </div>
          </div>

          {/* Right Block: Live Countdown Card (removed 5-member pill) */}
          <div className="home-countdown-card">
            <div className="home-countdown-inner">
              <div className="countdown-icon-badge">
                <ShieldCheck size={28} />
              </div>
              <span className="countdown-eyebrow">Thời gian đếm ngược đến</span>
              <h2 className="countdown-heading">Vòng Chung Kết</h2>
              <p className="countdown-date">07 / 11 / 2026</p>
              <div className="countdown-wrapper">
                <CountdownTimer target={CONTEST.finalDate} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ QUICK INFO STRIP (Seamless without box border) ════ */}
      <section className="home-quick-info-strip animate-fade-up" ref={infoRef} aria-label="Thông tin nhanh">
        <div className="quick-info-grid">
          {quickInfoItems.map(item => (
            <div key={item.label} className="quick-info-item">
              <span className="quick-info-icon">{item.icon}</span>
              <div>
                <p className="quick-info-label">{item.label}</p>
                <p className="quick-info-val">{item.val}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ UNIFIED INTRO & TARGET (Seamless content flow) ══ */}
      <section className="home-content-section animate-fade-up" ref={introRef} aria-labelledby="intro-heading">
        <div className="section-heading">
          <div className="section-heading-dot" />
          <h2 id="intro-heading">Giới thiệu cuộc thi</h2>
        </div>
        <p className="intro-text">{intro}</p>

        <div ref={targetRef} className="target-seamless-grid" style={{ marginTop: 'var(--space-8)' }}>
          {targetAudience.map(item => (
            <div key={item.title} className="target-flat-panel">
              <div className="target-panel-icon">{item.icon}</div>
              <div>
                <h3 className="target-panel-title">{item.title}</h3>
                <p className="target-panel-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ ĐĂNG KÝ (QR) - Removed raw link string ══════════ */}
      <section className="animate-fade-up" ref={qrRef} aria-labelledby="register-heading">
        <div className="qr-box">
          <img src="/QR.png" alt="Mã QR đăng ký" />
          <div className="qr-content">
            <h2 id="register-heading" className="qr-title">Đăng ký trực tuyến</h2>
            <p className="qr-desc">
              Quét mã QR hoặc truy cập đường link để đăng ký dự thi.
              Mỗi nhóm tối đa <strong>05 thành viên</strong>, mỗi nhóm đăng ký
              tối đa <strong>01 sản phẩm</strong>.
            </p>
            <div className="qr-link-row">
              <a
                href={CONTEST.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
                id="qr-register-btn"
              >
                Đăng ký ngay
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ QUICK LINKS ════════════════════════════════════ */}
      <section className="home-content-section animate-fade-up" ref={linksRef} aria-labelledby="links-heading">
        <div className="section-heading" style={{ marginBottom: 'var(--space-6)' }}>
          <div className="section-heading-dot" />
          <h2 id="links-heading">Khám phá cuộc thi</h2>
        </div>
        <div className="quick-links-grid">
          {quickLinks.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`quick-link-card quick-link-${item.color}`}
              id={`quick-link-${item.path.replace('/', '')}`}
            >
              <span className="quick-link-icon">{item.icon}</span>
              <div>
                <p className="quick-link-label">{item.label}</p>
                <p className="quick-link-desc">{item.desc}</p>
              </div>
              <ChevronRight size={18} className="quick-link-arrow" />
            </Link>
          ))}
        </div>
      </section>

      {/* ══════ PRIZES PREVIEW ════════════════════════════════ */}
      <section className="home-prizes-section" aria-labelledby="prizes-heading">
        <div className="section-heading">
          <div className="section-heading-dot" />
          <h2 id="prizes-heading">Cơ cấu giải thưởng</h2>
        </div>
        <div className="prize-grid">
          {prizes.map(p => (
            <div key={p.rank} className={`prize-card ${p.type}`}>
              <div className="prize-icon">{p.icon}</div>
              <p className="prize-name">{p.rank}</p>
              <p className="prize-qty">× {p.qty}</p>
            </div>
          ))}
        </div>
        <p className="prize-note">Tiền thưởng, giấy chứng nhận và biểu trưng cho mỗi giải.</p>
        <div style={{ textAlign: 'center', marginTop: 'var(--space-5)' }}>
          <Link to="/hinhthuc" className="btn btn-secondary" id="home-rules-link">
            Xem chi tiết hình thức thi →
          </Link>
        </div>
      </section>
    </div>
  );
}
