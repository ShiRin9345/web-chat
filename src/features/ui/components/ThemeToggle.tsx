import React, { useState } from 'react'
import { Moon, Sun, Palette, Monitor, ChevronDown } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const ThemeToggle: React.FC = () => {
  const {
    currentTheme,
    setTheme,
    availableThemes,
    isSystemTheme,
    toggleSystemTheme,
  } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const getThemeIcon = (themeName: string) => {
    switch (themeName) {
      case 'light':
        return <Sun className="h-4 w-4" />
      case 'dark':
        return <Moon className="h-4 w-4" />
      case 'blue':
        return <Palette className="h-4 w-4 text-blue-500" />
      case 'green':
        return <Palette className="h-4 w-4 text-green-500" />
      default:
        return <Palette className="h-4 w-4" />
    }
  }

  const getCurrentThemeIcon = () => {
    if (isSystemTheme) {
      return <Monitor className="h-4 w-4" />
    }
    return getThemeIcon(currentTheme)
  }

  const handleThemeChange = (themeName: string) => {
    setTheme(themeName as any)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
        title={`当前主题: ${isSystemTheme ? '跟随系统' : currentTheme}`}
      >
        {getCurrentThemeIcon()}
        <ChevronDown
          className={cn('h-3 w-3 transition-transform', isOpen && 'rotate-180')}
        />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-md border bg-popover p-2 shadow-lg z-50">
          <div className="space-y-1">
            {/* 系统主题选项 */}
            <button
              onClick={toggleSystemTheme}
              className={cn(
                'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors',
                isSystemTheme
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground',
              )}
            >
              <Monitor className="h-4 w-4" />
              跟随系统
            </button>

            {/* 分隔线 */}
            <div className="border-t my-1" />

            {/* 主题选项 */}
            {availableThemes.map((themeName) => (
              <button
                key={themeName}
                onClick={() => handleThemeChange(themeName)}
                className={cn(
                  'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors',
                  !isSystemTheme && currentTheme === themeName
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground',
                )}
              >
                {getThemeIcon(themeName)}
                {themeName === 'light'
                  ? '浅色'
                  : themeName === 'dark'
                    ? '深色'
                    : themeName === 'blue'
                      ? '蓝色'
                      : themeName === 'green'
                        ? '绿色'
                        : themeName}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ThemeToggle
