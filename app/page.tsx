import { Italiana } from 'next/font/google'
import Image from 'next/image'
import NavLink from './components/nav-link'

const italian = Italiana({ subsets: ['latin'], weight: ['400'] })

export default function Home() {
  return (
    <div className="flex min-h-screen w-[356px] flex-col justify-between">
      <header
        className={`flex w-full items-center justify-center rounded-lg bg-primaryDR ${italian.className} gap-2 py-8`}
      >
        <Image src={'/logo-64.svg'} alt="FiPlan" width={64} height={64} />
        <h1 className="text-[64px] leading-[75px] text-primaryLR">FiPlan</h1>
      </header>
      <section className="flex flex-grow flex-col justify-center">
        <h2 className="text-2xl font-medium">
          Seja bem-vindo ao <span className="text-primary">FiPlan</span>, seu
          planeje o futuro e controle o presente.
        </h2>
        <nav className="flex justify-center gap-2">
          <NavLink>Acessar</NavLink>
          <NavLink>Cadastrar</NavLink>
        </nav>
      </section>
    </div>
  )
}
