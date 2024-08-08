import Link from 'next/link'
import { ComponentProps } from 'react'

interface ButtonLink extends ComponentProps<'a'> {
  children: React.ReactNode
  href: string
  title: string
  variant: 'primary' | 'dark' | 'light'
  font?: 'normal' | 'small'
}

export default function LinkButton({
  href,
  title,
  children,
  variant,
  font = 'normal',
  ...props
}: ButtonLink) {
  const buttonTheme = {
    primary: 'bg-primary text-neutralWhite hover:opacity-90 transition-all',
    dark: 'bg-primaryDR text-neutralWhite hover:opacity-90 transition-all',
    light: 'bg-primaryLR text-primaryDR hover:opacity-90 transition-all',
  }

  const buttonFontSize = {
    normal: '',
    small: 'text-sm',
  }

  return (
    <Link
      href={href}
      key={props.key}
      title={title}
      className={`flex items-center gap-2 rounded-lg px-2 py-1 ${buttonTheme[variant]} ${buttonFontSize[font]}`}
    >
      {children}
    </Link>
  )
}
