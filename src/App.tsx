// import { Routes, Route } from "react-router-dom";
// import MainPage from "./pages/MainPage";
// import ChartPage from './pages/ChartPage';
// import NotFoundPage from './pages/NotFoundPage';

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<MainPage />} />
//       <Route path="/:chartId" element={<ChartPage />} />
//       <Route path="*" element={<NotFoundPage />} />
//     </Routes>
//   );
// }

// export default App;
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainPage from "./pages/MainPage";
import ChartPage from "./pages/ChartPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:chartId" element={<ChartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

