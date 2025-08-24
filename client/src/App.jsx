import {BrowserRouter,Routes,Route} from "react-router-dom";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Service } from "./pages/Service";
import { Navbar } from "./components/Navbar";
import { Error } from "./pages/Error";
import { Footer } from "./components/Footer/Footer";
import { Logout } from "./pages/Logout";
import { AdminLayout } from "./components/layouts/Admin-Layout";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminContacts } from "./pages/Admin-Contacts";
import { AdminUpdate } from "./pages/Admin-Update";

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/service" element={<Service />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/contact" element={<Contact />}/>
      <Route path="/logout" element={<Logout />}/>
      <Route path="*" element={<Error />}/>

      {/* Nested Route */}
      <Route path="/admin" element={<AdminLayout />}>
      <Route path="users" element={<AdminUsers />}/>
      <Route path="contacts" element={<AdminContacts />}/>
      <Route path="users/:id/edit" element={<AdminUpdate />}/>
      </Route>
    </Routes>
    <Footer />
    </BrowserRouter>
    </>
  );
};

export default App;