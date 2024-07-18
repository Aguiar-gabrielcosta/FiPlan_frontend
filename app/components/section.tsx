export default function Section({
  title,
  children,
  width,
}: {
  title: string
  children: JSX.Element
  width: 'full' | 'fit'
}) {
  return (
    <section
      className={`flex flex-col gap-4 rounded-lg bg-neutralWhite p-2 drop-shadow-md ${width === 'fit' ? 'w-fit' : ''}`}
    >
      <h3 className="text-xl font-bold text-primaryD">{title}</h3>
      <div className="flex-grow">{children}</div>
    </section>
  )
}
