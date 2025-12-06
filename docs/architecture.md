# Architecture Document

## Overview

This document outlines the architecture of the Retail Sales Management System, including backend and frontend components, data flow, folder structure, and module responsibilities.

---

## Backend Architecture

The application uses Next.js App Router which provides a unified full-stack architecture. Server-side logic is handled through:

### Data Layer (`/lib`)

- **sales-data.ts:** Contains the sales dataset (500 records) and utility functions to extract filter options
- **sales-service.ts:** Core business logic for processing sales data including search, filtering, sorting, and pagination
- **types.ts:** TypeScript interfaces and type definitions for type safety

### Processing Pipeline

1. **Input:** Search query, filter state, sort option, pagination params
2. **Search Filter:** Case-insensitive matching on Customer Name and Phone Number
3. **Multi-Filter Application:** Sequential application of all active filters
4. **Sorting:** Applied after filtering based on selected sort option
5. **Pagination:** Slice the sorted results for current page
6. **Output:** Paginated records with metadata (totalItems, totalPages)

---

## Frontend Architecture

### Component Hierarchy

\`\`\`
app/
├── layout.tsx          # Root layout with metadata
├── page.tsx            # Entry point, renders SalesManagement
└── globals.css         # Global styles and Tailwind config

components/
├── sales-management.tsx    # Main container component (state management)
├── search-bar.tsx          # Search input with debounce
├── filter-panel.tsx        # Slide-out filter sheet
├── sorting-dropdown.tsx    # Sort option selector
├── sales-table.tsx         # Transaction data table
└── pagination-controls.tsx # Page navigation controls
\`\`\`

### State Management

All state is managed in `SalesManagement` component using React hooks:

- `useState` for search query, filters, sort option, current page
- `useMemo` for derived data (processed records, filter options)
- `useCallback` for memoized event handlers

### Component Communication

- **Props Down:** Parent passes state and handlers to children
- **Callbacks Up:** Children invoke parent handlers on user actions
- **No Prop Drilling:** Flat component hierarchy minimizes prop passing

---

## Data Flow

\`\`\`
User Action (Search/Filter/Sort/Page)
         ↓
State Update in SalesManagement
         ↓
useMemo recalculates processSalesData()
         ↓
    Search Filter
         ↓
    Apply Filters (Region, Gender, Age, Category, etc.)
         ↓
    Sort Results
         ↓
    Paginate (slice for current page)
         ↓
    Return { data, totalItems, totalPages }
         ↓
    Re-render UI Components
\`\`\`

---

## Folder Structure

\`\`\`
root/
├── app/
│   ├── layout.tsx           # Root layout, metadata, fonts
│   ├── page.tsx             # Home page entry
│   └── globals.css          # Tailwind CSS configuration
│
├── components/
│   ├── ui/                  # shadcn/ui base components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── table.tsx
│   │   ├── sheet.tsx
│   │   ├── checkbox.tsx
│   │   ├── slider.tsx
│   │   ├── popover.tsx
│   │   ├── calendar.tsx
│   │   └── ...
│   │
│   ├── sales-management.tsx # Main container
│   ├── search-bar.tsx       # Search component
│   ├── filter-panel.tsx     # Filter UI
│   ├── sorting-dropdown.tsx # Sort selector
│   ├── sales-table.tsx      # Data table
│   └── pagination-controls.tsx
│
├── lib/
│   ├── types.ts             # TypeScript interfaces
│   ├── sales-data.ts        # Dataset and utilities
│   ├── sales-service.ts     # Business logic
│   └── utils.ts             # Helper functions (cn)
│
├── docs/
│   └── architecture.md      # This document
│
├── README.md                # Project documentation
└── package.json             # Dependencies
\`\`\`

---

## Module Responsibilities

### `/lib/types.ts`
- Defines `SalesRecord` interface with all data attributes
- Defines `FilterState` for filter configuration
- Defines `SortOption` union type
- Defines `FilterOptions` for available filter values

### `/lib/sales-data.ts`
- Exports `salesData` array (500 sample records)
- Exports `getFilterOptions()` to extract unique filter values
- Generates realistic mock data matching assignment specifications

### `/lib/sales-service.ts`
- Exports `processSalesData()` main processing function
- Implements `searchRecords()` for text search
- Implements `filterRecords()` for multi-filter application
- Implements `sortRecords()` for sorting logic
- Implements `paginateRecords()` for pagination

### `/components/sales-management.tsx`
- Central state container for all application state
- Coordinates all child components
- Handles state updates and page reset logic
- Memoizes expensive computations

### `/components/search-bar.tsx`
- Controlled input with debounce (300ms)
- Calls parent handler on search change
- Shows clear button when query exists

### `/components/filter-panel.tsx`
- Slide-out sheet UI for filters
- Multi-select checkboxes for categorical filters
- Range slider for age filter
- Date range picker for date filter
- Clear all filters button

### `/components/sorting-dropdown.tsx`
- Dropdown select for sort options
- Options: Date, Quantity, Customer Name (ascending/descending)

### `/components/sales-table.tsx`
- Responsive table displaying sales records
- Shows all relevant fields per record
- Handles empty state with appropriate message

### `/components/pagination-controls.tsx`
- Previous/Next navigation buttons
- Current page and total pages display
- Items range display (e.g., "1-10 of 500")
- Disables buttons at boundaries

---

## Edge Cases Handled

1. **No Search Results:** Displays "No transactions found" message
2. **Conflicting Filters:** Gracefully returns empty results
3. **Invalid Numeric Ranges:** Validates age range inputs
4. **Large Filter Combinations:** Efficient processing with useMemo
5. **Missing Optional Fields:** Safe property access with fallbacks
6. **Page Beyond Range:** Clamps to valid page numbers
