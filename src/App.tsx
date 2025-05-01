
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuditsList from "./pages/audits/AuditsList";
import AuditDetail from "./pages/audits/AuditDetail";
import CreateAudit from "./pages/audits/CreateAudit";
import EditAudit from "./pages/audits/EditAudit";
import NonCompliancePreview from "./pages/audits/NonCompliancePreview";
import AuditsInReviewPage from "./pages/audits/AuditsInReviewPage";
import AuditReviewPage from "./pages/audits/AuditReviewPage";
import AuditPerformedPage from "./pages/audits/AuditPerformedPage";
import AuditorsList from "./pages/auditors/AuditorsList";
import ReportsList from "./pages/reports/ReportsList";
import SettingsPage from "./pages/settings/SettingsPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import Login from "./pages/Login";

// Mobile PWA Routes
import MobileIndex from "./pages/mobile/Index";
import MobileAuditsList from "./pages/mobile/AuditsList";
import MobileAuditDetail from "./pages/mobile/AuditDetail";
import MobileNonCompliancePreview from "./pages/mobile/NonCompliancePreview";
import MobileProfile from "./pages/mobile/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Desktop Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Index />} />
          <Route path="/audits" element={<AuditsList />} />
          <Route path="/audits/:id" element={<AuditDetail />} />
          <Route path="/audits/new" element={<CreateAudit />} />
          <Route path="/audits/edit/:id" element={<EditAudit />} />
          <Route path="/audits/:id/non-compliance" element={<NonCompliancePreview />} />
          <Route path="/audits/in-review" element={<AuditsInReviewPage />} />
          <Route path="/audits/review/:id" element={<AuditReviewPage />} />
          <Route path="/audits/performed/:id" element={<AuditPerformedPage />} />

          <Route path="/auditors" element={<AuditorsList />} />
          <Route path="/reports" element={<ReportsList />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* Mobile PWA Routes */}
          <Route path="/mobile" element={<MobileIndex />} />
          <Route path="/mobile/audits" element={<MobileAuditsList />} />
          <Route path="/mobile/audits/:id" element={<MobileAuditDetail />} />
          <Route path="/mobile/audits/:id/non-compliance" element={<MobileNonCompliancePreview />} />
          <Route path="/mobile/profile" element={<MobileProfile />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
