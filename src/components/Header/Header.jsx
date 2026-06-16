import { useEffect, useState } from "react";
import { Search, X, Menu } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo1.png";
import "./Header.css";

const navLinks = [
  { label: "الرئيسية",   to: "/",         section: "home" },
  { label: "المنتجات",   to: "/products", section: "products" },
  { label: "موقعنا",     to: "/#location", section: "location" },
  { label: "تواصل معنا", to: "/#contact",  section: "contact" },
];

export default function Header() {
  const navigate   = useNavigate();
  const location   = useLocation();

  const [searchValue,  setSearchValue]  = useState("");
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [searchOpen,   setSearchOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  /* ── fermer menu/search au changement de route ── */
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.hash]);

  /* ── bloquer le scroll body quand le menu overlay est ouvert ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* ── active section via IntersectionObserver ── */
  useEffect(() => {
    if (location.pathname.startsWith("/products")) {
      setActiveSection("products");
      return;
    }
    const currentHash = location.hash.replace(/^#/, "");
    if (currentHash && navLinks.some((l) => l.section === currentHash)) {
      setActiveSection(currentHash);
    } else if (location.pathname === "/") {
      setActiveSection("home");
    }

    const sections = navLinks
      .map((l) => document.getElementById(l.section))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: [0.1, 0.25, 0.5, 0.75] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [location]);

  /* ── scroll vers hash ── */
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace(/^#/, "");
    const t = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
    return () => clearTimeout(t);
  }, [location]);

  /* ── recherche multilingue ── */
  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchValue.trim();
    if (!query) return;
    navigate(`/products?search=${encodeURIComponent(query)}`);
    setSearchOpen(false);
    setMenuOpen(false);
    setSearchValue("");
  };

  const scrollToSection = (e, link) => {
    if (link.to === "/" && location.pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("home");
      el ? el.scrollIntoView({ behavior: "smooth" }) : window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (link.to.startsWith("/#") && location.pathname === "/") {
      e.preventDefault();
      setMenuOpen(false);
      document.getElementById(link.section)?.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", link.to);
    }
  };

  return (
    <>
      <header className="header">
        <div className="header__inner">

          {/* Logo */}
          <Link to="/" className="header__logo-link" aria-label="الرئيسية">
            <img src={logo} alt="أوتو ياسين" className="header__logo" />
          </Link>

          {/* Search desktop */}
          <form className="header__search" onSubmit={handleSearch} role="search">
            <input
              type="search"
              placeholder="ابحث بالعربية، الدارجة أو الفرنسية..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              aria-label="بحث"
            />
            <button type="submit" className="header__search-btn" aria-label="بحث">
              <Search size={18} strokeWidth={2.5} />
            </button>
          </form>

          {/* Nav desktop */}
          <nav className="header__nav" aria-label="التنقل الرئيسي">
            <ul className="header__nav-list">
              {navLinks.map((link) => (
                <li key={link.section}>
                  <Link
                    to={link.to}
                    className={`header__nav-link ${activeSection === link.section ? "is-active" : ""}`}
                    onClick={(e) => scrollToSection(e, link)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile actions */}
          <div className="header__mobile-actions">
            <button
              className={`header__icon-btn ${searchOpen ? "is-open" : ""}`}
              type="button"
              onClick={() => { setSearchOpen(!searchOpen); setMenuOpen(false); }}
              aria-label="بحث"
            >
              {searchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
            <button
              className={`header__hamburger ${menuOpen ? "is-open" : ""}`}
              type="button"
              onClick={() => { setMenuOpen(!menuOpen); setSearchOpen(false); }}
              aria-label="القائمة"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>

        {/* Mobile search bar (slide down sous header) */}
        <div className={`header__mobile-search ${searchOpen ? "is-visible" : ""}`}>
          <form onSubmit={handleSearch} role="search">
            <input
              type="search"
              placeholder="ابحث بالعربية، الدارجة أو الفرنسية..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              autoFocus={searchOpen}
            />
            <button type="submit" aria-label="بحث">
              <Search size={17} />
            </button>
          </form>
        </div>
      </header>

      {/* ══ MENU OVERLAY — en dehors du <header> pour couvrir le hero ══ */}
      <div
        className={`nav-overlay ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        {/* Backdrop cliquable pour fermer */}
        <div
          className="nav-overlay__backdrop"
          onClick={() => setMenuOpen(false)}
        />

        {/* Panel du menu */}
        <nav className="nav-overlay__panel" aria-label="القائمة">

          {/* Bouton fermer */}
          <button
            className="nav-overlay__close"
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="إغلاق القائمة"
          >
            <X size={22} />
          </button>

          {/* Logo dans l'overlay */}
          <div className="nav-overlay__brand">
            <img src={logo} alt="أوتو ياسين" />
          </div>

          {/* Liens */}
          <ul className="nav-overlay__list">
            {navLinks.map((link, i) => (
              <li
                key={link.section}
                style={{ "--i": i }}
              >
                <Link
                  to={link.to}
                  className={`nav-overlay__link ${activeSection === link.section ? "is-active" : ""}`}
                  onClick={(e) => {
                    setMenuOpen(false);
                    scrollToSection(e, link);
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

        </nav>
      </div>
    </>
  );
}