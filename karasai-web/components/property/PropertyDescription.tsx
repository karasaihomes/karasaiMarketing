interface PropertyDescriptionProps {
  description: string
}

export default function PropertyDescription({ description }: PropertyDescriptionProps) {
  return (
    <div className="mb-6 rounded-lg bg-white p-6">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-neutral-dark">
        Property Description:
      </h3>
      <div className="whitespace-pre-line text-sm leading-relaxed text-neutral-dark/80">
        {description}
      </div>
    </div>
  )
}