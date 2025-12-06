# Retail Sales Management System

## Overview

A comprehensive Retail Sales Management System built for the TruEstate SDE Intern Assignment. This application demonstrates essential software engineering capabilities with advanced Search, Filtering, Sorting, and Pagination functionalities. The system is designed with clean, maintainable, and modular architecture following professional coding standards.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui (Radix UI primitives)
- **State Management:** React Hooks (useState, useMemo, useCallback)
- **Icons:** Lucide React
- **Deployment:** Vercel

## Search Implementation Summary

The search functionality provides full-text search across Customer Name and Phone Number fields:

- **Case-insensitive matching:** All searches are performed in lowercase for consistent results
- **Debounced input:** 300ms debounce prevents excessive re-renders during typing
- **Multi-field search:** Searches across both Customer Name and Phone Number simultaneously
- **State preservation:** Search state is maintained alongside active filters and sorting
- **Reset on change:** Pagination resets to page 1 when search query changes

## Filter Implementation Summary

Multi-select and range-based filtering is implemented for the following fields:

- **Customer Region:** Multi-select dropdown with all available regions
- **Gender:** Multi-select filter (Male/Female)
- **Age Range:** Slider-based range filter with min/max values
- **Product Category:** Multi-select dropdown for product categories
- **Tags:** Multi-select filter for product tags
- **Payment Method:** Multi-select dropdown (Credit Card, Debit Card, Cash, UPI, etc.)
- **Date Range:** Date picker for start and end date filtering

**Filter Features:**
- Filters work independently and in combination
- All filter states are preserved alongside search and sorting
- Clear all filters button for quick reset
- Active filter count displayed in UI
- Pagination resets when filters change

## Sorting Implementation Summary

Sorting is implemented for the following fields with preservation of active search and filters:

- **Date (Newest First / Oldest First):** Sorts by transaction date
- **Quantity (High to Low / Low to High):** Sorts by quantity sold
- **Customer Name (A-Z / Z-A):** Alphabetical sorting by customer name

**Sorting Features:**
- Single-select dropdown for sort option
- Default sort: Date (Newest First)
- Preserves active search query and all filters
- Pagination resets when sort option changes

## Pagination Implementation Summary

Pagination is implemented with the following specifications:

- **Page Size:** 10 items per page
- **Navigation:** Previous/Next buttons with page number display
- **State Preservation:** Retains active search, filter, and sort states across page changes
- **Edge Handling:** Disabled buttons when on first/last page
- **Total Display:** Shows current range and total items (e.g., "1-10 of 500")

## Setup Instructions

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone <repository-url>
   cd retail-sales-management
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

### Deployment

The application is deployed on Vercel. To deploy your own instance:

1. Push the code to a GitHub repository
2. Connect the repository to Vercel
3. Deploy with default Next.js settings
