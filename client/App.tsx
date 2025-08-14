import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DeliveryPage from "./pages/DeliveryPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/op-plan"
            element={
              <PlaceholderPage
                title="Operational Plan"
                description="Configure and manage operational planning workflows"
              />
            }
          />
          <Route
            path="/discounts"
            element={
              <PlaceholderPage
                title="Discounts Management"
                description="Set up customer discounts and pricing strategies"
              />
            }
          />
          <Route
            path="/invoice"
            element={
              <PlaceholderPage
                title="Invoicing"
                description="Generate and manage customer invoices"
              />
            }
          />
          <Route
            path="/pay"
            element={
              <PlaceholderPage
                title="Payment Processing"
                description="Track payments and financial transactions"
              />
            }
          />
          <Route path="/deliver" element={<DeliveryPage />} />
          <Route
            path="/settle"
            element={
              <PlaceholderPage
                title="Settlement"
                description="Complete order settlements and reconciliation"
              />
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
