import { useState } from "react";
import { Layout } from "../components/Layout";
import { SeedPlanTable } from "../components/SeedPlanTable";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { TrendingUp, TrendingDown, Users, Package } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  products: string[];
  previousYearUnits: number;
  currentYearUnits: number;
}

const initialCustomers: Customer[] = [
  {
    id: "1",
    name: "Green Valley Farms",
    products: ["Corn Seed", "Soybean", "Wheat"],
    previousYearUnits: 15420,
    currentYearUnits: 16800,
  },
  {
    id: "2",
    name: "Midwest Agricultural Co.",
    products: ["Corn Seed", "Sunflower"],
    previousYearUnits: 12350,
    currentYearUnits: 11200,
  },
  {
    id: "3",
    name: "Prairie Fields LLC",
    products: ["Soybean", "Wheat", "Barley"],
    previousYearUnits: 8750,
    currentYearUnits: 9250,
  },
  {
    id: "4",
    name: "Horizon Crop Solutions",
    products: ["Corn Seed", "Soybean", "Canola"],
    previousYearUnits: 18900,
    currentYearUnits: 20500,
  },
  {
    id: "5",
    name: "Golden Harvest Enterprises",
    products: ["Wheat", "Barley"],
    previousYearUnits: 6200,
    currentYearUnits: 7100,
  },
  {
    id: "6",
    name: "Central Plains Agriculture",
    products: ["Corn Seed", "Soybean", "Wheat", "Sunflower"],
    previousYearUnits: 22100,
    currentYearUnits: 23800,
  },
  {
    id: "7",
    name: "Riverdale Farming Group",
    products: ["Soybean", "Canola"],
    previousYearUnits: 4850,
    currentYearUnits: 4200,
  },
  {
    id: "8",
    name: "Continental Seed Partners",
    products: ["Corn Seed", "Wheat", "Barley"],
    previousYearUnits: 14600,
    currentYearUnits: 15900,
  },
  {
    id: "9",
    name: "Summit Agricultural Holdings",
    products: ["Soybean", "Sunflower", "Canola"],
    previousYearUnits: 10300,
    currentYearUnits: 9850,
  },
  {
    id: "10",
    name: "Heartland Crop Distributors",
    products: ["Corn Seed", "Soybean", "Wheat"],
    previousYearUnits: 16750,
    currentYearUnits: 18200,
  },
];

export default function Dashboard() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);

  const handleUpdateUnits = (customerId: string, newUnits: number) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === customerId
          ? { ...customer, currentYearUnits: newUnits }
          : customer,
      ),
    );
  };

  const totalCurrentUnits = customers.reduce(
    (sum, c) => sum + c.currentYearUnits,
    0,
  );
  const totalPreviousUnits = customers.reduce(
    (sum, c) => sum + c.previousYearUnits,
    0,
  );
  const totalVariance = totalCurrentUnits - totalPreviousUnits;
  const variancePercentage =
    totalPreviousUnits > 0 ? (totalVariance / totalPreviousUnits) * 100 : 0;

  const uniqueProducts = Array.from(
    new Set(customers.flatMap((c) => c.products)),
  );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Customers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.length}</div>
              <p className="text-xs text-muted-foreground">Active accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Product Lines
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueProducts.length}</div>
              <p className="text-xs text-muted-foreground">Seed varieties</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Units
              </CardTitle>
              {totalVariance >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalCurrentUnits.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {totalVariance >= 0 ? "+" : ""}
                {totalVariance.toLocaleString()} from last year
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              {variancePercentage >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${
                  variancePercentage >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {variancePercentage >= 0 ? "+" : ""}
                {variancePercentage.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">Year-over-year</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            <Button
              variant="default"
              className="bg-brand-600 hover:bg-brand-700"
            >
              Save Plan
            </Button>
            <Button variant="outline">Export Data</Button>
            <Button variant="outline">Import Updates</Button>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Auto-saved 2 min ago
            </Badge>
          </div>
        </div>

        {/* Main Data Table */}
        <SeedPlanTable
          customers={customers}
          onUpdateUnits={handleUpdateUnits}
        />
      </div>
    </Layout>
  );
}
