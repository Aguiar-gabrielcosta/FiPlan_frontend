import { JWTPayload, jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function encryptSession(payload: JWTPayload | undefined) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(secret)
}

export async function decryptSession(session: string) {
  const { payload } = await jwtVerify(session, secret, {
    algorithms: ['HS256'],
  })

  return payload
}

export async function getSessionData() {
  const session = cookies().get('session')?.value

  if (!session) {
    return null
  }

  return await decryptSession(session)
}

export async function checkSession(req: NextRequest) {
  const session = req.cookies.get('session')?.value
  const onApp = req.nextUrl.pathname.startsWith('/resumo')
  const onHome = req.nextUrl.pathname === '/'
  const redirectUrl = req.nextUrl.clone()

  // Se não houver sessão
  if (!session) {
    redirectUrl.pathname = '/login'

    // No caso de estar tentando acessar o App, redireciona para o login
    if (onApp) {
      return NextResponse.redirect(redirectUrl)
    }

    // No caso de estar na home ou na página de login, apenas mantém
    return NextResponse.next()
  }

  // Caso acessar a home já logado, redirecionar ao app
  if (onHome) {
    redirectUrl.pathname = '/resumo'
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export function endSession() {
  // Finaliza a sessão
  cookies().delete('session')
}
