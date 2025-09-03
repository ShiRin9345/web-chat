import React from 'react'

interface SidebarItemProps {
  icon?: React.ReactNode
  title: string
  subtitle?: string
  iconBgColor?: string
  iconTextColor?: string
  hoverBgColor?: string
  hoverIconBgColor?: string
  children?: React.ReactNode
  className?: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  title,
  subtitle,
  iconBgColor = 'bg-gray-100 dark:bg-gray-700 orange:bg-orange-200',
  iconTextColor = 'text-gray-600 dark:text-gray-300 orange:text-orange-700',
  hoverBgColor = 'hover:bg-zinc-50 dark:hover:bg-gray-800 orange:hover:bg-orange-100',
  hoverIconBgColor = 'group-hover:bg-gray-200 dark:group-hover:bg-gray-600 orange:group-hover:bg-orange-300',
  children,
  className = '',
}) => {
  return (
    <div
      className={`w-full flex items-center gap-3 p-3 ${hoverBgColor} hover:shadow-sm transition-all duration-300 rounded-lg cursor-pointer group ${className}`}
    >
      <div className="flex-shrink-0">
        <div
          className={`w-10 h-10 rounded-lg ${iconBgColor} flex items-center justify-center ${iconTextColor} ${hoverIconBgColor} transition-colors`}
        >
          {icon}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <span className="font-semibold text-gray-900 dark:text-white orange:text-orange-900 text-lg">
          {title}
        </span>
        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-400 orange:text-orange-700">
            {subtitle}
          </p>
        )}
      </div>

      {children && <div className="flex-shrink-0">{children}</div>}
    </div>
  )
}

export default SidebarItem
