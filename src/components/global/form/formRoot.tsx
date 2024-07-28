import { ComponentProps, ReactNode } from 'react'

interface FormRootProps extends ComponentProps<'form'> {
  action: (payload: FormData) => void
  id: string
  children: ReactNode
}

export default function FormRoot({ children, action, id }: FormRootProps) {
  return (
    <form action={action} id={id}>
      <div className="flex w-[452px] flex-col justify-between gap-8 rounded-lg bg-neutralWhite p-4 drop-shadow-md">
        {children}
      </div>
    </form>
  )
}
