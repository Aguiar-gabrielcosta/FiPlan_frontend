import { Loader2, SendHorizonal, X } from 'lucide-react'
import LinkButton from '../LinkButton'

interface FormButtonProps {
  pending: boolean
}

export default function FormButtons({ pending }: FormButtonProps) {
  return (
    <div className="flex justify-end gap-2">
      <LinkButton
        href={'/resumo/planejamento'}
        title="Clique para cancelar e retornar aos planejamentos"
        variant="dark"
      >
        <X size={20} />
        Cancelar
      </LinkButton>
      <button
        type="submit"
        className="flex items-center gap-2 rounded-lg bg-primary px-2 py-1 text-neutralWhite"
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
