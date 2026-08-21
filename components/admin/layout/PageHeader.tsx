import * as React from "react"
import { Breadcrumb } from "../../ui/Breadcrumb"
import { cn } from "../../ui/utils"

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  breadcrumbs?: { label: string; href?: string }[]
  action?: React.ReactNode
}

export function PageHeader({ title, description, breadcrumbs, action, className, ...props }: PageHeaderProps) {
  return (
    <div className={cn("mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", className)} {...props}>
      <div className="flex flex-col gap-1.5">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-1">
            <Breadcrumb items={breadcrumbs} />
          </div>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className="flex items-center gap-3">
          {action}
        </div>
      )}
    </div>
  )
}
