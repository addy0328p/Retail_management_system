import type { SalesRecord, FilterState, SortOption } from "./types"
import { salesData } from "./sales-data"

// Search function - case-insensitive search across Customer Name and Phone Number
export function searchSales(data: SalesRecord[], query: string): SalesRecord[] {
  if (!query.trim()) return data

  const searchTerm = query.toLowerCase().trim()

  return data.filter(
    (record) =>
      record.customerName.toLowerCase().includes(searchTerm) || record.phoneNumber.toLowerCase().includes(searchTerm),
  )
}

// Filter function - handles all multi-select and range filters
export function filterSales(data: SalesRecord[], filters: FilterState): SalesRecord[] {
  return data.filter((record) => {
    // Customer Region filter
    if (filters.customerRegion.length > 0 && !filters.customerRegion.includes(record.customerRegion)) {
      return false
    }

    // Gender filter
    if (filters.gender.length > 0 && !filters.gender.includes(record.gender)) {
      return false
    }

    // Age Range filter
    if (filters.ageRange) {
      if (record.age < filters.ageRange.min || record.age > filters.ageRange.max) {
        return false
      }
    }

    // Product Category filter
    if (filters.productCategory.length > 0 && !filters.productCategory.includes(record.productCategory)) {
      return false
    }

    // Tags filter (record must have at least one of the selected tags)
    if (filters.tags.length > 0) {
      const hasMatchingTag = record.tags.some((tag) => filters.tags.includes(tag))
      if (!hasMatchingTag) return false
    }

    // Payment Method filter
    if (filters.paymentMethod.length > 0 && !filters.paymentMethod.includes(record.paymentMethod)) {
      return false
    }

    // Date Range filter
    if (filters.dateRange) {
      const recordDate = new Date(record.date)
      const startDate = new Date(filters.dateRange.start)
      const endDate = new Date(filters.dateRange.end)

      if (recordDate < startDate || recordDate > endDate) {
        return false
      }
    }

    return true
  })
}

// Sort function - handles all sorting options
export function sortSales(data: SalesRecord[], sortOption: SortOption): SalesRecord[] {
  const sorted = [...data]

  switch (sortOption) {
    case "date-desc":
      return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    case "date-asc":
      return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    case "quantity-desc":
      return sorted.sort((a, b) => b.quantity - a.quantity)
    case "quantity-asc":
      return sorted.sort((a, b) => a.quantity - b.quantity)
    case "name-asc":
      return sorted.sort((a, b) => a.customerName.localeCompare(b.customerName))
    case "name-desc":
      return sorted.sort((a, b) => b.customerName.localeCompare(a.customerName))
    default:
      return sorted
  }
}

// Pagination function
export function paginateSales(
  data: SalesRecord[],
  page: number,
  pageSize: number,
): {
  data: SalesRecord[]
  totalItems: number
  totalPages: number
  currentPage: number
} {
  const totalItems = data.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const validPage = Math.max(1, Math.min(page, totalPages || 1))
  const startIndex = (validPage - 1) * pageSize
  const endIndex = startIndex + pageSize

  return {
    data: data.slice(startIndex, endIndex),
    totalItems,
    totalPages,
    currentPage: validPage,
  }
}

// Main function that combines all operations
export function processSalesData(
  searchQuery: string,
  filters: FilterState,
  sortOption: SortOption,
  page: number,
  pageSize = 10,
) {
  let result = [...salesData]

  // Apply search
  result = searchSales(result, searchQuery)

  // Apply filters
  result = filterSales(result, filters)

  // Apply sorting
  result = sortSales(result, sortOption)

  // Apply pagination
  return paginateSales(result, page, pageSize)
}
