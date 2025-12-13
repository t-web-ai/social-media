import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useDeleteContext } from "../../../context/DeleteContext";

interface Props {
  id: string;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const DeleteModal = ({ id, isOpen, setOpen }: Props) => {
  const { DeletePost } = useDeleteContext();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);
  return (
    isOpen && (
      <div
        className="position-fixed d-flex justify-content-center align-items-center"
        style={{
          left: "0",
          top: "0",
          right: "0",
          bottom: "0",
          zIndex: "9999",
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
        }}
        onClick={() => setOpen(false)}
      >
        <div
          className="rounded bg-secondary-subtle p-3"
          style={{ minWidth: "350px" }}
        >
          <div>
            <div>
              <div className="fs-3">Are you sure?</div>
              <span>This action can't be undone.</span>
            </div>
            <div className="mt-3 d-flex justify-content-between gap-2 align-items-center">
              <button
                className="btn btn-danger py-2 px-4 fw-semibold"
                onClick={() => {
                  setOpen(false);
                  DeletePost(id);
                }}
              >
                Confirm
              </button>
              <button
                onClick={() => setOpen(false)}
                className="btn py-2 px-4 fw-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteModal;
