import { Navigate, Route, Routes } from "react-router-dom";
import RegisterConsentPage from "../pages/ConsentFormPages/RegisterFormPage";

export default function EmptyLayout(){
    return(
        <div>
            <Routes>
                <Route path="*" element={<Navigate to="/empty/registerConsentPage" />} />
                <Route path="/registerConsentPage" element={<RegisterConsentPage />} />
                {/* Fallback route for unmatched paths */}
                <Route path="/registerConsentPage" element={<Navigate to="/empty/registerConsentPage" />} />
            </Routes>
        </div>
    );
}