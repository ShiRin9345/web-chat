import { useState, useEffect } from 'react'

interface FontOption {
  name: string
  value: string
  family: string
  preview?: string
}

export const FontSelector = () => {
  const [selectedFont, setSelectedFont] = useState('default')

  const fonts: FontOption[] = [
    { name: 'System Default', value: 'default', family: 'system-ui' },
    { name: 'Roboto', value: 'roboto', family: 'Roboto' },
    { name: 'Open Sans', value: 'open-sans', family: 'Open Sans' },
    { name: 'Lato', value: 'lato', family: 'Lato' },
  ]

  useEffect(() => {
    // 应用选中的字体
    document.documentElement.style.setProperty(
      '--custom-font-family',
      getFontFamily(selectedFont),
    )
  }, [selectedFont])

  const getFontFamily = (fontValue: string) => {
    const font = fonts.find((f) => f.value === fontValue)
    return font?.family || 'system-ui'
  }

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium">Font:</label>
      <select
        value={selectedFont}
        onChange={(e) => setSelectedFont(e.target.value)}
        className="px-3 py-2 border rounded-md bg-white dark:bg-gray-800"
      >
        {fonts.map((font) => (
          <option key={font.value} value={font.value}>
            {font.name}
          </option>
        ))}
      </select>

      <div className="text-sm text-gray-500">
        Preview:{' '}
        <span style={{ fontFamily: getFontFamily(selectedFont) }}>
          The quick brown fox
        </span>
      </div>
    </div>
  )
}
