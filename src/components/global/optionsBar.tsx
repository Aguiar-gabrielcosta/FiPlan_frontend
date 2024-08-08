export default function OptionsBar({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section
      className={`col-span-full flex items-center justify-between rounded-lg bg-neutralWhite p-2 drop-shadow-md`}
    >
      <h3 className="text-xl font-bold text-primaryD">{title}</h3>
      {children}
    </section>
  )
}
