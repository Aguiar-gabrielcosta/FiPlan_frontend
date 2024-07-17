import { Italiana } from "next/font/google"
import Image from "next/image"
import NavLink from "./components/nav-link"

const italian = Italiana({subsets: ["latin"], weight: ["400"]})

export default function Home() {
  return (
    <div className="w-[356px] min-h-screen flex flex-col justify-between">
      <header className={`bg-primaryDR rounded-lg w-full flex justify-center items-center ${italian.className} py-8 gap-2`}>
        <Image src={'/logo-64.svg'} alt="FiPlan" width={64} height={64} />
        <h1 className="text-primaryLR text-[64px] leading-[75px]">FiPlan</h1>
      </header>
      <section className="flex flex-col flex-grow justify-center">
        <h2 className="text-2xl font-medium">
          Seja bem-vindo ao <span className="text-primary">FiPlan</span>, seu planeje o futuro e controle o presente.  
        </h2>
        <nav className="flex justify-center gap-2">
          <NavLink>Acessar</NavLink>
          <NavLink>Cadastrar</NavLink>
        </nav>
      </section>
    </div>
  )
}
