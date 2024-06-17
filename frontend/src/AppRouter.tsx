import { Routes, Route } from "react-router-dom";
import { ExerciseListPage } from "./pages/ExerciseListPage";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { LogoutPage } from "./pages/LogoutPage";
import { SignupPage } from "./pages/SignupPage";

export default () => {
    return <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exercises" element={<ExerciseListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/signup" element={<SignupPage />} />
    </Routes>
}