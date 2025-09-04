import React from 'react'

interface PDFDisplayProps {
  fileName: string
}

const PDFDisplay: React.FC<PDFDisplayProps> = ({ fileName }) => {
  return (
    <div className="flex flex-col gap-2 bg-white py-2 px-3">
      <p className="font-medium  line-clamp-3 content-center min-w-[200px] max-w-[300px] break-all  ">
        {fileName}
      </p>
      <div className="flex w-full items-center gap-2 justify-between">
        <img src="/pdf-svgrepo-com.svg" alt="pdf" className="w-10 h-10" />
        <span className="text-sm text-gray-500">PDF Document</span>
      </div>
    </div>
  )
}

export default PDFDisplay
