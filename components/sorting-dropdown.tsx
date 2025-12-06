"use client"

import { ArrowUpDown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { SortOption } from "@/lib/types"
import { cn } from "@/lib/utils"

interface SortingDropdownProps {
  value: SortOption
  onChange: (option: SortOption) => void
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "date-desc", label: "Date (Newest First)" },
  { value: "date-asc", label: "Date (Oldest First)" },
  { value: "quantity-desc", label: "Quantity (High to Low)" },
  { value: "quantity-asc", label: "Quantity (Low to High)" },
  { value: "name-asc", label: "Customer Name (A–Z)" },
  { value: "name-desc", label: "Customer Name (Z–A)" },
]

export default function SortingDropdown({ value, onChange }: SortingDropdownProps) {
  const currentLabel = sortOptions.find((opt) => opt.value === value)?.label || "Sort"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 h-11 min-w-[160px] bg-transparent">
          <ArrowUpDown className="h-4 w-4" />
          <span className="hidden sm:inline truncate">{currentLabel}</span>
          <span className="sm:hidden">Sort</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn("flex items-center justify-between", value === option.value && "bg-muted")}
          >
            {option.label}
            {value === option.value && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
