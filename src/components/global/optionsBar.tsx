export default function SelectorBar({
  title,
  children,
}: {
  title: string
  children: JSX.Element
}) {
  return (
    <section
      className={`col-span-2 flex items-center justify-between gap-4 rounded-lg bg-neutralWhite p-2 drop-shadow-md`}
    >
      <h3 className="text-xl font-bold text-primaryD">{title}</h3>
      <div>{children}</div>
    </section>
  )
}
