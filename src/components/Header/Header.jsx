import { useEffect, useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo1.png";
import "./Header.css";

const navLinks = [
  { label: "الرئيسية", to: "/", section: "home" },
  { label: "المنتجات", to: "/products", section: "products" },
  { label: "موقعنا", to: "/#location", section: "location" },
  { label: "تواصل معنا", to: "/#contact", section: "contact" },
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.section))
      .filter(Boolean);

    const currentHash = location.hash.replace(/^#/, "");
    window.requestAnimationFrame(() => {
      if (location.pathname.startsWith("/products")) {
        setActiveSection("products");
      } else if (
        currentHash &&
        navLinks.some((link) => link.section === currentHash)
      ) {
        setActiveSection(currentHash);
      } else if (location.pathname === "/") {
        setActiveSection("home");
      }
    });

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [location]);

  // If navigation includes a hash (e.g. /#contact), scroll to that section after route change
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace(/^#/, "");
    // small delay to allow DOM to render
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
    return () => clearTimeout(t);
  }, [location]);

  // When navigating to the homepage path, ensure the hero section is visible
  useEffect(() => {
    if (location.pathname !== "/") return;
    const t = setTimeout(() => {
      const el = document.getElementById("home");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }, 60);
    return () => clearTimeout(t);
  }, [location.pathname]);

  // Ensure we scroll to top when navigating to products page
  useEffect(() => {
    if (!location.pathname) return;
    if (location.pathname.startsWith("/products")) {
      // small delay to allow the products page to render
      const t = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 60);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchValue.trim();

    if (!query) return;

    navigate(`/products?search=${encodeURIComponent(query)}`);
    setSearchOpen(false);
    setMenuOpen(false);
    return;

    /*
    if (searchValue.trim()) {
      console.log('بحث عن:', searchValue)
      // TODO: navigate('/products?search=' + searchValue)
    }
    */
  };

  return (
    <header className="header">
      <div className="header__inner">
        {/* ── Logo ── */}
        <Link to="/" className="header__logo-link" aria-label="الرئيسية">
          <img src={logo} alt="شعار أوتو ياسين" className="header__logo" />
        </Link>

        {/* ── Search bar (desktop) ── */}
        <form className="header__search" onSubmit={handleSearch} role="search">
          <input
            type="search"
            placeholder="ابحث عن قطعة الغيار..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            aria-label="ابحث عن قطعة الغيار"
          />
          <button type="submit" className="header__search-btn" aria-label="بحث">
            <Search size={18} strokeWidth={2.5} />
          </button>
        </form>

        {/* ── Desktop nav ── */}
        <nav className="header__nav" aria-label="التنقل الرئيسي">
          <ul className="header__nav-list">
            {navLinks.map((link) => (
              <li key={link.section}>
                <Link
                  to={link.to}
                  className={`header__nav-link ${activeSection === link.section ? "is-active" : ""}`}
                  aria-current={
                    activeSection === link.section ? "true" : undefined
                  }
                  onClick={(e) => {
                    // If clicking the homepage link while already on the homepage, scroll to hero
                    if (link.to === "/" && location.pathname === "/") {
                      e.preventDefault();
                      const el = document.getElementById("home");
                      if (el)
                        el.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      else window.scrollTo({ top: 0, behavior: "smooth" });
                      return;
                    }

                    // Smooth-scroll when clicking an anchor while on the homepage
                    if (link.to.startsWith("/#") && location.pathname === "/") {
                      e.preventDefault();
                      setMenuOpen(false);
                      const id = link.section;
                      const el = document.getElementById(id);
                      if (el)
                        el.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      window.history.replaceState(null, "", link.to);
                    }
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Mobile actions ── */}
        <div className="header__mobile-actions">
          <button
            className="header__icon-btn"
            type="button"
            onClick={() => {
              setSearchOpen(!searchOpen);
              setMenuOpen(false);
            }}
            aria-label="بحث"
            aria-expanded={searchOpen}
            aria-controls="mobile-search"
          >
            <Search size={20} />
          </button>
          <button
            className={`header__hamburger ${menuOpen ? "is-open" : ""}`}
            type="button"
            onClick={() => {
              setMenuOpen(!menuOpen);
              setSearchOpen(false);
            }}
            aria-label="القائمة"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile search (slide down) ── */}
      <div
        id="mobile-search"
        className={`header__mobile-search ${searchOpen ? "is-visible" : ""}`}
      >
        <form onSubmit={handleSearch} role="search">
          <input
            type="search"
            placeholder="ابحث عن قطعة الغيار..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="submit" aria-label="بحث">
            <Search size={17} />
          </button>
        </form>
      </div>

      {/* ── Mobile menu ── */}
      <nav
        id="mobile-menu"
        className={`header__mobile-menu ${menuOpen ? "is-open" : ""}`}
        aria-label="القائمة المتنقلة"
      >
        <ul>
          {navLinks.map((link) => (
            <li key={link.section}>
              <Link
                to={link.to}
                className={`header__mobile-link ${activeSection === link.section ? "is-active" : ""}`}
                onClick={(e) => {
                  if (link.to.startsWith("/#") && location.pathname === "/") {
                    e.preventDefault();
                    setMenuOpen(false);
                    const id = link.section;
                    const el = document.getElementById(id);
                    if (el)
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    window.history.replaceState(null, "", link.to);
                  } else {
                    setMenuOpen(false);
                  }
                }}
                aria-current={
                  activeSection === link.section ? "true" : undefined
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
