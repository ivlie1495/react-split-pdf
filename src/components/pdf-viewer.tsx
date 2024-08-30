import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { pdfjs, Document, Page } from 'react-pdf'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

interface Props {
  pdfUrl?: string | null
}

const PDFViewer = ({ pdfUrl }: Props) => {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)

  if (!pdfUrl) {
    return null
  }

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  const handlePrevious = () => {
    setPageNumber(pageNumber - 1)
  }

  const handleNext = () => {
    setPageNumber(pageNumber + 1)
  }

  return (
    <div className="border rounded-md p-4 bg-muted grid gap-2">
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          pageNumber={pageNumber}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="link"
              onClick={handlePrevious}
              disabled={pageNumber === 1}
            >
              <ArrowLeft className="size-4" />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <p>
              Page {pageNumber} of {numPages}
            </p>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="link"
              onClick={handleNext}
              disabled={pageNumber === numPages}
            >
              <ArrowRight className="size-4" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default PDFViewer
