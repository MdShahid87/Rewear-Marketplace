import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import { useAuth } from "../hooks/useAuth";
import AdminPage from "../pages/AdminPage";
import BrowsePage from "../pages/BrowsePage";
import ChatPage from "../pages/ChatPage";
import DashboardPage from "../pages/DashboardPage";
import ItemDetailPage from "../pages/ItemDetailPage";
import ListingFormPage from "../pages/ListingFormPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import SwapRequestsPage from "../pages/SwapRequestsPage";

function Shell() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function Protected() {
  const { user } = useAuth();
  const location = useLocation();
  if (!user)
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
}

function AdminOnly() {
  const { user } = useAuth();
  if (user?.role !== "admin") return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

function GuestOnly() {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route path="/" element={<Navigate to="/browse" replace />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/items/:id" element={<ItemDetailPage />} />
        <Route element={<GuestOnly />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<Protected />}>
          <Route path="/swaps" element={<SwapRequestsPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/:swapId" element={<ChatPage />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/listings/new" element={<ListingFormPage />} />
            <Route path="/listings/:id/edit" element={<ListingFormPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route element={<AdminOnly />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/browse" replace />} />
      </Route>
    </Routes>
  );
}
