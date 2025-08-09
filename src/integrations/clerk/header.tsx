import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  RedirectToSignIn,
} from '@clerk/clerk-react'

export default function HeaderUser() {
  return (
    <>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: '!size-12',
              userButtonPopoverFooter: '!hidden',
              userButtonPopoverActionButton__manageAccount: '!hidden',
              userPreview: '!hidden',
              userButtonPopoverCard: '!w-[10rem] !shadow-accent !shadow-lg',
            },
            layout: { shimmer: false },
          }}
        />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn signInFallbackRedirectUrl="/signIn" />
      </SignedOut>
    </>
  )
}
