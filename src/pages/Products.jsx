import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryFilters from "../components/CategoryFilters/CategoryFilters";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import ProductCard from "../components/ProductCard/ProductCard";
import { categories, products } from "../data/mockProducts";
import "./Products.css";

const PAGE_SIZE = 6;
const LOAD_MORE_STEP = 3;

export default function Products() {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const searchQuery = searchParams.get("search")?.trim().toLowerCase() || "";

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;

      if (!matchesCategory) return false;
      if (!searchQuery) return true;

      const categoryName =
        categories.find((cat) => cat.id === product.category)?.name || "";
      const searchableText = [
        product.name,
        product.description,
        product.category,
        categoryName,
        String(product.price),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(searchQuery);
    });
  }, [activeCategory, searchQuery]);

  // Réinitialise la pagination quand la catégorie change
  useEffect(() => {
    window.requestAnimationFrame(() => {
      setVisibleCount(PAGE_SIZE);
    });
  }, [activeCategory, searchQuery]);

  const visibleProducts = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <section className="products-page">
      <div className="container">
        <CategoryFilters
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        <SectionHeader
          title="القطع الموجودة"
          actionLabel={hasMore ? "عرض المزيد" : null}
          onAction={() => setVisibleCount((c) => c + LOAD_MORE_STEP)}
        />

        {visibleProducts.length > 0 ? (
          <div className="products-page__grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="products-page__empty">
            لا توجد قطع في هذه الفئة حالياً.
          </p>
        )}
      </div>
    </section>
  );
}
