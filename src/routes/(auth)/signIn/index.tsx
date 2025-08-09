import { createFileRoute } from '@tanstack/react-router'
import { SignIn } from '@clerk/clerk-react'

export const Route = createFileRoute('/(auth)/signIn/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <SignIn
        path="/signIn"
        signUpUrl="/signUp"
        fallbackRedirectUrl="/main"
        appearance={{
          elements: {
            footerAction__signUp: { display: 'inline-block' },
          },
          layout: {
            showOptionalFields: true,
          },
        }}
      />
    </div>
  )
}
