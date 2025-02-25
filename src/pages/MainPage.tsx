import Sidebar from "../components/Sidebar";

const MainPage = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* <Sidebar /> */}
      <div style={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p>No charts created yet.</p>
          <button
            style={{
              backgroundColor: "#1976d2",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "5px",
              marginTop: "10px",
            }}
            onClick={() => alert("Open Add Chart Modal")}
          >
            + Add Chart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
