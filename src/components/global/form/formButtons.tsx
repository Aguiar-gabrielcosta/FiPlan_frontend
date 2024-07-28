import { SendHorizonal, X } from 'lucide-react'
import Link from 'next/link'
import { SyncLoader } from 'react-spinners'

interface FormButtonProps {
  pending: boolean
}

export default function FormButtons({ pending }: FormButtonProps) {
  return (
    <div className="flex justify-end gap-2">
      <Link
        role="button"
        className="flex items-center gap-2 rounded-lg bg-primaryDR px-2 py-1 text-neutralWhite"
        href={'/resumo/planejamento'}
      >
        <X size={20} />
        Cancelar
      </Link>
      <button
        type="submit"
        className="flex items-center gap-2 rounded-lg bg-primary px-2 py-1 text-neutralWhite"
        disabled={pending}
      >
        {pending ? <SyncLoader size={20} /> : <SendHorizonal size={20} />}
        Enviar
      </button>
    </div>
  )
}