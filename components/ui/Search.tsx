import * as React from "react"
import { Search as SearchIcon } from "lucide-react"
import { cn } from "./utils"

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onSearch?: (value: string) => void;
};

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, onSearch, onChange, ...props }, ref) => {
    return (
      <div className={cn("relative flex items-center w-full max-w-sm", className)}>
        <SearchIcon className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          ref={ref}
          onChange={(e) => {
            onChange?.(e);
            onSearch?.(e.target.value);
          }}
          {...props}
        />
      </div>
    )
  }
)
Search.displayName = "Search"

export { Search }
