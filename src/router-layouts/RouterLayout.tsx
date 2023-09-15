import { Navigate, Route, Routes } from "react-router-dom";
import AccountLayout from "./AccountLayout";
import ApplicationLayout from "./ApplicationLayout";
import EmptyLayout from "./EmptyLayout";
import AdminLayout from "./AdminLayout";

export default function RouterLayout() {
    return (
        <Routes>
            <Route path="*" element={<Navigate to="/account/*" />} />
            <Route path="/account/*" element={<AccountLayout />} />
            <Route path="/admin/*" element={<AdminLayout />} />
            <Route path="/application/*" element={<ApplicationLayout />} />
            <Route path="/empty/*" element={<EmptyLayout />} />
            {/* Fallback route for unmatched paths */}
            <Route path="*" element={<Navigate to="/application/*" />} />
        </Routes>
    );
}