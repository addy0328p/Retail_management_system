"use client"

import { useState, useCallback, useMemo } from "react"
import type { FilterState, SortOption } from "@/lib/types"
import { getFilterOptions } from "@/lib/sales-data"
import { processSalesData } from "@/lib/sales-service"
import SearchBar from "./search-bar"
import FilterPanel from "./filter-panel"
import SalesTable from "./sales-table"
import SortingDropdown from "./sorting-dropdown"
import PaginationControls from "./pagination-controls"
import { Package, TrendingUp, Users, DollarSign } from "lucide-react"

const initialFilters: FilterState = {
  customerRegion: [],
  gender: [],
  ageRange: null,
  productCategory: [],
  tags: [],
  paymentMethod: [],
  dateRange: null,
}

export default function SalesManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [sortOption, setSortOption] = useState<SortOption>("date-desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filterOptions = useMemo(() => getFilterOptions(), [])

  const {
    data: salesRecords,
    totalItems,
    totalPages,
  } = useMemo(() => {
    return processSalesData(searchQuery, filters, sortOption, currentPage, 10)
  }, [searchQuery, filters, sortOption, currentPage])

  // Reset to page 1 when search, filters, or sort changes
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }, [])

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }, [])

  const handleSortChange = useCallback((option: SortOption) => {
    setSortOption(option)
    setCurrentPage(1)
  }, [])

  const handleClearFilters = useCallback(() => {
    setFilters(initialFilters)
    setCurrentPage(1)
  }, [])

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.customerRegion.length > 0) count++
    if (filters.gender.length > 0) count++
    if (filters.ageRange) count++
    if (filters.productCategory.length > 0) count++
    if (filters.tags.length > 0) count++
    if (filters.paymentMethod.length > 0) count++
    if (filters.dateRange) count++
    return count
  }, [filters])

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Retail Sales Management</h1>
                <p className="text-sm text-muted-foreground">TruEstate SDE Intern Assignment</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Total Records:</span>
                <span className="font-semibold">{totalItems}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Transactions</p>
                <p className="text-lg font-bold">{totalItems}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Showing</p>
                <p className="text-lg font-bold">
                  {salesRecords.length} of {totalItems}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Active Filters</p>
                <p className="text-lg font-bold">{activeFilterCount}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Page</p>
                <p className="text-lg font-bold">
                  {currentPage} / {totalPages || 1}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <SearchBar value={searchQuery} onChange={handleSearchChange} />
          </div>
          <div className="flex gap-3">
            <FilterPanel
              filters={filters}
              filterOptions={filterOptions}
              onChange={handleFilterChange}
              onClear={handleClearFilters}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
              activeCount={activeFilterCount}
            />
            <SortingDropdown value={sortOption} onChange={handleSortChange} />
          </div>
        </div>

        {/* Table */}
        <div className="bg-background rounded-xl border border-border shadow-sm overflow-hidden">
          <SalesTable records={salesRecords} />
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}
