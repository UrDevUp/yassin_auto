import { Link } from "react-router-dom";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import logo from "../../assets/logo1.png";
import "./Footer.css";

const WHATSAPP = "212661686177";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__col footer__brand">
          <Link to="/" className="footer__logo-link" aria-label="الرئيسية">
            <img src={logo} alt="شعار أوتو ياسين" className="footer__logo" />
          </Link>
          <p>
            قطع غيار سيارات أصلية وبديلة بجودة عالية ، مع خدمة
            سريعة وموثوقة.
          </p>
        </div>


      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {year} أوطو ياسين— جميع الحقوق محفوظة</p>
          <a
            href="https://www.urdevup.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__credit-link"
          >
            Created by UrDevUp
          </a>
        </div>
      </div>
    </footer>
  );
}
