'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import PaginationSideButtons from './paginationSideButtons'

export default function Pagination({
  numberOfPages,
}: {
  numberOfPages: number
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const setPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    return `${pathname}?${params.toString()}`
  }

  const createPagesArray = () => {
    const array = []
    for (let i = 1; i <= numberOfPages; i++) {
      array.push(i)
    }

    return array
  }

  return (
    <>
      <div className="flex items-center justify-center gap-4">
        <PaginationSideButtons
          href={setPageURL(currentPage - 1)}
          arrowSide="left"
          title="Clique para voltar 1 página."
          isActive={currentPage <= 1}
        />

        <div className="flex overflow-hidden rounded-lg border border-primaryD">
          {createPagesArray().map((page) => {
            return (
              <Link
                key={page}
                href={setPageURL(page)}
                className={`flex h-9 w-9 items-center justify-center border-r border-primaryD font-bold transition-all last:border-none ${currentPage === page ? 'cursor-default bg-primary text-neutralWhite' : 'bg-neutralWhite text-primary hover:bg-primaryLR'}`}
              >
                {page}
              </Link>
            )
          })}
        </div>

        <PaginationSideButtons
          href={setPageURL(currentPage + 1)}
          arrowSide="right"
          title="Clique para avançar 1 página."
          isActive={currentPage >= numberOfPages}
        />
      </div>
    </>
  )
}
