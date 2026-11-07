import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { 
  Trophy, 
  Award, 
  GraduationCap, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { awardWinners, prizes, type AwardWinnerItem } from '../data/contestData';
import './Prizes.css';

export default function Prizes() {
  // Main tabs: 'results' (Kết quả Vòng chung kết) | 'structure' (Cơ cấu giải thưởng)
  const [activeMainTab, setActiveMainTab] = useState<'results' | 'structure'>('results');
  
  // Filter for award ranks in the results tab: 'all' | rank id
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  
  // Lightbox modal state
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (modalIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalIndex(null);
      if (e.key === 'ArrowRight') {
        setModalIndex((prev) => (prev !== null ? (prev + 1) % awardWinners.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setModalIndex((prev) => (prev !== null ? (prev - 1 + awardWinners.length) % awardWinners.length : null));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalIndex]);

  const filteredAwards = selectedFilter === 'all' 
    ? awardWinners 
    : awardWinners.filter(w => w.id === selectedFilter);

  const modalItem: AwardWinnerItem | null = modalIndex !== null ? awardWinners[modalIndex] : null;

  return (
    <div className="prizes-page page-sections">
      {/* ══════ PAGE HEADER & ANNOUNCEMENT ══════════════════════ */}
      <section className="prizes-hero-block" aria-label="Tiêu đề giải thưởng">
        <div className="prizes-hero-badge">
          <Sparkles size={16} />
          <span>VÒNG CHUNG KẾT 2026</span>
        </div>
        <h1 className="prizes-main-title">Kết Quả & Cơ Cấu Giải Thưởng</h1>
        <p className="prizes-hero-sub">
          Cuộc thi Thiết kế Vi mạch Bảo mật và An toàn Thông tin 2026
        </p>

        {/* Highlight notification bar */}
        <div className="prizes-notice-card">
          <div className="notice-icon-box">
            <Trophy size={24} />
          </div>
          <div className="notice-text-box">
            <h3 className="notice-title">
              Kết quả vòng Chung kết cuộc thi TKVM an toàn và bảo mật 2026
            </h3>
            <p className="notice-desc">
              Ban Tổ chức trân trọng chúc mừng <strong>10 đội thi xuất sắc nhất</strong> đã vượt qua các vòng thi
              và xuất sắc giành giải thưởng tại Vòng Chung kết ngày 07/11/2026!
            </p>
          </div>
        </div>
      </section>

      {/* ══════ MAIN TABS SWITCHER ════════════════════════════ */}
      <section className="prizes-tabs-nav-section" aria-label="Chọn chế độ xem giải thưởng">
        <div className="main-tabs-bar" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeMainTab === 'results'}
            className={`main-tab-btn${activeMainTab === 'results' ? ' active' : ''}`}
            onClick={() => setActiveMainTab('results')}
          >
            <Trophy size={18} />
            <span>Kết quả Vòng Chung kết (10 Đội)</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeMainTab === 'structure'}
            className={`main-tab-btn${activeMainTab === 'structure' ? ' active' : ''}`}
            onClick={() => setActiveMainTab('structure')}
          >
            <Layers size={18} />
            <span>Cơ cấu & Thể lệ Giải thưởng</span>
          </button>
        </div>
      </section>

      {/* ══════ TAB 1: KẾT QUẢ VÒNG CHUNG KẾT ══════════════════ */}
      {activeMainTab === 'results' && (
        <section className="prizes-results-view animate-fade-in" aria-label="Chi tiết kết quả các giải thưởng">
          {/* Sub-filter tabs */}
          <div className="awards-filter-bar">
            <span className="filter-bar-label">Lọc theo hạng mục:</span>
            <div className="filter-buttons-scroll">
              <button
                type="button"
                className={`filter-btn${selectedFilter === 'all' ? ' active' : ''}`}
                onClick={() => setSelectedFilter('all')}
              >
                Tất cả các giải (5)
              </button>
              {awardWinners.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  className={`filter-btn ${w.type}${selectedFilter === w.id ? ' active' : ''}`}
                  onClick={() => setSelectedFilter(w.id)}
                >
                  <span>{w.icon}</span>
                  <span>{w.rank}</span>
                  <span className="filter-count">({w.teams.length})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Award items in order: Nhất -> Nhì -> Ba -> Khuyến khích -> Triển vọng */}
          <div className="award-cards-stack">
            {filteredAwards.map((award) => {
              const globalIndex = awardWinners.findIndex((item) => item.id === award.id);
              return (
                <article 
                  key={award.id} 
                  id={award.id}
                  className={`award-detail-card rank-${award.type}`}
                >
                  <div className="award-detail-header">
                    <div className="award-badge-and-title">
                      <span className={`award-rank-pill ${award.type}`}>
                        {award.icon} {award.rank}
                      </span>
                    </div>
                  </div>

                  <div className="award-detail-body">
                    {/* Official Slide Picture */}
                    <div className="award-slide-media-box">
                      <div 
                        className="media-aspect-wrapper"
                        onClick={() => setModalIndex(globalIndex)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter') setModalIndex(globalIndex); }}
                        aria-label={`Xem ảnh kích thước lớn: ${award.rank}`}
                      >
                        <img 
                          src={award.image} 
                          alt={`Ảnh trao giải ${award.rank} - TKVM 2026`}
                          className="award-media-img"
                          loading="lazy"
                        />
                        <div className="media-zoom-overlay">
                          <span className="media-zoom-pill">
                            <Maximize2 size={16} />
                            Phóng to ảnh
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Winning teams presentation */}
                    <div className="award-teams-showcase">
                      <h3 className="teams-showcase-title">
                        <Award size={20} className="showcase-icon" />
                        {award.teams.length === 1 
                          ? `Đội thi xuất sắc đạt ${award.rank}:` 
                          : `Danh sách các đội xuất sắc đạt ${award.rank}:`}
                      </h3>

                      <div className="teams-roster-list">
                        {award.teams.map((t, idx) => (
                          <div key={t.teamName} className="roster-item-card">
                            <div className="roster-badge-col">
                              <span className="roster-order-badge">#{idx + 1}</span>
                              <CheckCircle2 size={18} className="verified-icon" />
                            </div>
                            <div className="roster-content-col">
                              <h4 className="roster-team-name">{t.teamName}</h4>
                              <div className="roster-school-line">
                                <GraduationCap size={16} className="school-bullet" />
                                <span className="roster-school-name">{t.school}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="card-congratulation-note">
                        <span>👏 Chúc mừng đội thi đã hoàn thành xuất sắc đề tài tại Cuộc thi TKVM 2026!</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* ══════ TAB 2: CƠ CẤU & THỂ LỆ GIẢI THƯỞNG ══════════════ */}
      {activeMainTab === 'structure' && (
        <section className="prizes-structure-view animate-fade-in" aria-label="Cơ cấu và thể lệ giải thưởng">
          <div className="section-block">
            <div className="section-heading">
              <div className="section-heading-dot" />
              <h2>Cơ cấu giải thưởng chính thức</h2>
            </div>
            <p style={{ color: 'var(--slate)', marginBottom: 'var(--space-6)', lineHeight: 1.7 }}>
              Cuộc thi Thiết kế Vi mạch Bảo mật và An toàn Thông tin 2026 trao tặng giải thưởng cho các đội thi
              có sản phẩm xuất sắc nhất, bao gồm cúp/biểu trưng, giấy chứng nhận từ Ban Tổ chức và tiền thưởng giá trị.
            </p>

            <div className="prize-grid">
              {prizes.map((p) => (
                <div key={p.rank} className={`prize-card ${p.type}`}>
                  <div className="prize-icon">{p.icon}</div>
                  <h3 className="prize-name">{p.rank}</h3>
                  <p className="prize-qty">× {p.qty} giải</p>
                  <p className="prize-desc" style={{ marginTop: '8px', fontSize: '0.9rem', color: 'var(--slate)' }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick link back to results tab */}
          <div className="switch-to-results-card">
            <div>
              <h3 className="switch-card-title">Xem danh sách 10 đội đoạt giải Vòng Chung kết</h3>
              <p className="switch-card-desc">
                Hình ảnh trao giải và danh sách chi tiết các trường đại học, học viện đoạt giải.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setActiveMainTab('results')}
            >
              Xem kết quả ngay
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      )}

      {/* ══════ LIGHTBOX MODAL ════════════════════════════════ */}
      {modalItem && modalIndex !== null && (
        <div 
          className="award-lightbox-modal"
          onClick={() => setModalIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Xem ảnh giải thưởng kích thước lớn"
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button"
              className="lightbox-close-btn"
              onClick={() => setModalIndex(null)}
              aria-label="Đóng ảnh"
            >
              <X size={24} />
            </button>

            <button 
              type="button"
              className="lightbox-nav-btn lightbox-prev"
              onClick={() => setModalIndex((modalIndex - 1 + awardWinners.length) % awardWinners.length)}
              aria-label="Ảnh trước"
            >
              <ChevronLeft size={32} />
            </button>

            <div className="lightbox-img-frame">
              <img 
                src={modalItem.image} 
                alt={`${modalItem.rank} - TKVM 2026`} 
                className="lightbox-img"
              />
              <div className="lightbox-caption">
                <div className="lightbox-caption-rank">
                  <span>{modalItem.icon}</span> {modalItem.rank}
                </div>
                <div className="lightbox-caption-teams">
                  {modalItem.teams.map((t) => `${t.teamName} (${t.school})`).join(' • ')}
                </div>
              </div>
            </div>

            <button 
              type="button"
              className="lightbox-nav-btn lightbox-next"
              onClick={() => setModalIndex((modalIndex + 1) % awardWinners.length)}
              aria-label="Ảnh sau"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      )}

      {/* ══════ BOTTOM NAVIGATION HELPER ═══════════════════════ */}
      <section className="prizes-bottom-action">
        <Link to="/" className="btn btn-secondary">
          ← Về Trang chủ
        </Link>
        <Link to="/hinhthuc" className="btn btn-primary">
          Xem Thể lệ cuộc thi →
        </Link>
      </section>
    </div>
  );
}
