import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, RootState } from "./redux/store";
import Sidebar from "./components/Sidebar";
import ChartView from "./components/ChartView";
import ChartModal from "./components/ChartModal";
import { addChart, selectChart } from "./redux/chartSlice";
import { Box, Typography } from "@mui/material";
import NotFoundPage from "./components/NotFoundPage";

const MainPage = () => {
  const dispatch = useDispatch();
  const charts = useSelector((state: RootState) => state.chart.charts);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddChart = (chartData: any) => {
    if (chartData.dataseries) {
      dispatch(
        addChart({
          ...chartData,
          dataseries: chartData.dataseries.dataseries, // Extract sensor data
        })
      );
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar for Navigation */}
      <Sidebar
        charts={charts.map((chart) => chart.name)}
        onAddChart={() => setModalOpen(true)}
        onSelectChart={(chartName) => dispatch(selectChart(chartName))}
      />
      
      {/* Default View Message */}
      <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h6">Select a chart from the sidebar</Typography>
      </Box>

      {/* Chart Modal for Adding New Charts */}
      <ChartModal open={modalOpen} onClose={() => setModalOpen(false)} onAdd={handleAddChart} />
    </Box>
  );
};

const ChartPage = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar charts={[]} onAddChart={() => {}} onSelectChart={() => {}} />
      <ChartView />
    </Box>
  );
};


const App = () => (
  <Provider store={store}>
    <Router>
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:chartId" element={<ChartPage />} />
          <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;
export {};
