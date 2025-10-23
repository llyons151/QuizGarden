import React from "react";
import "@/components/global/footer/footer.css";
import Link from 'next/link';

export default function Footer({ paymentRef }) {
  const handleScrollToPricing = () => {
    if (paymentRef?.current) {
      paymentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  return (
    <footer className="footer">
      <div className="footer-container">
        <nav className="footer-nav">

          <div className="footer_header left_section">
          <div className="title_footer_header">

                    <div className="green">Quiz</div>
                    <div className="black">Garden</div>
              </div>

            <div className="sub_text">
              Unlock your potential with dynamic quizzes—study smarter, succeed confidently.
            </div>
            <div className="social_media_icon_container">
              <img src="images/social_media/instagram.png" alt="Instagram" className="social_media_icon" />
              <img src="images/social_media/twitter.png" alt="Twitter" className="social_media_icon" />
              <img src="images/social_media/facebook.png" alt="Facebook" className="social_media_icon" />
            </div>
          </div>

          <div className="title_footer_header menu">
            Quick Links
            <div className="menu_list">
              <Link href="/privacy-policy" className="sub_text large">
                Privacy Policy
              </Link>
              <Link href="/" className="sub_text large">
                Home
              </Link>
              <div
                className="sub_text large"
                onClick={handleScrollToPricing}
                style={{ cursor: 'pointer' }}
              >
                Pricing
              </div>
            </div>
          </div>

          <div className="title_footer_header menu">
            Support
            <div className="menu_list">
              <div className="sub_text large">
                quizgarden@gmail.com
              </div>
            </div>
          </div>

          <div className="title_footer_header menu">
            Legal
            <div className="menu_list">
              <div className="sub_text large">
                © {new Date().getFullYear()} QuizGarden. All rights reserved.
              </div>
            </div>
          </div>

        </nav>
      </div>
    </footer>
  );
}
