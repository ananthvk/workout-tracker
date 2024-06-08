import { Routes, Route } from "react-router-dom";
import { ExerciseListPage } from "./pages/ExerciseListPage";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { LogoutPage } from "./pages/LogoutPage";

export default () => {
    return <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exercises" element={<ExerciseListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
    </Routes>
}