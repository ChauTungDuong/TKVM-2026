import { prizes } from '../data/contestData';
import './Prizes.css';

export default function Prizes() {
  return (
    <div className="prizes page-sections">
      <h1 className="page-title">Giải thưởng</h1>

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
