import { CredentialsSchema } from './schema'

export function validateCredentials(formData: FormData) {
  const parsedData = CredentialsSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  })

  return parsedData
}
