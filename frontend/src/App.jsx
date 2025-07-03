import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Navbar from "./components/Navbar";
import Add from "./pages/Add";
import Admin from "./pages/Admin";
import KitchenManager from "./pages/KitchenManager";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Unauthorized from "./pages/Unauthorized";
import MenuPage from "./pages/waiter-page/MenuPage";
import NewOrder from "./pages/waiter-page/NewOrder";
import OrdersPage from "./pages/waiter-page/OrdersPage";
import TableView from "./pages/waiter-page/TableView";
import WaiterDashboard from "./pages/waiter-page/WaiterDashboard";
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

function App() {
  const { user } = useAuthContext();
  const restaurantId = user?.RID; // ✅ safer with optional chaining

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={
                !user ? <Login /> : <Navigate to={user.role === "waiter" ? "/waiter" : `/${restaurantId}`} replace />
              }
            />
            <Route
              path="/signup"
              element={
                !user ? (
                  <Signup />
                ) : (
                  <Navigate to={user.role === "waiter" ? "/waiter" : `/${restaurantId}`} replace />
                )
              }
            />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected routes with role-based access */}
            <Route
                  path="/waiter"
                  element={
                    <ProtectedRoute allowedRoles={["waiter"]}>
                      <WaiterDashboard />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<OrdersPage />} />
                  <Route path="menu" element={<MenuPage />} />
                  <Route path="tables" element={<TableView />} />
                  <Route path="place-order" element={<NewOrder />} />
            </Route>
            <Route
              path="/:restaurantId"
              element={
                <ProtectedRoute allowedRoles={["admin", "km"]}>
                  {user?.role === "admin" && <Admin />}
                  {user?.role === "km" && <KitchenManager />}
                </ProtectedRoute>
              }
            />

            <Route
              path="/:restaurantId/add"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Add />
                </ProtectedRoute>
              }
            />

            {/* 404 fallback */}
            <Route
              path="*"
              element={
                user ? (
                  <Navigate to={user.role === "waiter" ? "/waiter" : `/${restaurantId}`} replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;