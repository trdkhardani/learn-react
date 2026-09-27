import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Page Not Found</h1>
      <div>
        <button
          style={{ width: "fit-content" }}
          onClick={() => navigate("/")}
        >
          Back To Home
        </button>
      </div>
    </>
  );
}

export default NotFound;
