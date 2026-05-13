interface InfoStripItem {
  label: string
  value: string | number
}

interface InfoStripProps {
  items: InfoStripItem[]
}

export const InfoStrip = ({ items }: InfoStripProps) => {
  return (
    <nav className="UnderlineNav mb-4" aria-label="Explorer summary">
      <div className="UnderlineNav-body">
        {items.map((item, index) => (
          <span
            key={item.label}
            className={`UnderlineNav-item ${index === 0 ? 'selected' : ''}`}
            aria-current={index === 0 ? 'page' : undefined}
          >
            {item.label} <span className="Counter">{item.value}</span>
          </span>
        ))}
      </div>
    </nav>
  )
}
