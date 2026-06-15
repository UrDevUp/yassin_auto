import { Link } from 'react-router-dom'
import { Image as ImageIcon } from 'lucide-react'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const { id, name, price, description, image } = product

  return (
    <Link to={`/products/${id}`} className="product-card">
      <div className="product-card__image">
        {image ? (
          <img src={image} alt={name} loading="lazy" />
        ) : (
          <ImageIcon size={40} strokeWidth={1.5} className="product-card__placeholder" aria-hidden="true" />
        )}
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__price">
          <span dir="ltr">{price}</span> د.م.
        </p>
        <p className="product-card__description">{description}</p>
      </div>
    </Link>
  )
}