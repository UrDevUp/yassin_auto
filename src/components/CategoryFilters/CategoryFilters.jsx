import './CategoryFilters.css'

export default function CategoryFilters({ categories, activeCategory, onSelect }) {
  return (
    <div className="category-filters">
      <div className="category-filters__scroll" role="tablist" aria-label="تصفية حسب الفئة">
        {categories.map((cat) => (
          <button
            key={cat.id}
            role="tab"
            aria-selected={activeCategory === cat.id}
            className={`category-filters__pill ${activeCategory === cat.id ? 'is-active' : ''}`}
            onClick={() => onSelect(cat.id)}
            type="button"
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  )
}