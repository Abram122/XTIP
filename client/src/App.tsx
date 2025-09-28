import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Overview from "./pages/Overview";
import Feeds from "./pages/Feeds";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import EmailVerification from "./pages/EmailVerification";
import LoginPage from "./pages/LoginPage";
import RequireAuth from "./components/RequireAuth";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Incidents from "./pages/Incidents";
import MarketingPage from "./pages/MarketingPage";
import { NewsPage } from "./pages/NewsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<MarketingPage />} />

          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login-form" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/verify-email" element={<EmailVerification />} />

          {/* Protected routes */}
          <Route
            path="/overview"
            element={
              <RequireAuth>
                <Layout>
                  <Overview />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/feeds"
            element={
              <RequireAuth>
                <Layout>
                  <Feeds />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/analytics"
            element={
              <RequireAuth>
                <Layout>
                  <Analytics />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/alerts"
            element={
              <RequireAuth>
                <Layout>
                  <Alerts />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/incidents"
            element={
              <RequireAuth>
                <Layout>
                  <Incidents />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/news"
            element={
              <RequireAuth>
                <Layout>
                  <NewsPage />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/settings"
            element={
              <RequireAuth>
                <Layout>
                  <Settings />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Layout>
                  <Profile />
                </Layout>
              </RequireAuth>
            }
          />

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
