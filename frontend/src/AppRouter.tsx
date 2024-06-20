import { Routes, Route } from "react-router-dom";
import { ExerciseListPage } from "./pages/ExerciseListPage";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { LogoutPage } from "./pages/LogoutPage";
import { SignupPage } from "./pages/SignupPage";
import { CreateWorkoutSessionPage } from "./pages/WorkoutSessionPage";
import { IsLoggedIn, IsNotLoggedIn } from "./components/LoggedIn";

export default () => {
    return <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exercises" element={<ExerciseListPage />} />
        <Route path="/login" element={<IsNotLoggedIn><LoginPage /></IsNotLoggedIn>} />
        <Route path="/logout" element={<IsLoggedIn><LogoutPage /></IsLoggedIn>} />
        <Route path="/signup" element={<IsNotLoggedIn><SignupPage /></IsNotLoggedIn>} />
        <Route path="/session" element={<IsLoggedIn><CreateWorkoutSessionPage /></IsLoggedIn>} />
    </Routes>
}