import { useState } from "react";
import {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../services/userApi";
import { toast } from "react-toastify";

import { Button } from 'primereact/button';
        
import { InputText } from 'primereact/inputtext';
        

function Crud() {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const { data: users = [] } = useGetUsersQuery();
  const [addUser] = useAddUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const handleSubmit = async () => {
    await addUser({ name: inputName, email: inputEmail + "@gmail.com" });
    setInputName("");
    setInputEmail("");
  };
 
  const handleDelete = async (e) => {
    await deleteUser(e._id);
    Warn(e.name + "  was Deleted");
     setisLoading(false);
  };

  const handleEdit = (user) => {
    setInputName(user.name);
    setInputEmail(user.email);
    setEditingUserId(user._id);
    setisLoading(true)
  };

  const handleUpdate = () => {
    if (inputName !== inputName) {
      Warn("Can't update without any changes ⚠️⚠️");
    }
    else{
    updateUser({ id: editingUserId, name: inputName, email: inputEmail });
    setInputName("");
    setInputEmail("");
    setEditingUserId(null);
    setTimeout (setisLoading(false))}
  
  };

  function conformanceDelete(e) {
    const DATA = e;
    toast(({ closeToast }) => {
      return (
        <div>
          <p>want to remove</p>
          <button
            onClick={() => {
              closeToast();
              handleDelete(DATA);
              setisLoading(true);

            }}
          >
            Yes
          </button>
          <button onClick={closeToast}>No</button>
        </div>
      );
    }),
      { autoClose: false };
  }

  function Warn(e) {
    toast.warn(e, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "colored",
    });
  }

  return (
    <div className="Container">
      <h3>CRUD using RTK Query</h3>
      <InputText value={inputName} onChange={(e) => {setInputName(e.target.value)}} />
     <InputText value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
     <Button label={isLoading ? "Loading.." : "Submit"} onClick={handleSubmit} disabled={isLoading}/>


    <ul >
        {users.map((user) => (
          <li key={user._id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
           <Button label="Delete 🗑️"onClick={() => {conformanceDelete(user);}} severity="danger" outlined />
           <Button label="Edit ✒️" onClick={() => {handleEdit(user);}} outlined />
           {isLoading ? <Button label="Update 📝" onClick={() => {handleUpdate(user.id)}} outlined />:''} 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Crud;
