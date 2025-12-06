export interface SalesRecord {
  id: string
  // Customer Fields
  customerId: string
  customerName: string
  phoneNumber: string
  gender: string
  age: number
  customerRegion: string
  customerType: string
  // Product Fields
  productId: string
  productName: string
  brand: string
  productCategory: string
  tags: string[]
  // Sales Fields
  quantity: number
  pricePerUnit: number
  discountPercentage: number
  totalAmount: number
  finalAmount: number
  // Operational Fields
  date: string
  paymentMethod: string
  orderStatus: string
  deliveryType: string
  storeId: string
  storeLocation: string
  salespersonId: string
  employeeName: string
}

export interface FilterState {
  customerRegion: string[]
  gender: string[]
  ageRange: { min: number; max: number } | null
  productCategory: string[]
  tags: string[]
  paymentMethod: string[]
  dateRange: { start: string; end: string } | null
}

export type SortOption = "date-desc" | "date-asc" | "quantity-desc" | "quantity-asc" | "name-asc" | "name-desc"

export interface PaginationState {
  currentPage: number
  pageSize: number
  totalItems: number
  totalPages: number
}

export interface FilterOptions {
  regions: string[]
  genders: string[]
  categories: string[]
  tags: string[]
  paymentMethods: string[]
  ageRange: { min: number; max: number }
}
