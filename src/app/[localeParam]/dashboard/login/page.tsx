'use client'
import {API_ENDPOINT} from '@/app/constants'
import {startAuthentication} from '@simplewebauthn/browser'
import type {PublicKeyCredentialRequestOptionsJSON} from '@simplewebauthn/types'
import {UserIcon} from 'lucide-react'
import {useForm} from 'react-hook-form'
import {USERNAME_VALIDATION} from '../models'

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<{username: string}>()

  return (
    <main className="flex grow flex-col">
      <div className="mx-auto mt-24 w-full rounded-md p-6 shadow-md lg:max-w-lg">
        <h1 className="text-center text-3xl font-semibold text-primary">Login</h1>
        <form
          className="flex flex-grow flex-col gap-4"
          onSubmit={handleSubmit(async ({username}) => {
            const url = new URL('/auth/authenticate', API_ENDPOINT)
            url.searchParams.set('username', username)

            const options = await fetch(url, {
              credentials: 'include',
            }).then((res) => res.json() as Promise<PublicKeyCredentialRequestOptionsJSON>)

            const agentAuthenticationResponse = await startAuthentication({optionsJSON: options})

            const verificationResponse = await fetch(new URL('/auth/authenticate', API_ENDPOINT), {
              method: 'POST',
              credentials: 'include',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(agentAuthenticationResponse),
            })

            console.log(verificationResponse)
          })}
        >
          <div>
            <label
              dir="ltr"
              className={`input input-bordered flex w-full items-center gap-2 ${errors.username ? 'input-error' : 'input-primary'}`}
            >
              <UserIcon className="text-primary" />
              <input
                type="text"
                placeholder="Username*"
                autoComplete="username webauthn"
                {...register('username', USERNAME_VALIDATION)}
                className="grow"
              />
            </label>
            <div className="label">
              <span className="label-text-alt text-error">{errors.username?.message}</span>
            </div>
          </div>

          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    </main>
  )
}
