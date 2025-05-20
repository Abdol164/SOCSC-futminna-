interface SubviewHeaderProps {
  title: string
  description?: string
}

export function SubviewHeader({ title, description }: SubviewHeaderProps) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      {description && <p className="text-xs text-gray-500">{description}</p>}
    </div>
  )
}
