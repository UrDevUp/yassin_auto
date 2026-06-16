import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryFilters from "../components/CategoryFilters/CategoryFilters";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import ProductCard from "../components/ProductCard/ProductCard";
import { categories, products } from "../data/mockProducts";
import "./Products.css";

const DISPLAY_LIMIT = 3;

export default function Products() {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("all");
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

  const visibleProducts = filtered.slice(0, DISPLAY_LIMIT);

  return (
    <section className="products-page">
      <div className="container">
        <CategoryFilters
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        <SectionHeader title="القطع الموجودة" actionLabel={null} />

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
