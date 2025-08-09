import { createFileRoute } from '@tanstack/react-router'
import { SignUp } from '@clerk/clerk-react'

export const Route = createFileRoute('/(auth)/signUp/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <SignUp path="/signUp" signInUrl="/signIn" fallbackRedirectUrl="/main" />
    </div>
  )
}
