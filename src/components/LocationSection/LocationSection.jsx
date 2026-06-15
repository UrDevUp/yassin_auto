const MAP_EMBED_URL = "https://www.google.com/maps?q=33.9999313,-5.0564599&z=17&output=embed";
const MAP_LINK =
  "https://www.google.com/maps/place//@33.9999313,-5.0590348,17z/data=!4m6!1m5!3m4!2zMzPCsDU5JzU5LjgiTiA1wrAwMycyMy4zIlc!8m2!3d33.9999313!4d-5.0564599?hl=fr&entry=ttu";

export default function LocationSection() {
  return (
    <section
      id="location"
      className="home-section home-section--location"
      aria-label="موقعنا"
    >
      <div className="home-section__inner container">
        <h2 className="home-section__title">موقعنا</h2>
        <p className="home-section__subtitle">
          زورونا في مقرنا للحصول على أفضل قطع الغيار وخدمة مباشرة وسريعة.
        </p>

        <div className="home-section__map" aria-label="Google Maps">
          <iframe
            title="Auto Yassine location on Google Maps"
            src={MAP_EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a
            className="home-section__map-link"
            href={MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            فتح الموقع في Google Maps
          </a>
        </div>

        <div className="home-section__grid">
          <div className="home-section__card">
            <h3>العنوان</h3>
            <p>شارع الحسن الثاني، أمام السوق المركزي، مدينة الرباط، المغرب</p>
          </div>
          <div className="home-section__card">
            <h3>ساعات العمل</h3>
            <p>الاثنين - السبت: 09:00 - 19:00</p>
          </div>
        </div>
      </div>
    </section>
  );
}
