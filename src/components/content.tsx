import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'

import PDFViewer from '@/components/pdf-viewer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface SplitConfig {
  start: string
  end: string
  fileName: string
}

const Content = () => {
  const [file, setFile] = useState<File | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [splitConfigs, setSplitConfigs] = useState<SplitConfig[]>([
    { start: '', end: '', fileName: '' },
  ])

  const addSplitConfig = () => {
    setSplitConfigs([...splitConfigs, { start: '', end: '', fileName: '' }])
  }

  const removeSplitConfig = (index: number) => {
    setSplitConfigs(splitConfigs.filter((_, i) => i !== index))
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)

      const url = URL.createObjectURL(selectedFile)
      setPdfUrl(url)
    }
  }

  const updateSplitConfig = (
    index: number,
    field: keyof SplitConfig,
    value: string
  ) => {
    const newConfigs = [...splitConfigs]
    newConfigs[index][field] = value
    setSplitConfigs(newConfigs)
  }

  const onSplitClick = async () => {
    if (
      !file ||
      splitConfigs.some(
        (config) => !config.start || !config.end || !config.fileName
      )
    ) {
      alert(
        'Please upload a PDF, specify all page ranges, and provide names for all extracted files'
      )
      return
    }

    splitConfigs.forEach(async (splitConfig) => {
      const fileArrayBuffer = await file.arrayBuffer()
      const uint8Array = new Uint8Array(fileArrayBuffer)

      const mainPdfDoc = await PDFDocument.load(uint8Array)
      const pdfDoc = await PDFDocument.create()

      const range = []
      const { fileName, start, end } = splitConfig
      const startPage = parseInt(start) - 1
      const endPage = parseInt(end) - 1

      for (let i = startPage; i <= endPage; i++) {
        range.push(i)
      }

      const pages = await pdfDoc.copyPages(mainPdfDoc, range)
      pages.forEach((page) => {
        pdfDoc.addPage(page)
      })

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const link = document.createElement('a')

      link.href = URL.createObjectURL(blob)
      link.download = `${fileName}.pdf`
      link.click()
    })
  }

  return (
    <div className="flex gap-6 justify-between">
      <PDFViewer pdfUrl={pdfUrl} />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Split Your PDF</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label htmlFor="pdf-upload">Upload PDF</Label>
              <Input
                id="pdf-upload"
                type="file"
                accept=".pdf"
                onChange={onFileChange}
              />
            </div>
            {splitConfigs.map((config, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Split {index + 1}</h3>
                  {index > 0 && (
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeSplitConfig(index)}
                      aria-label={`Remove split ${index + 1}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor={`page-range-${index}`}>Start</Label>
                    <Input
                      id={`page-range-${index}`}
                      type="text"
                      placeholder="Start Page"
                      value={config.start}
                      onChange={(e) =>
                        updateSplitConfig(index, 'start', e.target.value)
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`page-range-${index}`}>End</Label>
                    <Input
                      id={`page-range-${index}`}
                      type="text"
                      placeholder="End Page"
                      value={config.end}
                      onChange={(e) =>
                        updateSplitConfig(index, 'end', e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`extracted-file-name-${index}`}>
                    File Name
                  </Label>
                  <Input
                    id={`extracted-file-name-${index}`}
                    type="text"
                    placeholder="Enter file name for extracted PDF"
                    value={config.fileName}
                    onChange={(e) =>
                      updateSplitConfig(index, 'fileName', e.target.value)
                    }
                  />
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full"
              onClick={addSplitConfig}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Another Split
            </Button>

            <Button
              onClick={onSplitClick}
              disabled={
                !file ||
                splitConfigs.some(
                  (config) => !config.start || !config.end || !config.fileName
                )
              }
              className="w-full"
            >
              Splits PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Content
