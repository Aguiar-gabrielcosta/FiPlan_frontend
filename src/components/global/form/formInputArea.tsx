import { ReactNode } from 'react'

interface FormInputAreaProps {
  children: ReactNode
}

export default function FormInputArea({ children }: FormInputAreaProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-bgL p-4">{children}</div>
  )
}
