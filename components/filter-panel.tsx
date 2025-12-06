"use client"

import { useState } from "react"
import { Filter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Checkbox } from "@/components/ui/checkbox"
import type { FilterState, FilterOptions } from "@/lib/types"
import { cn } from "@/lib/utils"

interface FilterPanelProps {
  filters: FilterState
  filterOptions: FilterOptions
  onChange: (filters: FilterState) => void
  onClear: () => void
  isOpen: boolean
  onToggle: () => void
  activeCount: number
}

export default function FilterPanel({
  filters,
  filterOptions,
  onChange,
  onClear,
  isOpen,
  onToggle,
  activeCount,
}: FilterPanelProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    region: true,
    gender: true,
    age: true,
    category: true,
    tags: false,
    payment: false,
    date: false,
  })

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleMultiSelectChange = (
    key: keyof Pick<FilterState, "customerRegion" | "gender" | "productCategory" | "tags" | "paymentMethod">,
    value: string,
    checked: boolean,
  ) => {
    const currentValues = filters[key]
    const newValues = checked ? [...currentValues, value] : currentValues.filter((v) => v !== value)

    onChange({ ...filters, [key]: newValues })
  }

  const handleAgeRangeChange = (type: "min" | "max", value: string) => {
    const numValue =
      Number.parseInt(value) || (type === "min" ? filterOptions.ageRange.min : filterOptions.ageRange.max)
    const currentRange = filters.ageRange || { min: filterOptions.ageRange.min, max: filterOptions.ageRange.max }

    const newRange = {
      ...currentRange,
      [type]: numValue,
    }

    // Validate range
    if (newRange.min <= newRange.max) {
      onChange({ ...filters, ageRange: newRange })
    }
  }

  const handleDateRangeChange = (type: "start" | "end", value: string) => {
    const currentRange = filters.dateRange || { start: "", end: "" }

    const newRange = {
      ...currentRange,
      [type]: value,
    }

    // Only update if both dates are set or we're clearing
    if (newRange.start && newRange.end) {
      onChange({ ...filters, dateRange: newRange })
    } else if (!value) {
      // Clear if emptying a field
      if (!newRange.start && !newRange.end) {
        onChange({ ...filters, dateRange: null })
      } else {
        onChange({ ...filters, dateRange: newRange })
      }
    } else {
      onChange({ ...filters, dateRange: newRange })
    }
  }

  const clearAgeRange = () => {
    onChange({ ...filters, ageRange: null })
  }

  const clearDateRange = () => {
    onChange({ ...filters, dateRange: null })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onToggle}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2 h-11 bg-transparent">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
          {activeCount > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {activeCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Filters</span>
            {activeCount > 0 && (
              <Button variant="ghost" size="sm" onClick={onClear} className="text-destructive hover:text-destructive">
                Clear all
              </Button>
            )}
          </SheetTitle>
          <SheetDescription>Refine your search with multiple filters</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Customer Region */}
          <Collapsible open={openSections.region} onOpenChange={() => toggleSection("region")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium">
              <span className="flex items-center gap-2">
                Customer Region
                {filters.customerRegion.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {filters.customerRegion.length}
                  </Badge>
                )}
              </span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", openSections.region && "rotate-180")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 pb-4 space-y-2">
              {filterOptions.regions.map((region) => (
                <label
                  key={region}
                  className="flex items-center gap-3 py-1 cursor-pointer hover:bg-muted/50 px-2 rounded"
                >
                  <Checkbox
                    checked={filters.customerRegion.includes(region)}
                    onCheckedChange={(checked) => handleMultiSelectChange("customerRegion", region, checked as boolean)}
                  />
                  <span className="text-sm">{region}</span>
                </label>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Gender */}
          <Collapsible open={openSections.gender} onOpenChange={() => toggleSection("gender")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium border-t pt-4">
              <span className="flex items-center gap-2">
                Gender
                {filters.gender.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {filters.gender.length}
                  </Badge>
                )}
              </span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", openSections.gender && "rotate-180")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 pb-4 space-y-2">
              {filterOptions.genders.map((gender) => (
                <label
                  key={gender}
                  className="flex items-center gap-3 py-1 cursor-pointer hover:bg-muted/50 px-2 rounded"
                >
                  <Checkbox
                    checked={filters.gender.includes(gender)}
                    onCheckedChange={(checked) => handleMultiSelectChange("gender", gender, checked as boolean)}
                  />
                  <span className="text-sm">{gender}</span>
                </label>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Age Range */}
          <Collapsible open={openSections.age} onOpenChange={() => toggleSection("age")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium border-t pt-4">
              <span className="flex items-center gap-2">
                Age Range
                {filters.ageRange && (
                  <Badge variant="secondary" className="text-xs">
                    Active
                  </Badge>
                )}
              </span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", openSections.age && "rotate-180")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground">Min Age</Label>
                  <Input
                    type="number"
                    min={filterOptions.ageRange.min}
                    max={filterOptions.ageRange.max}
                    value={filters.ageRange?.min ?? ""}
                    placeholder={String(filterOptions.ageRange.min)}
                    onChange={(e) => handleAgeRangeChange("min", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <span className="text-muted-foreground mt-5">—</span>
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground">Max Age</Label>
                  <Input
                    type="number"
                    min={filterOptions.ageRange.min}
                    max={filterOptions.ageRange.max}
                    value={filters.ageRange?.max ?? ""}
                    placeholder={String(filterOptions.ageRange.max)}
                    onChange={(e) => handleAgeRangeChange("max", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              {filters.ageRange && (
                <Button variant="ghost" size="sm" onClick={clearAgeRange} className="mt-2 text-xs">
                  Clear age range
                </Button>
              )}
            </CollapsibleContent>
          </Collapsible>

          {/* Product Category */}
          <Collapsible open={openSections.category} onOpenChange={() => toggleSection("category")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium border-t pt-4">
              <span className="flex items-center gap-2">
                Product Category
                {filters.productCategory.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {filters.productCategory.length}
                  </Badge>
                )}
              </span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", openSections.category && "rotate-180")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 pb-4 space-y-2">
              {filterOptions.categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-3 py-1 cursor-pointer hover:bg-muted/50 px-2 rounded"
                >
                  <Checkbox
                    checked={filters.productCategory.includes(category)}
                    onCheckedChange={(checked) =>
                      handleMultiSelectChange("productCategory", category, checked as boolean)
                    }
                  />
                  <span className="text-sm">{category}</span>
                </label>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Tags */}
          <Collapsible open={openSections.tags} onOpenChange={() => toggleSection("tags")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium border-t pt-4">
              <span className="flex items-center gap-2">
                Tags
                {filters.tags.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {filters.tags.length}
                  </Badge>
                )}
              </span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", openSections.tags && "rotate-180")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 pb-4 space-y-2">
              {filterOptions.tags.map((tag) => (
                <label key={tag} className="flex items-center gap-3 py-1 cursor-pointer hover:bg-muted/50 px-2 rounded">
                  <Checkbox
                    checked={filters.tags.includes(tag)}
                    onCheckedChange={(checked) => handleMultiSelectChange("tags", tag, checked as boolean)}
                  />
                  <span className="text-sm">{tag}</span>
                </label>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Payment Method */}
          <Collapsible open={openSections.payment} onOpenChange={() => toggleSection("payment")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium border-t pt-4">
              <span className="flex items-center gap-2">
                Payment Method
                {filters.paymentMethod.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {filters.paymentMethod.length}
                  </Badge>
                )}
              </span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", openSections.payment && "rotate-180")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 pb-4 space-y-2">
              {filterOptions.paymentMethods.map((method) => (
                <label
                  key={method}
                  className="flex items-center gap-3 py-1 cursor-pointer hover:bg-muted/50 px-2 rounded"
                >
                  <Checkbox
                    checked={filters.paymentMethod.includes(method)}
                    onCheckedChange={(checked) => handleMultiSelectChange("paymentMethod", method, checked as boolean)}
                  />
                  <span className="text-sm">{method}</span>
                </label>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Date Range */}
          <Collapsible open={openSections.date} onOpenChange={() => toggleSection("date")}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium border-t pt-4">
              <span className="flex items-center gap-2">
                Date Range
                {filters.dateRange && (
                  <Badge variant="secondary" className="text-xs">
                    Active
                  </Badge>
                )}
              </span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", openSections.date && "rotate-180")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 pb-4">
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Start Date</Label>
                  <Input
                    type="date"
                    value={filters.dateRange?.start ?? ""}
                    onChange={(e) => handleDateRangeChange("start", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">End Date</Label>
                  <Input
                    type="date"
                    value={filters.dateRange?.end ?? ""}
                    onChange={(e) => handleDateRangeChange("end", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              {filters.dateRange && (
                <Button variant="ghost" size="sm" onClick={clearDateRange} className="mt-2 text-xs">
                  Clear date range
                </Button>
              )}
            </CollapsibleContent>
          </Collapsible>
        </div>

        <SheetFooter className="mt-8">
          <Button onClick={onToggle} className="w-full">
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
