'use client'
import regionPhonePrefixes from '@/app/[localeParam]/dashboard/login/region-phone-prefixes'
import {KeyRound, Phone} from 'lucide-react'
import {useForm} from 'react-hook-form'

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<{regionPhonePrefix: string; phone: number; password: string}>()

  return (
    <main className="flex grow flex-col">
      <div className="mx-auto mt-24 w-full rounded-md p-6 shadow-md lg:max-w-lg">
        <h1 className="text-center text-3xl font-semibold text-primary">Login</h1>
        <form className="flex flex-grow flex-col gap-4" onSubmit={handleSubmit((data) => console.log(data))}>
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

          <label
            dir="ltr"
            className={`input input-bordered flex w-full items-center gap-2 ${errors.password ? 'input-error' : 'input-primary'}`}
          >
            <KeyRound className="text-primary" />
            <input
              type="password"
              placeholder="Password"
              {...register('password', {required: true, minLength: 5})}
              className="grow"
            />
          </label>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    </main>
  )
}
