import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Layout from "../components/Layout/Layout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Clients from "../pages/Clients/Clients";
import ClientDetails from "../pages/Clients/ClientDetails";
import CaseDetails from "../pages/Cases/CaseDetails";
import Hearings from "../pages/Hearings/Hearings";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="clients" element={<Clients />} />
                <Route path="clients/:clientId" element={<ClientDetails />} />
                <Route path="client-details" element={<ClientDetails />} />
                <Route path="cases" element={<CaseDetails />} />
                <Route path="cases/:caseId" element={<CaseDetails />} />
                <Route path="hearings" element={<Hearings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;