'use client'
import {API_ENDPOINT} from '@/app/constants'
import {startRegistration} from '@simplewebauthn/browser'
import type {PublicKeyCredentialCreationOptionsJSON} from '@simplewebauthn/types'
import {MailIcon, PhoneIcon, UserIcon} from 'lucide-react'
import {useForm} from 'react-hook-form'
import {REGION_PHONE_PREFIXES, USERNAME_VALIDATION} from '../models'

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<{username: string; regionPhonePrefix: string; phone: string; email: string}>()

  return (
    <main className="flex grow flex-col">
      <div className="mx-auto mt-24 w-full rounded-md p-6 shadow-md lg:max-w-lg">
        <h1 className="text-center text-3xl font-semibold text-primary">Sign up</h1>
        <form
          className="flex flex-grow flex-col gap-4"
          onSubmit={handleSubmit(async ({username, phone, regionPhonePrefix, email}) => {
            const url = new URL('/auth/register', API_ENDPOINT)
            url.searchParams.set('username', username)
            const phoneNumber = regionPhonePrefix.slice(1) + phone
            if (phoneNumber) url.searchParams.set('phone', phoneNumber)
            if (email) url.searchParams.set('email', email)
            const options = await fetch(url, {
              credentials: 'include',
            }).then((res) => res.json() as Promise<PublicKeyCredentialCreationOptionsJSON>)

            const agentAuthenticationResponse = await startRegistration({optionsJSON: options})

            const verificationResponse = await fetch(new URL('/auth/register', API_ENDPOINT), {
              method: 'POST',
              credentials: 'include',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(agentAuthenticationResponse),
            })

            console.info(verificationResponse)
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
                autoComplete="username"
                {...register('username', USERNAME_VALIDATION)}
                className="grow"
              />
            </label>
            <div className="label">
              <span className="label-text-alt text-error">{errors.username?.message}</span>
            </div>
          </div>

          <div className="divider divider-start">Recovery options</div>

          <div>
            <label
              dir="ltr"
              className={`input input-bordered flex w-full items-center gap-2 ${errors.regionPhonePrefix || errors.phone ? 'input-error' : 'input-primary'} `}
            >
              <PhoneIcon className="text-primary" />
              <input
                {...register('regionPhonePrefix', {
                  maxLength: {value: 8, message: 'Too long!'},
                  pattern: {value: /^\+\d+/, message: 'Enter a valid region prefix.'},
                  deps: 'phone',
                  setValueAs: (value) => value.replaceAll(/[ ()-]/g, ''),
                  validate: (value, formValues) => {
                    if (formValues.phone && !value) return 'Phone prefix is missed.'
                    return true // REGION_PHONE_PREFIXES.includes(+value as RegionPhonePrefix)
                  },
                })}
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
                {...register('phone', {
                  minLength: {value: 5, message: 'Too short!'},
                  maxLength: {value: 12, message: 'Too long!'},
                  pattern: {value: /^\d*$/, message: 'Enter a valid phone number.'},
                  setValueAs: (value) => value.replaceAll(/[ ()-]/g, ''),
                  deps: 'regionPhonePrefix',
                  validate: (value, formValues) => {
                    if (formValues.regionPhonePrefix && !value) return 'Phone number is missed.'
                    return true
                  },
                })}
                className="grow"
              />
              <datalist id="region-phone-prefixes">
                {REGION_PHONE_PREFIXES.map((code) => (
                  <option key={code} value={`+${code}`} />
                ))}
              </datalist>
            </label>
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.regionPhonePrefix?.message ?? errors.phone?.message}
              </span>
            </div>
          </div>

          <div>
            <label
              dir="ltr"
              className={`input input-bordered flex w-full items-center gap-2 ${errors.email ? 'input-error' : 'input-primary'}`}
            >
              <MailIcon className="text-primary" />
              <input
                type="text"
                placeholder="email@exapmple.com"
                autoComplete="email"
                {...register('email', {
                  minLength: {value: 6, message: 'Too short!'},
                  maxLength: {value: 127, message: 'Too long!'},
                  pattern: {value: /\S+@\S+\.\S+/, message: 'Enter a valid email address.'},
                })}
                className="grow"
              />
            </label>
            <div className="label">
              <span className="label-text-alt text-error">{errors.email?.message}</span>
            </div>
          </div>

          <button className="btn btn-primary" type="submit">
            Sign up
          </button>
        </form>
      </div>
    </main>
  )
}
