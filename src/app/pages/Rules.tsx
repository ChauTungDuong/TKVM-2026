import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { rounds, prizes, CONTEST } from '../data/contestData';
import './Rules.css';

export default function Rules() {
  const [open, setOpen] = useState<string | null>('prelim');

  return (
    <div className="rules page-sections">
      <h1 className="page-title">Hình thức thi</h1>

      {/* ══════ ĐĂNG KÝ ══════════════════════════════════════ */}
      <section aria-labelledby="register-section-heading" style={{ marginBottom: 'var(--space-8)' }}>
        <div className="qr-box">
          <img src="/QR.png" alt="Mã QR đăng ký" />
          <div className="qr-content">
            <h2 id="register-section-heading" className="qr-title">Đăng ký tham dự</h2>
            <p className="qr-desc">
              Thí sinh đăng ký dự thi theo hình thức <strong>cá nhân hoặc nhóm</strong>;
              mỗi nhóm tối đa <strong>05 thành viên</strong> và chỉ được đăng ký
              tối đa <strong>01 sản phẩm</strong> dự thi.
            </p>
            <div className="qr-link-row">
              <a
                href={CONTEST.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
                id="rules-register-btn"
              >
                Đăng ký ngay
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ ACCORDION VÒNG THI ═══════════════════════════ */}
      <section aria-labelledby="rounds-heading">
        <div className="page-title-bar">
          <h2 id="rounds-heading">Các vòng thi</h2>
        </div>
        <div className="accordion" role="list">
          {rounds.map(round => {
            const isOpen = open === round.id;
            return (
              <div
                key={round.id}
                className={`accordion-item round-${round.color}`}
                role="listitem"
              >
                <button
                  className={`accordion-trigger${isOpen ? ' open' : ''}`}
                  onClick={() => setOpen(isOpen ? null : round.id)}
                  aria-expanded={isOpen}
                  id={`accordion-btn-${round.id}`}
                >
                  <div className="accordion-title">
                    <span className="accordion-round-icon">{round.icon}</span>
                    <span>{round.label}</span>
                  </div>
                  <span className="accordion-icon" aria-hidden="true">
                    <ChevronDown size={16} />
                  </span>
                </button>
                {isOpen && (
                  <div className="accordion-body" role="region" aria-labelledby={`accordion-btn-${round.id}`}>
                    <p className="accordion-desc">{round.description}</p>
                    <ul className="accordion-list">
                      {round.requirements.map((req, i) => (
                        <li key={i} className="accordion-list-item">
                          <span className="accordion-bullet" aria-hidden="true" />
                          {req}
                        </li>
                      ))}
                    </ul>
                    <div className="accordion-result">
                      <span className="accordion-result-label">Kết quả:</span>
                      {round.result}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════ CƠ CẤU GIẢI THƯỞNG ══════════════════════════ */}
      <section className="section-block" aria-labelledby="prizes-section-heading">
        <div className="section-heading">
          <div className="section-heading-dot" />
          <h2 id="prizes-section-heading">Cơ cấu giải thưởng</h2>
        </div>
        <div className="prize-grid">
          {prizes.map(p => (
            <div key={p.rank} className={`prize-card ${p.type}`}>
              <div className="prize-icon">{p.icon}</div>
              <p className="prize-name">{p.rank}</p>
              <p className="prize-qty">× {p.qty} giải</p>
              <p className="prize-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
