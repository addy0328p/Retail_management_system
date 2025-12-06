# Retail Sales Management System

## Overview

The Retail Sales Management System is a fully functional web application built as part of the TruEstate SDE Intern assignment. It focuses on delivering clean, modular, and scalable front-end architecture with seamless integration of Search, Filtering, Sorting, and Pagination. The project highlights practical UI engineering skills and efficient client‑side data handling.

## Tech Stack

* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4
* **UI Library:** shadcn/ui (Radix UI)
* **State Management:** React Hooks (useState, useMemo, useCallback)
* **Icons:** Lucide React
* **Deployment:** Vercel

## Search Implementation Summary

* Supports full‑text search on **Customer Name** and **Phone Number**.
* **Case‑insensitive** matching ensures consistent and predictable results.
* Uses **300ms debounce** to avoid unnecessary re-renders while typing.
* Works in combination with active filters and sorting.
* Resets pagination to page 1 whenever the search query changes.

## Filter Implementation Summary

Filtering system supports multiple independent and combined filters:

* **Customer Region:** Multi-select dropdown
* **Gender:** Multi-select (Male/Female)
* **Age Range:** Range slider (min–max)
* **Product Category:** Multi-select dropdown
* **Tags:** Multi-select
* **Payment Method:** Multi-select (UPI, Cash, Card, etc.)
* **Date Range:** Start and end date selection

### Additional Filter Features

* All filters work individually or in combination.
* UI shows the count of active filters.
* "Clear All Filters" feature resets all filters in one click.
* Search, sorting, and pagination states remain preserved.
* Pagination resets upon any filter update.

## Sorting Implementation Summary

Sorting is implemented with support for:

* **Date:** Newest → Oldest / Oldest → Newest
* **Quantity:** High → Low / Low → High
* **Customer Name:** A → Z / Z → A

### Sorting Features

* Single-select dropdown for selecting sort order.
* Default sorting is **Date (Newest First)**.
* Preserves active search and filter state.
* Pagination resets whenever sorting changes.

## Pagination Implementation Summary

* **Page Size:** 10 records per page
* Previous/Next navigation with disabled boundary controls
* Displays range and total items (e.g., *1–10 of 500*)
* Maintains search, filter, and sorting state across page navigation
* Handles edge cases gracefully (first/last page)

## Setup Instructions

### Prerequisites

* Node.js 18+
* npm or yarn

### Installation Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd retail-sales-management
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open the app at:
   **[http://localhost:3000](http://localhost:3000)**

### Build for Production

```bash
npm run build
npm start
```

### Deployment

To deploy on Vercel:

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Deploy using default Next.js settings.
