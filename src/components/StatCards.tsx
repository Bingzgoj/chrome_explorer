interface StatCardItem {
  tone: 'success' | 'accent-emphasis' | 'attention'
  label: string
  value: string | number
}

interface StatCardsProps {
  items: StatCardItem[]
}

export const StatCards = ({ items }: StatCardsProps) => {
  return (
    <section className="stats-grid mb-4" aria-label="Quick stats">
      {items.map((item) => (
        <div key={item.label} className="panel stat-card">
          <span className={`Label Label--${item.tone}`}>{item.label}</span>
          <div className="stat-value">{item.value}</div>
        </div>
      ))}
    </section>
  )
}
