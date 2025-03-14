
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuditsList from "./pages/audits/AuditsList";
import AuditDetail from "./pages/audits/AuditDetail";
import CreateAudit from "./pages/audits/CreateAudit";
import AuditorsList from "./pages/auditors/AuditorsList";
import Login from "./pages/Login";
import { useEffect } from "react";
import { connectToDatabase } from "./lib/mongodb";

// Initialize QueryClient for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const App = () => {
  // Connect to MongoDB on app startup
  useEffect(() => {
    const initMongoDB = async () => {
      try {
        await connectToDatabase();
      } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
      }
    };
    
    initMongoDB();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Index />} />
            <Route path="/audits" element={<AuditsList />} />
            <Route path="/audits/:id" element={<AuditDetail />} />
            <Route path="/audits/new" element={<CreateAudit />} />
            <Route path="/audits/edit/:id" element={<AuditDetail />} />
            <Route path="/auditors" element={<AuditorsList />} />
            {/* We'll add these routes as we implement them */}
            {/* <Route path="/auditors/:id" element={<AuditorDetail />} />
            <Route path="/auditors/new" element={<CreateAuditor />} />
            <Route path="/auditors/edit/:id" element={<EditAuditor />} /> */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
