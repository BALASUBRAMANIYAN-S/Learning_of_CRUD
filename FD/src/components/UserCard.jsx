import { Await, Link } from "react-router-dom";
import { useDeleteUserMutation } from "../services/userApi";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { toast as notify } from "react-toastify";
import React, { useId, useRef } from "react";
function UserCard({ user, Name, Email }) {
  const [deleteUser] = useDeleteUserMutation();
  //
  const toast = useRef(null);

  // Show a message
  const accept = (e) => {
  
    
     deleteUser(e).unwrap().then(()=> {
      notify.info(Name+"  Was deleted")
    });
    
  }

  const reject = (e) => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: `${e}  User Can't delete`,
      life: 3000,
    });
  };
  // end of the message

  const confirm = (User) => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => accept(User._id),
      reject: () => reject(user.name),
    });
  };

  return (
    <div className="flex mx-14 p-4 items-center justify-between border-2 rounded-2xl border-blue-400">
      <Toast ref={toast} />
      <ul>
        <li>Name : {Name}</li>
        <li>Email : {Email}</li>
      </ul>
      <div className="flex items-center gap-4">
        <img
          src="/svg/delete.svg"
          alt="Delete"
          onClick={() => {
            confirm(user);
          }}
          className="cursor-pointer"
        />
        <Link to={`/updateuser/${Name}/${Email}/${user._id}`}>
          <img src="/svg/pen.svg" alt="Edit" className="cursor-pointer" />
        </Link>
      </div>
    </div>
  );
}

export default UserCard;
