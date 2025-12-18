const PostsLoadingSkeleton = () => {
  return (
    <div className="d-flex flex-column gap-3 mt-3 p-2">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="p-3 rounded shadow-sm"
          style={{ backgroundColor: "#f0f2f5" }}
        >
          {/* Header (avatar + name) */}
          <div className="d-flex align-items-center mb-3">
            <div
              className="rounded-circle me-2"
              style={{ width: "40px", height: "40px", backgroundColor: "#ccc" }}
            ></div>
            <div
              style={{
                height: "15px",
                width: "30%",
                backgroundColor: "#ccc",
                borderRadius: "4px",
              }}
            ></div>
          </div>

          {/* Post content */}
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
          <div
            style={{
              height: "15px",
              width: "60%",
              backgroundColor: "#ccc",
              borderRadius: "4px",
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default PostsLoadingSkeleton;
