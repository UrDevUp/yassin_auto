import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import { categories, products } from "../data/mockProducts";
import "./ProductDetails.css";

const WHATSAPP = "212661686177";

function createWhatsAppLink(product) {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const imageUrl = product.image ? `${origin}${product.image}` : "";
  const text = [`سلام واش كاينة عندك هاد القطعة؟`, product.name, imageUrl]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

function WhatsAppIcon({ size = 20 }) {
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

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((item) => String(item.id) === id);

  if (!product) {
    return (
      <section className="product-details">
        <div className="container product-details__inner">
          <p className="product-details__not-found">
            عذرًا، هذا المنتج غير موجود.
          </p>
          <Link to="/products" className="product-details__back">
            <ArrowLeft size={18} /> العودة إلى المنتجات
          </Link>
        </div>
      </section>
    );
  }

  const categoryName =
    categories.find((category) => category.id === product.category)?.name || "";

  return (
    <section className="product-details">
      <div className="container product-details__inner">
        <Link to="/products" className="product-details__back">
          <ArrowLeft size={18} /> العودة إلى المنتجات
        </Link>

        <div className="product-details__grid">
          <div className="product-details__image">
            {product.image ? (
              <img src={product.image} alt={product.name} loading="lazy" />
            ) : (
              <div className="product-details__placeholder">
                <ImageIcon size={48} strokeWidth={1.5} aria-hidden="true" />
                <span>لا توجد صورة متاحة</span>
              </div>
            )}
          </div>

          <div className="product-details__content">
            <p className="product-details__badge">{categoryName}</p>
            <h1 className="product-details__title">{product.name}</h1>
            <p className="product-details__price">{product.price} د.م.</p>
            <p className="product-details__description">
              {product.description}
            </p>

            <div className="product-details__actions">
              <a
                href={createWhatsAppLink(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="product-details__whatsapp-btn"
              >
                <WhatsAppIcon size={20} />
                تواصل عبر واتساب
              </a>
            </div>

            <div className="product-details__info">
              <div>
                <span>رقم المنتج</span>
                <strong>{product.id}</strong>
              </div>
              <div>
                <span>الفئة</span>
                <strong>{categoryName}</strong>
              </div>
              <div>
                <span>الحالة</span>
                <strong>متوفر</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
