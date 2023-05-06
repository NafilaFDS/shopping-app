import Layout from './components/layout'
import Items from './pages/Items';
import Login from './pages/Login'
import 'bootstrap/dist/css/bootstrap.css';
import { Navigate, Route, Routes } from "react-router-dom"
import Users from './pages/Users';

const ProtectedRoute = ({
  token,
  redirectPath = '/login',
  children,
}) => {
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

function App() {
  const token = localStorage.getItem("token")
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/' element={
          <ProtectedRoute token={token}>
            <Layout />
          </ProtectedRoute>}
        >
          <Route path='items' element={<Items />} />
          <Route path='users' element={<Users />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
