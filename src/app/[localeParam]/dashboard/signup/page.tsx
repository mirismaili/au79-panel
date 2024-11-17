'use client'
import regionPhonePrefixes from '@/app/[localeParam]/dashboard/signup/region-phone-prefixes'
import {startAuthentication, startRegistration} from '@simplewebauthn/browser'
import type {PublicKeyCredentialCreationOptionsJSON} from '@simplewebauthn/types'
import {KeyRound, Phone} from 'lucide-react'
import {useForm} from 'react-hook-form'

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<{regionPhonePrefix: string; phone: number}>()

  return (
    <main className="flex grow flex-col">
      <div className="mx-auto mt-24 w-full rounded-md p-6 shadow-md lg:max-w-lg">
        <h1 className="text-center text-3xl font-semibold text-primary">Sign up</h1>
        <form
          className="flex flex-grow flex-col gap-4"
          onSubmit={handleSubmit(async (data) => {
            const url = new URL('/auth/register', 'http://localhost:7979')
            url.searchParams.set('username', 'mirismaili')
            const options = (await fetch(url, {
              credentials: 'include',
            }).then((res) => res.json())) as PublicKeyCredentialCreationOptionsJSON

            console.log('options', options)
            const agentAuthenticationResponse = await startRegistration({optionsJSON: options})

            const verificationResponse = await fetch(new URL('/auth/register', 'http://localhost:7979'), {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(agentAuthenticationResponse),
            })

            console.log(verificationResponse)
          })}
        >
          <label
            dir="ltr"
            className={`input input-bordered flex w-full items-center gap-2 ${errors.phone ? 'input-error' : 'input-primary'}`}
          >
            <Phone className="text-primary" />
            <input
              {...register('regionPhonePrefix', {required: true, maxLength: 7})}
              type="text"
              list="region-phone-prefixes"
              placeholder="Prefix"
              autoFocus
              className="w-[4em] text-center"
            />
            <div className="divider divider-horizontal mx-0 my-2" />
            <input
              type="text"
              placeholder="Phone number"
              autoComplete="phone"
              {...register('phone', {required: true, minLength: 10, maxLength: 10, pattern: /^\d+$/})}
              className="grow"
            />
            <datalist id="region-phone-prefixes">{regionPhonePrefixes}</datalist>
          </label>

          <button className="btn btn-primary" type="submit">
            Sing up
          </button>
        </form>
      </div>
    </main>
  )
}

const x = {
  challenge: '07P_X_IT0GaEnqYNRptbJpcbOGDRw4LCEBV8IypWFKI',
  rp: {
    name: 'Au79 API',
    id: 'localhost',
  },
  user: {
    id: 'RJk2WRoC5oCuH45TO_GMWEH_G4_Pde3m2RBsD8USqyU',
    name: 'username',
    displayName: '',
  },
  pubKeyCredParams: [
    {
      alg: -7,
      type: 'public-key',
    },
    {
      alg: -257,
      type: 'public-key',
    },
  ],
  timeout: 60000,
  attestation: 'none',
  excludeCredentials: [],
  authenticatorSelection: {
    residentKey: 'discouraged',
    userVerification: 'preferred',
    requireResidentKey: false,
  },
  extensions: {
    credProps: true,
  },
}

const y = {
  challenge: '9IHMpzuwyrXlxO59YvjmUHt3SCoYbn1zm6kNkcJG3fQ',
  rp: {
    name: 'Au79 API',
    id: 'localhost',
  },
  user: {
    id: '4FZ7a5eID1E6UkMtZBfqK3ZPxRPjLqB4L06rH9aFFhg',
    name: 'username',
    displayName: '',
  },
  pubKeyCredParams: [
    {
      alg: -7,
      type: 'public-key',
    },
    {
      alg: -257,
      type: 'public-key',
    },
  ],
  timeout: 60000,
  attestation: 'none',
  excludeCredentials: [
    {
      id: 'RouxEUoJCZTNFSnwDm9kXKVcY2hZb3JkFwq5gOew_OU',
      type: 'public-key',
      transports: ['internal'],
    },
  ],
  authenticatorSelection: {
    residentKey: 'discouraged',
    userVerification: 'preferred',
    requireResidentKey: false,
  },
  extensions: {
    credProps: true,
  },
}
