import './App.css'
import Chat from './pages/chat';
import { Navigate, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import ProtectedRoute from './modules/ProtectedRoute';
import Login from './pages/login';

function App() {
  return (
    <Routes>
      <Route path="/index.html" element={<Navigate to="/" replace />} />
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />}/>
      <Route element={<ProtectedRoute />}>
        <Route path='/protected' element={<Chat />} />
      </Route>
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
)
}

export default App;