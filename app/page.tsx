import { Italiana } from 'next/font/google'
import Image from 'next/image'
import { ArrowRight, LogIn } from 'lucide-react'
import NavLink from './components/nav-link'

const italian = Italiana({ subsets: ['latin'], weight: ['400'] })

export default function Home() {
  return (
    <div className="flex min-h-screen justify-start gap-2 p-2">
      <div className="flex w-[356px] flex-col justify-between gap-8">
        <header
          className={`flex w-full items-center justify-center rounded-lg bg-primaryDR ${italian.className} gap-2 py-8`}
        >
          <Image src={'/logo-64.svg'} alt="FiPlan" width={64} height={64} />
          <h1 className="text-[64px] leading-[75px] text-primaryLR">FiPlan</h1>
        </header>
        <main className="flex flex-grow flex-col justify-center p-2">
          <h2 className="mb-8 text-center text-2xl font-medium">
            Seja bem-vindo ao <span className="text-primary">FiPlan</span>, seu
            planeje o futuro e controle o presente.
          </h2>
          <nav className="flex justify-center gap-1 p-2">
            <NavLink variant="default">
              <>
                Acessar
                <LogIn size={20} />
              </>
            </NavLink>
            <NavLink variant="light">
              <>
                Cadastrar
                <ArrowRight size={20} />
              </>
            </NavLink>
          </nav>
        </main>
      </div>
      <section className="flex flex-grow items-center justify-center">
        <Image
          src={'/hero-desktop.png'}
          width={644}
          height={454}
          alt="Aplicação FiPlan para desktops e smartphones"
        />
      </section>
    </div>
  )
}
