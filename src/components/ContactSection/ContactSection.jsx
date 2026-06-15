import { useState } from "react";
import "./ContactSection.css";

const PHONE = "0661686177";
const PHONE_DISPLAY = "06 61 68 61 77";
const WHATSAPP = "212661686177";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim()) return;
    const text = name.trim()
      ? `Nom: ${name}\nMessage: ${message}`
      : `Message: ${message}`;
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section
      id="contact"
      className="home-section home-section--contact"
      aria-label="تواصل معنا"
    >
      <div className="home-section__inner container">
        <h2 className="home-section__title">تواصل معنا</h2>
        <form
          className="contact-form"
          onSubmit={handleSubmit}
          aria-label="Envoyer un message via WhatsApp"
        >
          <label className="contact-form__label">
            الاسم (اختياري)
            <input
              className="contact-form__input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="اسمك"
            />
          </label>

          <label className="contact-form__label">
            رسالتك
            <textarea
              className="contact-form__textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="اكتب رسالتك هنا"
              required
            />
          </label>

          <button type="submit" className="contact-form__button">
            إرسال عبر واتساب
          </button>
        </form>
      </div>
    </section>
  );
}
