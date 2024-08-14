'use client'

import { useFormState } from 'react-dom'
import { Form } from '../global/form'
import { signUp, SignUpActionState } from '@/src/lib/actions'

export default function SingUpForm() {
  const initialState: SignUpActionState = { message: null, errors: {} }
  const [state, formAction] = useFormState(signUp, initialState)

  return (
    <Form.Root action={formAction} id="signUpForm">
      <Form.InputArea>
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="font-medium text-primaryDR">
            Nome de usuário
          </label>
          <input
            type="text"
            name="username"
            id="username"
            aria-describedby="usernameError"
            placeholder="Insira o nome de usuário"
            className="rounded-lg border border-primaryDR px-2 py-1 text-sm placeholder:text-primaryD"
          />
          <div id="usernameError" aria-live="polite">
            {state.errors?.username &&
              state.errors.username.map((error) => (
                <p className="text-sm font-medium text-alertRed" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="font-medium text-primaryDR">
            Senha
          </label>
          <input
            type="password"
            name="password"
            id="password"
            aria-describedby="passwordError"
            placeholder="Insira sua senha"
            className="rounded-lg border border-primaryDR px-2 py-1 text-sm placeholder:text-primaryD"
          />
          <div id="passwordError" aria-live="polite">
            {state.errors?.password &&
              state.errors.password.map((error) => (
                <p className="text-sm font-medium text-alertRed" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </Form.InputArea>

      {state.message && (
        <p
          className="text-center text-sm font-medium text-alertRed"
          key={state.message}
        >
          {state.message}
        </p>
      )}

      <Form.Buttons cancelHref="/"></Form.Buttons>
    </Form.Root>
  )
}
