import React from 'react';
import { useRouter } from 'next/router';

export default function PrivacyPolicy() {
  const router = useRouter();
  return (
    <>
      <div className="privacy-page">
        <div className="privacy-container">
          {/* Back Button */}
          <button className="back-button" onClick={() => router.back()}>
            ← Back
          </button>

          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-date">Effective Date: May 6, 2025</p>

          {/* Table of Contents */}
          <nav className="privacy-toc">
            <ul>
              <li><a href="#information-we-collect">Information We Collect</a></li>
              <li><a href="#how-we-use-information">How We Use Information</a></li>
              <li><a href="#sharing-information">Sharing of Information</a></li>
              <li><a href="#cookies-tracking">Cookies & Tracking Technologies</a></li>
              <li><a href="#data-security">Data Security</a></li>
              <li><a href="#privacy-choices">Your Privacy Choices</a></li>
              <li><a href="#children-privacy">Children's Privacy</a></li>
              <li><a href="#changes-policy">Changes to This Policy</a></li>
              <li><a href="#contact-us">Contact Us</a></li>
            </ul>
          </nav>

          {/* Sections */}
          <section id="information-we-collect">
            <h2>Information We Collect</h2>
            <p>
              We collect information to provide, improve, and protect our services. The categories include:
            </p>
            <ul>
              <li><strong>Personal Data:</strong> Information you provide such as name, email, and account credentials.</li>
              <li><strong>Usage Data:</strong> Pages visited, features accessed, and actions taken within the app.</li>
              <li><strong>Device & Technical Data:</strong> Browser type, operating system, IP address, and device identifiers.</li>
              <li><strong>Support & Communications:</strong> Customer service interactions, feedback, and survey responses.</li>
            </ul>
          </section>

          <section id="how-we-use-information">
            <h2>How We Use Information</h2>
            <p>
              We use collected data to:
            </p>
            <ul>
              <li>Provide, maintain, and personalize our services to you.</li>
              <li>Analyze usage patterns to enhance and popularize features.</li>
              <li>Communicate promotions, updates, and important notices.</li>
              <li>Detect, prevent, and address technical issues or abuse.</li>
            </ul>
          </section>

          <section id="sharing-information">
            <h2>Sharing of Information</h2>
            <p>
              We do not sell your personal data. We may share information in the following circumstances:
            </p>
            <ul>
              <li><strong>Service Providers:</strong> Vendors who support our app (e.g., hosting, analytics).</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect rights.</li>
              <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales.</li>
            </ul>
          </section>

          <section id="cookies-tracking">
            <h2>Cookies & Tracking Technologies</h2>
            <p>
              We and our partners use cookies, web beacons, and similar technologies to:
            </p>
            <ul>
              <li>Remember preferences and settings.</li>
              <li>Understand site usage and performance.</li>
              <li>Deliver personalized content and advertising.</li>
            </ul>
            <p>
              You can manage cookies through your browser settings or opt out via our cookie banner.
            </p>
          </section>

          <section id="data-security">
            <h2>Data Security</h2>
            <p>
              We implement administrative, technical, and physical safeguards to protect your data. However, no system can be 100% secure; we cannot guarantee absolute security.
            </p>
          </section>

          <section id="privacy-choices">
            <h2>Your Privacy Choices</h2>
            <p>
              You have the right to access, correct, or delete your personal information. To exercise these rights, contact us at the details below.
            </p>
          </section>

          <section id="children-privacy">
            <h2>Children's Privacy</h2>
            <p>
              Our services are not intended for children under 13. We do not knowingly collect personal data from children under 13.
            </p>
          </section>

          <section id="changes-policy">
            <h2>Changes to This Policy</h2>
            <p>
              We may update this policy periodically. We will notify you of significant changes via email or prominent notice on the site.
            </p>
          </section>

          <section id="contact-us">
            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please email us at <a href="mailto:privacy@yourdomain.com">privacy@yourdomain.com</a>.
            </p>
          </section>
        </div>
      </div>

      <style jsx global>{`
        .privacy-page {
          background: #f9fafb;
          min-height: 100vh;
          padding: 3rem 1rem;
        }
        .privacy-container {
          max-width: 800px;
          margin: 0 auto;
          background: #ffffff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          padding: 2rem;
        }
        .back-button {
          background: transparent;
          border: none;
          color: #2563eb;
          font-size: 1rem;
          margin-bottom: 1.5rem;
          cursor: pointer;
        }
        .back-button:hover {
          text-decoration: underline;
        }
        .privacy-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #111827;
          margin-bottom: 1rem;
        }
        .privacy-date {
          color: #6b7280;
          margin-bottom: 2rem;
        }
        .privacy-toc ul {
          list-style-type: decimal;
          margin-left: 1rem;
          color: #2563eb;
        }
        .privacy-toc a {
          text-decoration: none;
          color: #2563eb;
        }
        .privacy-toc a:hover {
          text-decoration: underline;
        }
        section {
          margin-bottom: 2rem;
        }
        section h2 {
          font-size: 1.75rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }
        section p,
        section ul {
          color: #4b5563;
          line-height: 1.6;
        }
        section ul li {
          margin-left: 1rem;
          margin-bottom: 0.5rem;
        }
        a {
          color: #2563eb;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}
