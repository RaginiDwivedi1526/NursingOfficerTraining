import { Hospital, Globe, MapPin, CalendarCheck, Target, Zap, Star, ChevronRight, Stethoscope } from 'lucide-react';

function CareerPortalPage() {
  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: 'var(--bg-color, #0f172a)' }}>
      <section className="courses-section" id="career">
        <div className="section-header">
          <div className="section-tag">Career Portal</div>
          <h2 className="section-title">Latest Nursing Job<br />Notifications & Vacancies</h2>
          <p className="section-sub">Stay updated with the latest government and private sector nursing recruitment drives across India.</p>
        </div>
        <div className="courses-grid">
          {[
            { color: 'blue', badge: <><Zap size={12} /> Active Hiring</>, icon: <Hospital size={48} color="white" />, title: 'AIIMS NORCET 2026', desc: 'Nursing Officer Recruitment Common Eligibility Test for all AIIMS institutes across India.', meta: [<><MapPin size={12} /> Pan India</>, <><CalendarCheck size={12} /> Upcoming</>, <><Target size={12} /> 3000+ Posts</>] },
            { color: 'red', badge: <><Star size={12} /> Just Announced</>, icon: <Stethoscope size={48} color="white" />, title: 'ESIC Staff Nurse Recruitment', desc: 'Employee State Insurance Corporation massive recruitment drive for Staff Nurses in various states.', meta: [<><MapPin size={12} /> State-wise</>, <><CalendarCheck size={12} /> Apply Now</>, <><Target size={12} /> 1900+ Posts</>] },
            { color: 'gold', badge: <><Zap size={12} /> High Alert</>, icon: <Globe size={48} color="white" />, title: 'RRB Nursing Officer', desc: 'Railway Recruitment Board notifications for Chief Nursing Superintendent & Staff Nurse.', meta: [<><MapPin size={12} /> Indian Railways</>, <><CalendarCheck size={12} /> Expected Soon</>, <><Target size={12} /> 1100+ Posts</>] }
          ].map((c, i) => (
            <div className="course-card" key={i}>
              <div className={`course-img ${c.color}`}>
                <div className="course-badge-pill">{c.badge}</div>
                {c.icon}
              </div>
              <div className="course-body">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <div className="course-meta">{c.meta.map((m, j) => <span className="meta-pill" key={j}>{m}</span>)}</div>
                <button className="course-btn" onClick={() => alert('Detailed notification will be available soon.')}>View Details <ChevronRight size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CareerPortalPage;
