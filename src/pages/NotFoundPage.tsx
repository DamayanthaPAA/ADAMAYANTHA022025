import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ fontSize: "80px", marginBottom: "10px" }}>404</h1>
      <p style={{ fontSize: "20px", marginBottom: "20px" }}>
        Page not found. Please try again later.
      </p>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
