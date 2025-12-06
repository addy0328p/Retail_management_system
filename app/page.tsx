import { Suspense } from "react"
import SalesManagement from "@/components/sales-management"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <SalesManagement />
      </Suspense>
    </main>
  )
}
