import React, { useRef } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

export default function PositionDemo() {
  const toast = useRef(null);

  const accept = () => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have accepted",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const confirm = (position) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      position,
      accept,
      reject,
    });
  };

  return (
    <div className="card">
      <Toast ref={toast} />
      <ConfirmDialog />

      <Button
        label="TopRight"
        icon="pi pi-arrow-down-left"
        onClick={() => confirm("top-right")}
        className="p-button-warning"
        style={{ minWidth: "10rem" }}
      />
    </div>
  );
}
