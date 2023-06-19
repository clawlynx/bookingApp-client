import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./pages/AccountPage";
import EditPlacePage from "./pages/EditPlacePage";
import AddPlace from "./pages/AddplacePage";
import SinglePlace from "./pages/SinglePlace";
import BookingsPage from "./pages/BookingsPage";
import BookingSinglePage from "./pages/BookingSinglePage";
import SearchedPage from "./pages/SearchedPage";
axios.defaults.baseURL = "https://bookingapp-api-780h.onrender.com";
axios.defaults.withCredentials = true; //for using jwt with axios

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account/:subpage?" element={<AccountPage />} />
            <Route path="/account/places/new" element={<AddPlace />} />
            <Route path="/account/places/:id" element={<EditPlacePage />} />
            <Route path="/home/:id" element={<SinglePlace />} />
            <Route path="/account/bookings" element={<BookingsPage />} />
            <Route
              path="/account/bookings/:placeid"
              element={<BookingSinglePage />}
            />
            <Route path="search/:searched" element={<SearchedPage />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
