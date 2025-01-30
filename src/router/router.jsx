import { Routes, Route } from "react-router-dom";
import UserForm from "../pages/UserForm";
import SuccessPage from "../pages/SuccessPage";

function Router() {
  return (
    <Routes>
      <Route index path="/" element={<UserForm />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  );
}

export default Router;
