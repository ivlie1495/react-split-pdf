import { useState } from 'react'

const useFile = () => {
  const [file, setFile] = useState<File | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)

      const url = URL.createObjectURL(selectedFile)
      setPdfUrl(url)
    }
  }

  return {
    file,
    pdfUrl,
    onFileChange,
  }
}

export default useFile
