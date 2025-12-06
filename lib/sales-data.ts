import type { SalesRecord, FilterOptions } from "./types"

// Generate comprehensive sample data based on the assignment requirements
const regions = ["North", "South", "East", "West", "Central"]
const genders = ["Male", "Female", "Other"]
const categories = ["Electronics", "Clothing", "Home & Garden", "Sports", "Books", "Beauty", "Food & Beverages", "Toys"]
const paymentMethods = ["Credit Card", "Debit Card", "Cash", "UPI", "Net Banking", "Wallet"]
const orderStatuses = ["Completed", "Pending", "Cancelled", "Processing", "Shipped"]
const deliveryTypes = ["Standard", "Express", "Same Day", "Pickup"]
const productTags = [
  "Bestseller",
  "New Arrival",
  "Sale",
  "Premium",
  "Eco-Friendly",
  "Limited Edition",
  "Trending",
  "Budget",
]
const customerTypes = ["Regular", "Premium", "VIP", "New"]
const brands = [
  "Apple",
  "Samsung",
  "Nike",
  "Adidas",
  "Sony",
  "LG",
  "Puma",
  "Reebok",
  "Dell",
  "HP",
  "Lenovo",
  "Zara",
  "H&M",
  "Uniqlo",
]

const firstNames = [
  "Rahul",
  "Priya",
  "Amit",
  "Sneha",
  "Vikram",
  "Anita",
  "Rajesh",
  "Pooja",
  "Suresh",
  "Kavita",
  "Arjun",
  "Meera",
  "Deepak",
  "Nisha",
  "Karan",
  "Ritu",
  "Anil",
  "Sunita",
  "Manoj",
  "Geeta",
  "Rohit",
  "Sita",
  "Vijay",
  "Lakshmi",
  "Sanjay",
  "Rekha",
  "Nitin",
  "Anjali",
  "Prakash",
  "Divya",
]
const lastNames = [
  "Sharma",
  "Verma",
  "Patel",
  "Gupta",
  "Singh",
  "Kumar",
  "Joshi",
  "Reddy",
  "Nair",
  "Iyer",
  "Menon",
  "Das",
  "Roy",
  "Bose",
  "Chatterjee",
  "Banerjee",
  "Mukherjee",
  "Kapoor",
  "Malhotra",
  "Khanna",
  "Mehta",
  "Shah",
  "Jain",
  "Agarwal",
  "Mishra",
]
const products = [
  "Smartphone",
  "Laptop",
  "Tablet",
  "Headphones",
  "Smart Watch",
  "Camera",
  "Speaker",
  "Monitor",
  "T-Shirt",
  "Jeans",
  "Dress",
  "Jacket",
  "Sneakers",
  "Sandals",
  "Hat",
  "Sunglasses",
  "Sofa",
  "Table Lamp",
  "Rug",
  "Curtains",
  "Plant Pot",
  "Wall Art",
  "Football",
  "Basketball",
  "Yoga Mat",
  "Dumbbell",
  "Running Shoes",
  "Sports Bag",
  "Novel",
  "Cookbook",
  "Self-Help Book",
  "Magazine",
  "Comic Book",
  "Lipstick",
  "Perfume",
  "Face Cream",
  "Shampoo",
  "Hair Dryer",
  "Chocolate",
  "Coffee",
  "Tea",
  "Snacks",
  "Protein Bar",
  "Board Game",
  "Puzzle",
  "Action Figure",
  "Doll",
  "Building Blocks",
]
const storeLocations = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
]

function randomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return date.toISOString().split("T")[0]
}

function randomPhone(): string {
  return `+91 ${Math.floor(7000000000 + Math.random() * 3000000000)}`
}

function generateSalesData(count: number): SalesRecord[] {
  const data: SalesRecord[] = []
  const startDate = new Date("2024-01-01")
  const endDate = new Date("2025-12-06")

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const product = products[Math.floor(Math.random() * products.length)]
    const brand = brands[Math.floor(Math.random() * brands.length)]
    const quantity = Math.floor(Math.random() * 10) + 1
    const pricePerUnit = Math.floor(Math.random() * 50000) + 100
    const discountPercentage = Math.floor(Math.random() * 40)
    const totalAmount = quantity * pricePerUnit
    const finalAmount = totalAmount - (totalAmount * discountPercentage) / 100

    // Assign 1-3 random tags
    const numTags = Math.floor(Math.random() * 3) + 1
    const shuffledTags = [...productTags].sort(() => Math.random() - 0.5)
    const selectedTags = shuffledTags.slice(0, numTags)

    data.push({
      id: `TXN${String(i + 1).padStart(6, "0")}`,
      customerId: `CUST${String(Math.floor(Math.random() * 10000) + 1).padStart(5, "0")}`,
      customerName: `${firstName} ${lastName}`,
      phoneNumber: randomPhone(),
      gender: genders[Math.floor(Math.random() * genders.length)],
      age: Math.floor(Math.random() * 60) + 18,
      customerRegion: regions[Math.floor(Math.random() * regions.length)],
      customerType: customerTypes[Math.floor(Math.random() * customerTypes.length)],
      productId: `PROD${String(Math.floor(Math.random() * 1000) + 1).padStart(4, "0")}`,
      productName: product,
      brand: brand,
      productCategory: categories[Math.floor(Math.random() * categories.length)],
      tags: selectedTags,
      quantity: quantity,
      pricePerUnit: pricePerUnit,
      discountPercentage: discountPercentage,
      totalAmount: totalAmount,
      finalAmount: Math.round(finalAmount * 100) / 100,
      date: randomDate(startDate, endDate),
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      orderStatus: orderStatuses[Math.floor(Math.random() * orderStatuses.length)],
      deliveryType: deliveryTypes[Math.floor(Math.random() * deliveryTypes.length)],
      storeId: `STORE${String(Math.floor(Math.random() * 50) + 1).padStart(3, "0")}`,
      storeLocation: storeLocations[Math.floor(Math.random() * storeLocations.length)],
      salespersonId: `EMP${String(Math.floor(Math.random() * 200) + 1).padStart(4, "0")}`,
      employeeName: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
    })
  }

  return data
}

// Generate 500 records for demonstration
export const salesData: SalesRecord[] = generateSalesData(500)

// Extract unique filter options from data
export function getFilterOptions(): FilterOptions {
  const ages = salesData.map((d) => d.age)
  return {
    regions: [...new Set(salesData.map((d) => d.customerRegion))].sort(),
    genders: [...new Set(salesData.map((d) => d.gender))].sort(),
    categories: [...new Set(salesData.map((d) => d.productCategory))].sort(),
    tags: [...new Set(salesData.flatMap((d) => d.tags))].sort(),
    paymentMethods: [...new Set(salesData.map((d) => d.paymentMethod))].sort(),
    ageRange: { min: Math.min(...ages), max: Math.max(...ages) },
  }
}
