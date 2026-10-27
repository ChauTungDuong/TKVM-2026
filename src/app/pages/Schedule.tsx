import { scheduleRows } from '../data/contestData';
import './Schedule.css';

const phaseColors: Record<string, string> = {
  kickoff:    'teal',
  develop:    'slate',
  submit:     'amber',
  prelim:     'navy',
  'final-prep': 'slate',
  final:      'final',
};

const phaseLabels: Record<string, string> = {
  kickoff:    'Khởi động',
  develop:    'Phát triển',
  submit:     'Nộp bài',
  prelim:     'Sơ loại',
  'final-prep': 'Chuẩn bị CK',
  final:      'Chung kết',
};

export default function Schedule() {
  return (
    <div className="schedule page-sections">
      <h1 className="page-title">Thời gian thi</h1>

      {/* ══════ INTRO ════════════════════════════════════════ */}
      <section className="section-block-teal" aria-label="Tổng quan thời gian">
        <p className="schedule-intro">
          Cuộc thi diễn ra từ <strong>tháng 6/2026</strong> đến <strong>tháng 11/2026</strong>,
          bao gồm các giai đoạn từ phát động, đào tạo, nộp bài, vòng sơ loại đến chung kết và trao giải.
        </p>
      </section>

      {/* ══════ TABLE ════════════════════════════════════════ */}
      <section aria-labelledby="schedule-table-heading">
        <div className="page-title-bar">
          <h2 id="schedule-table-heading">Lịch trình chi tiết</h2>
        </div>
        <div className="table-wrapper">
          <table className="data-table" role="table">
            <thead>
              <tr>
                <th scope="col">Thời gian</th>
                <th scope="col">Nội dung công việc</th>
                <th scope="col">Thực hiện</th>
                <th scope="col">Kết quả cần đạt</th>
              </tr>
            </thead>
            <tbody>
              {scheduleRows.map((row, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="schedule-time-cell">
                      <span className={`phase-badge phase-${phaseColors[row.phase]}`}>
                        {phaseLabels[row.phase]}
                      </span>
                      <span className="schedule-date">{row.time}</span>
                    </div>
                  </td>
                  <td>{row.task}</td>
                  <td>
                    <span className="executor-chip">{row.executor}</span>
                  </td>
                  <td>{row.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ══════ TIMELINE VISUAL ══════════════════════════════ */}
      <section aria-labelledby="timeline-heading">
        <div className="page-title-bar">
          <h2 id="timeline-heading">Tiến trình cuộc thi</h2>
        </div>
        <div className="timeline" role="list">
          {scheduleRows.map((row, idx) => (
            <div
              key={idx}
              className="timeline-item"
              role="listitem"
            >
              <div className={`timeline-dot${row.phase === 'final' ? ' final' : ''}`} aria-hidden="true" />
              <div className="timeline-content">
                <p className="timeline-date">{row.time}</p>
                <p className="timeline-label">{row.task}</p>
                <div className="timeline-meta">
                  <span className="timeline-sub">Thực hiện: {row.executor}</span>
                  <span className="timeline-result">→ {row.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
