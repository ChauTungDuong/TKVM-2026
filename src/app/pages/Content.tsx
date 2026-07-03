import { contentAreas, technicalLevels, evaluationCriteria } from '../data/contestData';
import './Content.css';

export default function Content() {
  return (
    <div className="content-page page-sections">
      <h1 className="page-title">Nội dung thi</h1>

      {/* ══════ CHỦ ĐỀ ══════════════════════════════════════ */}
      <section className="content-theme-box" aria-labelledby="theme-heading">
        <div className="content-theme-inner">
          <div className="content-theme-chip">Chủ đề</div>
          <h2 id="theme-heading" className="content-theme-title">
            Thiết kế Vi mạch Bảo mật<br />
            <span className="content-theme-sub">và An toàn Thông tin</span>
          </h2>
          <p className="content-theme-desc">
            Các đội dự thi nghiên cứu, đề xuất ý tưởng, thiết kế và thực hiện các
            sản phẩm, giải pháp về vi mạch bảo mật và an toàn thông tin, tối thiểu
            ở mức thiết kế logic, mô phỏng và kiểm tra thiết kế.
          </p>
        </div>
      </section>

      {/* ══════ LĨNH VỰC THI ════════════════════════════════ */}
      <section aria-labelledby="areas-heading">
        <div className="page-title-bar">
          <h2 id="areas-heading">Lĩnh vực bảo mật vi mạch</h2>
        </div>
        <p className="areas-intro">
          Sản phẩm, giải pháp có thể tập trung vào một hoặc một số lĩnh vực sau:
        </p>
        <div className="areas-grid">
          {contentAreas.map((area, idx) => (
            <div key={idx} className="area-card" id={`area-card-${idx}`}>
              <span className="area-num">0{idx + 1}</span>
              <p className="area-label">{area.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ YÊU CẦU KỸ THUẬT ════════════════════════════ */}
      <section aria-labelledby="tech-heading">
        <div className="page-title-bar">
          <h2 id="tech-heading">Yêu cầu kỹ thuật</h2>
        </div>
        <p className="tech-intro">
          Sản phẩm dự thi được đánh giá theo 3 cấp độ — cấp thấp hơn là bắt buộc,
          cấp cao hơn được khuyến khích và đánh giá điểm cộng:
        </p>
        <div className="tech-levels">
          {technicalLevels.map(level => (
            <div key={level.id} className="req-level" id={`req-level-${level.id}`}>
              <div className={`req-level-dot ${level.color}`} aria-hidden="true" />
              <div className="req-level-body">
                <h3 className="req-level-title">{level.level}</h3>
                <ul className="req-level-list">
                  {level.items.map((item, i) => (
                    <li key={i} className="req-level-item">
                      <span className="req-item-bullet" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ TIÊU CHÍ ĐÁNH GIÁ ══════════════════════════ */}
      <section className="section-block" aria-labelledby="criteria-heading">
        <div className="section-heading">
          <div className="section-heading-dot" />
          <h2 id="criteria-heading">Tiêu chí đánh giá</h2>
        </div>
        <p className="criteria-intro">
          Sản phẩm dự thi cần làm rõ các khía cạnh sau:
        </p>
        <div className="grid-2" style={{ gap: 'var(--space-4)' }}>
          {evaluationCriteria.map((c, idx) => (
            <div key={idx} className="criteria-card" id={`criteria-card-${idx}`}>
              <div className="criteria-bullet" aria-hidden="true" />
              <div>
                <h3 className="criteria-title">{c.title}</h3>
                <p className="criteria-desc">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
