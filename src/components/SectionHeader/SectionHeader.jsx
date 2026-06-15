import { ArrowUpRight } from 'lucide-react'
import './SectionHeader.css'

export default function SectionHeader({ title, actionLabel, onAction }) {
  return (
    <div className="section-header">
      <h2 className="section-header__title">{title}</h2>
      {actionLabel && (
        <button className="section-header__action" onClick={onAction} type="button">
          <span>{actionLabel}</span>
          <ArrowUpRight size={18} strokeWidth={2.5} />
        </button>
      )}
    </div>
  )
}