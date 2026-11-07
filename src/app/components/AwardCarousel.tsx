import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Play, 
  Pause, 
  Trophy, 
  GraduationCap, 
  Award,
  ArrowRight
} from 'lucide-react';
import { awardWinners, type AwardWinnerItem } from '../data/contestData';
import './AwardCarousel.css';

interface AwardCarouselProps {
  showTitle?: boolean;
}

const STORY_DURATION = 5500; // 5.5s per slide

export default function AwardCarousel({ showTitle = true }: AwardCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const total = awardWinners.length;
  const currentItem: AwardWinnerItem = awardWinners[activeIndex];

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToIndex = (index: number) => {
    setActiveIndex(index);
  };

  const effectivePlaying = isPlaying && !isHovered && !lightboxOpen;

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, goToNext, goToPrev]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) goToNext();
      else goToPrev();
    }
    setTouchStartX(null);
  };

  return (
    <div 
      className={`award-carousel-container${!effectivePlaying ? ' is-paused' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showTitle && (
        <div className="award-carousel-header">
          <div className="award-carousel-title-group">
            <span className="award-badge-pulse">
              <Trophy size={16} />
              KẾT QUẢ CHÍNH THỨC 2026
            </span>
            <h2 className="award-carousel-main-heading">
              Vinh danh các đội thi xuất sắc đoạt giải
            </h2>
            <p className="award-carousel-sub-heading">
              Vòng Chung kết cuộc thi Thiết kế Vi mạch Bảo mật và An toàn Thông tin 2026
            </p>
          </div>

          <div className="award-carousel-controls-top">
            <button 
              type="button"
              className="carousel-play-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Tạm dừng trình chiếu' : 'Tiếp tục trình chiếu'}
              title={isPlaying ? 'Tạm dừng tự động chạy' : 'Tiếp tục tự động chạy'}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              <span>{isPlaying ? 'Tự động' : 'Tạm dừng'}</span>
            </button>
            <div className="carousel-counter-badge">
              <span className="counter-current">{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="counter-separator">/</span>
              <span className="counter-total">{String(total).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Quick Rank Switcher Tabs ── */}
      <div className="award-quick-tabs" role="tablist" aria-label="Danh sách các giải thưởng">
        {awardWinners.map((winner, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={winner.id}
              role="tab"
              aria-selected={isActive}
              className={`award-quick-tab ${winner.type}${isActive ? ' active' : ''}`}
              onClick={() => goToIndex(idx)}
            >
              <span className="tab-icon">{winner.icon}</span>
              <span className="tab-label">{winner.rank}</span>
              <span className="tab-count">({winner.teams.length} đội)</span>
            </button>
          );
        })}
      </div>

      {/* ── Main Slide Showcase ── */}
      <div 
        className={`award-slide-card rank-${currentItem.type}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="award-slide-grid">
          {/* Left: Official Slide Image - 16:9 fixed ratio uncropped */}
          <div className="award-image-wrapper">
            <div 
              className="award-image-box"
              onClick={() => setLightboxOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') setLightboxOpen(true); }}
              aria-label={`Xem ảnh kích thước lớn: ${currentItem.rank}`}
            >
              <img 
                src={currentItem.image} 
                alt={`${currentItem.rank} - Cuộc thi TKVM 2026`}
                className="award-slide-img"
                loading="lazy"
              />
              <div className="award-image-overlay">
                <span className="overlay-pill">
                  <Maximize2 size={16} />
                  Phóng to ảnh
                </span>
              </div>
            </div>
          </div>

          {/* Right: Winner Info Details */}
          <div className="award-info-wrapper">
            <div className="award-info-header">
              <h3 className="award-rank-title">
                <span className="award-rank-icon">{currentItem.icon}</span> {currentItem.rank}
              </h3>
            </div>

            <div className="award-teams-list">
              <div className="teams-list-label">
                <Award size={18} className="teams-label-icon" />
                <span>
                  {currentItem.teams.length === 1
                    ? `Đội thi xuất sắc đạt ${currentItem.rank}:`
                    : `Danh sách các đội xuất sắc đạt ${currentItem.rank}:`}
                </span>
              </div>
              
              <div className="teams-cards">
                {currentItem.teams.map((t, idx) => (
                  <div key={t.teamName} className="team-item-card">
                    <div className="team-order-num">#{idx + 1}</div>
                    <div className="team-text-box">
                      <h4 className="team-name">{t.teamName}</h4>
                      <div className="team-school">
                        <GraduationCap size={16} className="school-icon" />
                        <span>{t.school}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation and Actions */}
            <div className="award-info-footer">
              <div className="carousel-nav-buttons">
                <button 
                  type="button"
                  className="carousel-nav-btn prev-btn"
                  onClick={goToPrev}
                  aria-label="Giải thưởng trước"
                  title="Giải thưởng trước"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  type="button"
                  className="carousel-nav-btn next-btn"
                  onClick={goToNext}
                  aria-label="Giải thưởng tiếp theo"
                  title="Giải thưởng tiếp theo"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <Link to="/giaithuong" className="btn btn-primary btn-sm award-details-link">
                Xem chi tiết tất cả giải
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Slide Story Progress Bar Strip (Facebook / Instagram Stories style) ── */}
        <div 
          className="award-progress-bar-strip"
          role="tablist"
          aria-label="Tiến trình chuyển slide giải thưởng"
        >
          {awardWinners.map((winner, idx) => {
            const isCompleted = idx < activeIndex;
            const isActive = idx === activeIndex;

            return (
              <button
                key={winner.id}
                type="button"
                className={`progress-bar-segment ${winner.type}${isActive ? ' active' : ''}${isCompleted ? ' completed' : ''}`}
                onClick={() => goToIndex(idx)}
                aria-label={`Chuyển tới ${winner.rank}`}
                title={winner.rank}
              >
                <span 
                  key={isActive ? `fill-${idx}-${activeIndex}` : `fill-${idx}`}
                  className={`segment-fill${isActive ? ' animated' : ''}`}
                  onAnimationEnd={isActive ? goToNext : undefined}
                  style={{
                    animationDuration: `${STORY_DURATION}ms`,
                    animationPlayState: effectivePlaying ? 'running' : 'paused',
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Lightbox Modal for High-Resolution View ── */}
      {lightboxOpen && (
        <div 
          className="award-lightbox-modal"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Xem ảnh giải thưởng phóng to"
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button"
              className="lightbox-close-btn"
              onClick={() => setLightboxOpen(false)}
              aria-label="Đóng ảnh"
            >
              <X size={24} />
            </button>

            <button 
              type="button"
              className="lightbox-nav-btn lightbox-prev"
              onClick={goToPrev}
              aria-label="Ảnh trước"
            >
              <ChevronLeft size={32} />
            </button>

            <div className="lightbox-img-frame">
              <img 
                src={currentItem.image} 
                alt={`${currentItem.rank} - TKVM 2026`} 
                className="lightbox-img"
              />
              <div className="lightbox-caption">
                <div className="lightbox-caption-rank">
                  <span>{currentItem.icon}</span> {currentItem.rank}
                </div>
                <div className="lightbox-caption-teams">
                  {currentItem.teams.map((t) => `${t.teamName} (${t.school})`).join(' • ')}
                </div>
              </div>
            </div>

            <button 
              type="button"
              className="lightbox-nav-btn lightbox-next"
              onClick={goToNext}
              aria-label="Ảnh sau"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
