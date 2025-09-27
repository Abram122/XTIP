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
import RequireAuth from "./components/RequireAuth";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Incidents from "./pages/Incidents";
import MarketingPage from "./pages/MarketingPage"; 

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

          {/* Protected Pages */}
          <Route
            path="/overview"
            element={
              <Layout>
                <RequireAuth>
                  <Overview />
                </RequireAuth>
              </Layout>
            }
          />
          <Route
            path="/feeds"
            element={
              <Layout>
                <RequireAuth>
                  <Feeds />
                </RequireAuth>
              </Layout>
            }
          />
          <Route
            path="/analytics"
            element={
              <Layout>
                <RequireAuth>
                  <Analytics />
                </RequireAuth>
              </Layout>
            }
          />
          <Route
            path="/alerts"
            element={
              <Layout>
                <RequireAuth>
                  <Alerts />
                </RequireAuth>
              </Layout>
            }
          />
          <Route
            path="/incidents"
            element={
              <Layout>
                <RequireAuth>
                  <Incidents />
                </RequireAuth>
              </Layout>
            }
          />
          <Route
            path="/settings"
            element={
              <Layout>
                <RequireAuth>
                  <Settings />
                </RequireAuth>
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              </Layout>
            }
          />

          {/* Auth Routes */}
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
