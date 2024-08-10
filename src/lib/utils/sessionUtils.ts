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

  // Se não houver sessão, redireciona ao login
  if (!session) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/login'
    return onApp ? NextResponse.redirect(redirectUrl) : NextResponse.next()
  }

  const sessionData = await decryptSession(session) // Recupera os dados da sessão
  const expires = new Date(Date.now() + 8 * 1000 * 60 * 60) // Revona a druação de 8h da sessão

  // Ao carregar a resposta do servidor renova o cookie
  const res = NextResponse.next()
  res.cookies.set({
    name: 'session',
    value: await encryptSession(sessionData),
    httpOnly: true,
    expires,
  })

  return res
}

export async function endSession() {
  // Finaliza a sessão
  cookies().set('session', '', { expires: new Date(0) })
}
