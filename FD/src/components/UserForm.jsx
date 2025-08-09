import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { useAddUserMutation, useUpdateUserMutation } from "../services/userApi";
import { toast as notify } from "react-toastify";
import { Toast } from "primereact/toast";
import { confirmDialog } from "primereact/confirmdialog";

// All imports on the Top
function UserForm({ IEmail, IName, UserId, saveLabel = "Save 🗃️" }) {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const buttonRef = useRef(null);
  // useeffect
  useEffect(() => {
    nameRef.current?.focus(); // Auto-focus on Name input
  }, []);
  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef.current?.focus();
    }
  };

  // Assign a Value Bellow
  const [updateUser] = useUpdateUserMutation();
  const [addUser] = useAddUserMutation();
  const [inputName, setInputName] = useState(IName || "");
  const [inputEmail, setInputEmail] = useState(IEmail || "");
  let navigate = useNavigate();
  const toast = useRef(null);
  // Ended A Assign a Values

  const accept = (e) => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: `Someone Was Updated`,
      life: 3000,
    });
    updateUser({ id: UserId, name: inputName, email: inputEmail });
    navigate("/");
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: `${IName}  User Can't Update`,
      life: 3000,
    });
  };
  // end of the message

  const handleUpdate = () => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept,
      reject,
    });
  };

  // Save Function
  const handleSave = () => {
    if (!inputName || !inputEmail) {
      notify.warn("Enter A all Details");
    } else {
      addUser({ name: inputName, email: inputEmail + "@gmail.com" });
      notify.success(`${inputName} was Added`);
      setInputName("");
      setInputEmail("");
      navigate("/");
    }
  };
  // XML Elements
  return (
    <div className="flex  left-0 right-0 justify-center">
      <Toast ref={toast} />
      <div className="flex w-5xl mt-5 mx-4 p-4 items-center justify-between border-2 rounded-2xl border-blue-400">
        <ul className="flex flex-col gap-4 items-start ml-10 mt-4">
          <li className="flex items-center gap-3">
            <label className="w-20">Name</label>
            <InputText
              ref={nameRef}
              className="h-10 w-64"
              value={inputName}
              placeholder="Enter Your Name"
              onChange={(e) => setInputName(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, emailRef)}
            />
          </li>
          <li className="flex items-center gap-3">
            <label className="w-20">Email</label>
            <InputText
              ref={emailRef}
              className="h-10 w-64"
              value={inputEmail}
              placeholder="Enter Email Without @gmail..."
              onChange={(e) => setInputEmail(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, buttonRef)}
            />
          </li>
          <li className="flex gap-5 mt-4 ml-20">
            <Link to={"/"}>
              <Button label="Back ↗️" severity="contrast" outlined />
            </Link>
            {saveLabel && (
              <Button
                ref={buttonRef}
                onClick={saveLabel === "Update" ? handleUpdate : handleSave}
                label={saveLabel}
                severity="help"
                outlined
              />
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserForm;
