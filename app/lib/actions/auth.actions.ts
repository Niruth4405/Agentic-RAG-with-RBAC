'use server'

import { signIn, signOut } from '@/app/lib/auth'
import { AuthError } from 'next-auth'

export async function loginAction(_prevState: unknown,formData: FormData) {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/admin',
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid email or password.' }
        default:
          return { error: 'Something went wrong. Please try again.' }
      }
    }
    // Must re-throw redirect errors — Next.js uses throw for redirects
    throw error
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: '/login' })
}