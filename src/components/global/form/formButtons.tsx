import { Loader2, SendHorizonal, X } from 'lucide-react'
import LinkButton from '../LinkButton'
import { useFormStatus } from 'react-dom'

interface FormButtonProps {
  cancelHref: string
}

export default function FormButtons({ cancelHref }: FormButtonProps) {
  const { pending } = useFormStatus()

  return (
    <div className="flex justify-end gap-2">
      <LinkButton href={cancelHref} title="Clique para cancelar" variant="dark">
        <X size={20} />
        Cancelar
      </LinkButton>
      <button
        type="submit"
        className="flex items-center gap-2 rounded-lg bg-primary px-2 py-1 text-neutralWhite transition-all hover:opacity-90"
        title="Clique para enviar o formulário"
        disabled={pending}
      >
        {pending ? (
          <Loader2 className="animate-spin" />
        ) : (
          <SendHorizonal size={20} />
        )}
        Enviar
      </button>
    </div>
  )
}
