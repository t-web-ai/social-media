const PostDetailsLoadingSkeleton = () => {
  return (
    <div className="d-flex flex-column gap-4 px-2 mt-2 w-100 justify-content-center align-items-center">
      {/* Post content */}
      <div
        className="p-3 rounded shadow-sm w-100"
        style={{ backgroundColor: "#f0f2f5" }}
      >
        {/* Header */}
        <div className="d-flex align-items-center mb-3">
          <div
            className="rounded-circle me-2"
            style={{ width: "50px", height: "50px", backgroundColor: "#ccc" }}
          ></div>
          <div
            style={{
              height: "15px",
              width: "25%",
              backgroundColor: "#ccc",
              borderRadius: "4px",
            }}
          ></div>
        </div>

        {/* Post text */}
        <div
          className="mb-2"
          style={{
            height: "15px",
            width: "90%",
            backgroundColor: "#ccc",
            borderRadius: "4px",
          }}
        ></div>
        <div
          className="mb-2"
          style={{
            height: "15px",
            width: "80%",
            backgroundColor: "#ccc",
            borderRadius: "4px",
          }}
        ></div>

        {/* Post image placeholder */}
        <div
          style={{
            height: "200px",
            width: "100%",
            backgroundColor: "#ccc",
            borderRadius: "8px",
            marginTop: "10px",
          }}
        ></div>
      </div>

      {/* Comments */}
      <div className="w-75 d-flex flex-column gap-3">
        {[1, 2, 3].map((comment) => (
          <div key={comment} className="d-flex gap-2 align-items-start">
            <div
              className="rounded-circle"
              style={{ width: "35px", height: "35px", backgroundColor: "#ccc" }}
            ></div>
            <div className="flex-grow-1">
              <div
                style={{
                  height: "12px",
                  width: "40%",
                  backgroundColor: "#ccc",
                  borderRadius: "4px",
                  marginBottom: "6px",
                }}
              ></div>
              <div
                style={{
                  height: "12px",
                  width: "80%",
                  backgroundColor: "#ccc",
                  borderRadius: "4px",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetailsLoadingSkeleton;
