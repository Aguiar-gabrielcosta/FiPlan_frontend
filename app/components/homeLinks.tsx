import Link from 'next/link'

export default function NavLink({
  children,
  variant,
}: {
  children: string | JSX.Element
  variant: 'default' | 'light'
}) {
  return (
    <Link
      href={'/resumo'}
      className={`flex items-center gap-1 rounded-lg p-2 font-semibold leading-[22px] ${variant === 'default' ? 'bg-primary text-neutralWhite' : 'bg-primaryLR text-primaryDR'}`}
    >
      {children}
    </Link>
  )
}
