import React, { useEffect } from "react";
import Modal from "react-modal";

export function FolderView({ folder, setFolder, selected }) {
  console.log(selected);
  return (
    <Modal isOpen={folder} onRequestClose={() => setFolder(false)}>
      {selected === "aboutme" ? (
        <div className="title-bar">
          hola entraste a la capreta aboutme jajasjajss
        </div>
      ) : (
        <div>hola entraste a la carpeta projects</div>
      )}
    </Modal>
  );
}
