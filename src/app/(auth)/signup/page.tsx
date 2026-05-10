import { redirect } from 'next/navigation'

// Google OAuth ではログインと新規登録が同じフローのため /login に統一
export default function SignupPage() {
  redirect('/login')
}
