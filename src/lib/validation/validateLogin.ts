import { LoginCredentialsSchema } from './schema'

export function validateLogin(formData: FormData) {
  const parsedData = LoginCredentialsSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  })

  return parsedData
}
