// 'use server'

// import { revalidatePath } from 'next/cache'
// import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/client'

type UserSignInType={
  email: string,
  password: string
}

export async function login(formData: UserSignInType) {
  const supabase = await createClient()
console.log("login called", formData)
  // type-casting here for convenience
  // in practice, you should validate your inputs
  // const data = {
  //   email: formData.get('email') as string,
  //   password: formData.get('password') as string,
  // }

  const data = {
    email: formData['email'],
    password: formData['password'],
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    // redirect('/error')
    console.log("error logging in ", error)
  }

  console.log("login successful", formData)

  // revalidatePath('/', 'layout')
  // redirect('/')
  // revalidatePath('/', 'layout')
  // redirect('/')
}

export async function signup(formData: UserSignInType) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  // const data = {
  //   email: formData.get('email') as string,
  //   password: formData.get('password') as string,
  // }
  const data = {
    email: formData['email'],
    password: formData['password'],
  }

  const { error } = await supabase.auth.signUp(data)

  console.log("error signing up",error)
  if (error) {
    // redirect('/error')
  }

  // revalidatePath('/', 'layout')
  // redirect('/')
  // revalidatePath('/', 'layout')
  // redirect('/')
}

export async function signInWithGithub() {
  const supabase = await createClient()
  // const { data, error } = await supabase.auth.signInWithOAuth({
  //   provider: 'github',
  // })

  await supabase.auth.signInWithOAuth({
    // provider: 'github',
    provider: 'google',
    options: {
      // redirectTo: `http://localhost:3000`,
      redirectTo: `http://localhost:3000/auth/callback`,
    },
  })
}