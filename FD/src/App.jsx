import UserForm from "./components/UserForm";
import AddUser from "./pages/AddUser";
import { BrowserRouter, Route, Routes } from "react-router";
import UpdateUser from "./pages/UpdateUser";
import UserList from "./pages/UserList";
import PositionDemo from "./PositionDemo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/AddUser" element={<AddUser />} />
        <Route path="/UpdateUser/:name/:email/:id" element={<UpdateUser />} />
        <Route path="/UserForm" element={<UserForm />} />
      </Routes>
    </BrowserRouter>
    // <PositionDemo />
  );
}

export default App;
