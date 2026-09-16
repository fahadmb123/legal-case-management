import { Route, Routes, Navigate } from "react-router-dom";
import {lazy} from "react"
import { ProtectedRoute } from "../components/routing/ProtectedRoute";
import { PublicRoute } from "../components/routing/PublicRoute";

const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/ResetPassword/ResetPassword"));
const VerifyRegistration = lazy(() => import("../pages/VerifyRegistration/VerifyRegistration"));
const Layout = lazy(() => import("../components/Layout/Layout"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Clients = lazy(() => import("../pages/Clients/Clients"));
const AddClient = lazy(() => import("../pages/Clients/AddClient"));
const ClientDetails = lazy(() => import("../pages/Clients/ClientDetails"));
const CaseDetails = lazy(() => import("../pages/Cases/CaseDetails"));
const Hearings = lazy(() => import("../pages/Hearings/Hearings"));
const Settings = lazy(() => import("../pages/Settings/Settings"));

function AppRoutes() {
    return (
        <Routes>
            {/* Public/Auth Routes - Only accessible when NOT logged in */}
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-registration" element={<VerifyRegistration />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            {/* Protected Routes - Only accessible when logged in */}
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="clients" element={<Clients />} />
                    <Route path="clients/add" element={<AddClient />} />
                    <Route path="add-client" element={<AddClient />} />
                    <Route path="clients/:clientId" element={<ClientDetails />} />
                    <Route path="client-details" element={<ClientDetails />} />
                    <Route path="cases" element={<CaseDetails />} />
                    <Route path="cases/:caseId" element={<CaseDetails />} />
                    <Route path="hearings" element={<Hearings />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default AppRoutes;