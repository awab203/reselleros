import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import CinematicOnboardingSetup from "pages/cinematic-onboarding-setup";
import ModularDashboardControlCenter from "pages/modular-dashboard-control-center";
import ProfitAnalyticsFinancialDashboard from "pages/profit-analytics-financial-dashboard";
import SourcingHaulManagement from "pages/sourcing-haul-management";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<CinematicOnboardingSetup />} />
          <Route path="/cinematic-onboarding-setup" element={<CinematicOnboardingSetup />} />
          <Route path="/modular-dashboard-control-center" element={<ModularDashboardControlCenter />} />
          <Route path="/profit-analytics-financial-dashboard" element={<ProfitAnalyticsFinancialDashboard />} />
          <Route path="/sourcing-haul-management" element={<SourcingHaulManagement />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;