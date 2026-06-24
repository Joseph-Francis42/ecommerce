import React from 'react';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Marcus Vance",
      role: "Marathon Runner",
      quote: "The Apex Velocity shoes are a revelation. The carbon stiffness is perfectly tempered by the foam. My recovery times have decreased significantly.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
    },
    {
      name: "Clara Reynolds",
      role: "Triathlete",
      quote: "The smartwatch tracking is extremely precise, even under heavy forest canopy. Titanium bezel has taken several hits on trail runs and is completely scratch-free.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
    },
    {
      name: "Darnell Carter",
      role: "Fitness Coach",
      quote: "APEX activewear matches anything from Lululemon or Tracksmith. Durable seams, moisture repellent, and an exceptionally clean aesthetic.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
    }
  ];

  return (
    <section className="section testimonials-section">
      <div className="container">
        
        <h2 className="section-title">Athlete Perspectives</h2>
        <div className="editorial-title-divider"></div>

        <div className="testimonials-grid">
          {reviews.map((rev, index) => (
            <div key={index} className="testimonial-card">
              <span className="quote-mark">&#8220;</span>
              
              <p className="testimonial-quote">{rev.quote}</p>
              
              <div className="testimonial-stars">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} size={12} className="star-icon-filled" />
                ))}
              </div>

              <div className="testimonial-profile">
                <img src={rev.avatar} alt={rev.name} className="testimonial-avatar" />
                <div className="testimonial-meta">
                  <h4 className="testimonial-name">{rev.name}</h4>
                  <p className="testimonial-role">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Embedded CSS for Testimonials */}
      <style>{`
        .testimonials-section {
          background-color: var(--bg-primary);
          border-bottom: 1px solid var(--border-color);
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
          margin-top: 2rem;
        }

        @media (max-width: 900px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        .testimonial-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          padding: 2.5rem;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-sm);
          position: relative;
        }

        .quote-mark {
          font-family: var(--font-heading);
          font-size: 4rem;
          line-height: 1;
          color: var(--accent-secondary);
          margin-bottom: -1rem;
          margin-top: -0.5rem;
          display: block;
        }

        .testimonial-quote {
          font-family: var(--font-body);
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-style: italic;
        }

        .testimonial-stars {
          display: flex;
          gap: 0.1rem;
          margin-bottom: 1.5rem;
        }

        .star-icon-filled {
          color: var(--accent-secondary);
          fill: var(--accent-secondary);
        }

        .testimonial-profile {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: auto;
        }

        .testimonial-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid var(--border-color);
        }

        .testimonial-name {
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .testimonial-role {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }
      `}</style>
    </section>
  );
};
