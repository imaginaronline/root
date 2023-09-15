import { Navigate, Route, Routes } from "react-router-dom";
import PasswordLogin from "../pages/account/LoginPage";
import PhoneNumberLogin from "../pages/account/PhoneNumberLogin";
import SignUpPage from "../pages/account/SignUpPage";

export default function AccountLayout() {
    return (
        <div>
            <Routes>
                <Route path="*" element={<Navigate to="/account/login" />} />
                <Route path="/login" element={<PasswordLogin />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/mobileLogin" element={<PhoneNumberLogin />} />
            </Routes>
        </div>
    );
}