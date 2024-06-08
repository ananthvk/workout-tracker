import { Routes, Route } from "react-router-dom";
import ExerciseListPage from "./pages/ExerciseListPage";
import HomePage from "./pages/HomePage";

export default () => {
    return <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exercises" element={<ExerciseListPage />} />
    </Routes>
}