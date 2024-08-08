import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ComponentProps } from 'react'

interface PaginationSideButtonsProps extends ComponentProps<'a'> {
  href: string
  title: string
  arrowSide: 'right' | 'left'
  isActive: boolean
}

export default function PaginationSideButtons({
  href,
  title,
  arrowSide,
  isActive,
}: PaginationSideButtonsProps) {
  const setSide = (arrowSide: string) => {
    if (arrowSide === 'right') {
      return <ArrowRight />
    }

    return <ArrowLeft />
  }

  return (
    <>
      {isActive ? (
        <div className="flex h-9 w-9 cursor-default items-center justify-center rounded-lg border border-primaryD bg-neutralWhite p-1 text-primaryDR opacity-20 transition-all">
          {setSide(arrowSide)}
        </div>
      ) : (
        <Link
          href={href}
          title={title}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-primaryD bg-neutralWhite p-1 text-primary transition-all hover:bg-primaryLR"
        >
          {setSide(arrowSide)}
        </Link>
      )}
    </>
  )
}
