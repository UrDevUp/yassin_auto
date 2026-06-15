import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, ChevronDown } from "lucide-react";
import SectionHeader from "../SectionHeader/SectionHeader";
import ProductCard from "../ProductCard/ProductCard";
import LocationSection from "../LocationSection/LocationSection";
import ContactSection from "../ContactSection/ContactSection";
import { products } from "../../data/mockProducts";
import "./Hero.css";

const PHONE = "0661686177";
const PHONE_DISPLAY = "06 61 68 61 77";
const WHATSAPP = "212661686177";

function WhatsAppIcon({ size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 448 512"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M380.9 97.1C339 55.1 283.2 32 223.9 32 101 32 1.1 131.9 1.1 254.8c0 39.3 10.3 77.7 29.9 111.5L0 480l116.3-30.5c32.7 17.8 69.5 27.2 107.6 27.2h.1c122.8 0 222.7-99.9 222.7-222.8 0-59.4-23.1-115.2-65.8-156.8zM224 439.2c-33.8 0-66.9-9.1-95.8-26.2l-6.9-4.1-69 18.1 18.4-67.2-4.5-6.9c-18.9-30-28.9-64.7-28.9-100.5 0-103 83.8-186.8 186.8-186.8 49.9 0 96.8 19.4 132.1 54.7 35.3 35.3 54.7 82.2 54.7 132.1-.1 103-83.9 186.8-186.9 186.8zm101.4-138.4c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.5-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.5-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
      />
    </svg>
  );
}

export default function Hero() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const featuredProducts = products.slice(0, 8);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleWhatsApp = () => {
    const msg = encodeURIComponent("السلام عليكم، أريد الاستفسار عن قطعة غيار");
    window.open(
      `https://wa.me/${WHATSAPP}?text=${msg}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <>
      <section
        id="home"
        className={`hero ${loaded ? "hero--loaded" : ""}`}
        aria-label="أوطو ياسين  - الصفحة الرئيسية"
      >
        <div className="hero__overlay" aria-hidden="true" />
        <div className="hero__glow-br" aria-hidden="true" />
        <div className="hero__glow-tl" aria-hidden="true" />

        <div className="hero__content">
          <h1 className="hero__headline">
            كل ما تحتاجه لسيارتك كاين عند
            <span className="hero__headline-brand"> أوطو ياسين</span>
          </h1>

          <p className="hero__subtitle">
            قطع غيار بجودة عالية، أثمنة مناسبة، وخدمة سريعة.
          </p>

          <div className="hero__cta-group">
            <div className="hero__cta-label">
              <span>تواصل معنا الآن</span>
              <ChevronDown size={18} />
            </div>

            <a
              href={`tel:${PHONE}`}
              className="hero__phone-btn"
              aria-label={`اتصل بنا على ${PHONE_DISPLAY}`}
            >
              <span className="hero__phone-icon">
                <Phone size={18} strokeWidth={2.5} />
              </span>
              <span className="hero__phone-number">{PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>

        {/* Floating WhatsApp button */}
        <button
          className="whatsapp-float"
          onClick={handleWhatsApp}
          aria-label="تواصل عبر واتساب"
          type="button"
        >
          <WhatsAppIcon size={30} />
        </button>
      </section>

      <section
        className="home-section home-section--products-preview"
        aria-label="المنتجات"
      >
        <div className="home-section__inner container">
          <SectionHeader
            title="المنتجات"
            actionLabel="عرض المزيد"
            onAction={() => navigate("/products")}
          />

          <div className="home-preview-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <LocationSection />
      <ContactSection />
    </>
  );
}
