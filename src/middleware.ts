import { NextRequest } from 'next/server'
import { checkSession } from './lib/utils/sessionUtils'

export async function middleware(request: NextRequest) {
  return await checkSession(request)
}
