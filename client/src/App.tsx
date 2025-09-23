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
import  SignupForm  from "./components/SignupForm";
import  LoginForm  from "./components/LoginForm";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Overview />
              </Layout>
            }
          />
          <Route
            path="/feeds"
            element={
              <Layout>
                <Feeds />
              </Layout>
            }
          />
          <Route
            path="/analytics"
            element={
              <Layout>
                <Analytics />
              </Layout>
            }
          />
          <Route
            path="/alerts"
            element={
              <Layout>
                <Alerts />
              </Layout>
            }
          />
          <Route
            path="/settings"
            element={
              <Layout>
                <Settings />
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
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
