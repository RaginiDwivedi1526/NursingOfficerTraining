import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

function PricingPage() {
  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: 'var(--bg-color, #0f172a)' }}>
      <section className="pricing-section" id="pricing">
        <div className="section-header center">
          <div className="section-tag">Pricing Plans</div>
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p className="section-sub">Choose the plan that fits your preparation stage.</p>
        </div>
        <div className="pricing-grid">
          {[
            { tier: 'Starter', name: 'Free Plan', price: '0', per: '/forever', features: ['10 MCQ tests per month', 'Basic performance chart', '2 recorded lectures'], noFeatures: ['AI analysis', 'Live classes', 'Mentorship'] },
            { tier: 'Basic', name: 'Basic Plan', price: '999', per: '/month', features: ['Unlimited MCQ tests', 'All recorded lectures', 'PDF materials', 'Basic AI analysis'], noFeatures: ['Live classes', 'Mentorship'] },
            { tier: 'Standard', name: 'Standard Plan', price: '1,999', per: '/month', featured: true, features: ['Everything in Basic', 'Live class access', 'Full AI analytics', 'Weekly progress reports', 'WhatsApp community', 'Doubt solving'], noFeatures: ['Personal mentorship'] },
            { tier: 'Pro', name: 'Pro Mentorship', price: '4,999', per: '/month', features: ['Everything in Standard', '1-on-1 mentorship', 'Personalized study plan', 'Interview preparation', 'AI doubt solver', 'Priority support', 'Job guidance'], noFeatures: [] }
          ].map((p, i) => (
            <div className={`price-card ${p.featured ? 'featured' : ''}`} key={i}>
              {p.featured && <div className="featured-pill"><Star size={10} /> MOST POPULAR</div>}
              <div className="price-tier">{p.tier}</div>
              <h3>{p.name}</h3>
              <div className="price-amount"><span className="currency">₹</span>{p.price}<span className="per">{p.per}</span></div>
              <div className="price-divider"></div>
              <ul className="price-features">
                {p.features.map((f, j) => <li key={j}>{f}</li>)}
                {p.noFeatures.map((f, j) => <li key={`no-${j}`} className="no">{f}</li>)}
              </ul>
              <Link to="/register" className="price-btn">{p.price === '0' ? 'Get Started Free' : `Choose ${p.tier}`}</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PricingPage;
