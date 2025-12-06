"use client"

import type { SalesRecord } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import { Package, Calendar, CreditCard, MapPin } from "lucide-react"

interface SalesTableProps {
  records: SalesRecord[]
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    case "processing":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "shipped":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }
}

export default function SalesTable({ records }: SalesTableProps) {
  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">No results found</h3>
        <p className="text-sm text-muted-foreground text-center max-w-sm">
          Try adjusting your search or filter criteria to find what you're looking for.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Transaction ID</TableHead>
            <TableHead className="font-semibold">Customer</TableHead>
            <TableHead className="font-semibold">Product</TableHead>
            <TableHead className="font-semibold text-center">Qty</TableHead>
            <TableHead className="font-semibold text-right">Amount</TableHead>
            <TableHead className="font-semibold">Payment</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id} className="hover:bg-muted/30 transition-colors">
              <TableCell className="font-mono text-sm font-medium">{record.id}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">{record.customerName}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {record.customerRegion} • {record.gender}, {record.age}y
                  </span>
                  <span className="text-xs text-muted-foreground">{record.phoneNumber}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{record.productName}</span>
                  <span className="text-xs text-muted-foreground">
                    {record.brand} • {record.productCategory}
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {record.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs px-1.5 py-0">
                        {tag}
                      </Badge>
                    ))}
                    {record.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs px-1.5 py-0">
                        +{record.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center font-medium">{record.quantity}</TableCell>
              <TableCell className="text-right">
                <div className="flex flex-col items-end">
                  <span className="font-semibold text-foreground">{formatCurrency(record.finalAmount)}</span>
                  {record.discountPercentage > 0 && (
                    <span className="text-xs text-muted-foreground line-through">
                      {formatCurrency(record.totalAmount)}
                    </span>
                  )}
                  {record.discountPercentage > 0 && (
                    <Badge variant="secondary" className="text-xs mt-0.5">
                      {record.discountPercentage}% OFF
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5">
                  <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-sm">{record.paymentMethod}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(record.orderStatus)} variant="secondary">
                  {record.orderStatus}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {format(new Date(record.date), "MMM dd, yyyy")}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
