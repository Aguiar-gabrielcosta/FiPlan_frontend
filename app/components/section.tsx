export default function Section({
  title,
  children,
}: {
  title: string
  children: JSX.Element
}) {
  return (
    <section className="flex flex-col gap-4 rounded-lg bg-neutralWhite p-2 drop-shadow-md">
      <h3 className="text-xl font-bold text-primaryD">{title}</h3>
      <div>{children}</div>
    </section>
  )
}
