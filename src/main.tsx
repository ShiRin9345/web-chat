import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import * as Sentry from '@sentry/react'
import { pdfjs } from 'react-pdf'
import * as TanStackQueryProvider from './integrations/tanstack-query/root-provider.tsx'

import { routeTree } from './routeTree.gen'

import './styles.css'

import reportWebVitals from './reportWebVitals.ts'
import { SocketProvider } from '@/providers/socketProvider.tsx'
import AppClerkProvider from '@/integrations/clerk/provider.tsx'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

Sentry.init({
  dsn: 'https://1ff094fd94f7eaee712de5d8fe7a5bf4@o4509829533204480.ingest.us.sentry.io/4509829534646272',
  sendDefaultPii: true,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ['localhost', /^http:\/\/localhost:3000\/api/],
})

const TanStackQueryProviderContext = TanStackQueryProvider.getContext()
const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProviderContext,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <AppClerkProvider>
      <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
        <SocketProvider>
          <RouterProvider router={router} />
        </SocketProvider>
      </TanStackQueryProvider.Provider>
    </AppClerkProvider>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
