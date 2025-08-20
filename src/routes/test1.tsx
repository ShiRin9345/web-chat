import { createFileRoute } from '@tanstack/react-router'
import { Document, Page } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { useRef, useState } from 'react'
import PendingPage from '@/components/pendingPage.tsx'
import { Button } from '@/components/ui/button.tsx'

export const Route = createFileRoute('/test1')({
  component: RouteComponent,
})

function RouteComponent() {
  const [numPages, setNumPages] = useState<number>()
  const [pageNumber, setPageNumber] = useState<number>(1)
  const ref = useRef<HTMLDivElement>(null)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages)
  }
  return (
    <div className="h-dvh w-full flex items-center justify-center">
      <div className="w-min h-1/2" ref={ref}>
        <Document
          file="https://shirin-123.oss-cn-beijing.aliyuncs.com/GSAP%20Guide%20v2.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<PendingPage />}
        >
          <Page
            pageNumber={pageNumber}
            height={ref.current?.clientHeight}
            loading={<PendingPage />}
          />
        </Document>
      </div>
      <p>
        Page {pageNumber} of {numPages}
      </p>

      <Button onClick={() => setPageNumber((prev) => prev + 1)}>next</Button>
      <Button onClick={() => setPageNumber((prev) => prev - 1)}>prev</Button>
    </div>
  )
}
