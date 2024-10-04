"use client"

import { useActionState } from "react"

import { authenticate } from "../actions"

export default function LoginForm() {

  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <>
      <form action={formAction}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Email" required/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="Password" required/>
        </div>

        <button disabled={isPending}>Sign in</button>
        <div>
          {errorMessage && (
            <p>{errorMessage}</p>
          )}
        </div>
      </form>
    </>
  )

}
