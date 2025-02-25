import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useParams } from "react-router-dom";
import { TextField } from "@mui/material";

// Define the type for sensor data
interface DataPoint {
  value: number;
  date: string;
}

const ChartViewer = () => {
  const { chartId } = useParams<{ chartId: string }>(); // Get selected chart name
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  // Load the selected sensor data from JSON
  useEffect(() => {
    fetch("/dataseries.json")
      .then((res) => res.json())
      .then((data) => {
        const sensor = data.find((sensor: any) => sensor.name === chartId); // Find selected sensor
        if (sensor) {
          setChartData(sensor.dataseries);
          setStartDate(sensor.dataseries[0].date);
          setEndDate(sensor.dataseries[sensor.dataseries.length - 1].date);
        } else {
          setChartData([]); // Clear data if sensor is not found
        }
      })
      .catch((err) => console.error("Error loading chart data", err));
  }, [chartId]);

  // Filter data based on selected date range
  const filteredData =
    chartData.filter((d) => (!startDate || d.date >= startDate) && (!endDate || d.date <= endDate)) || [];

  // Highcharts configuration
  const chartOptions = {
    title: { text: `Chart - ${chartId}` },
    xAxis: {
      type: "datetime",
      title: { text: "Time" },
      labels: {
        format: "{value:%Y-%m-%d}", // Format date labels
      },
    },
    yAxis: {
      title: { text: "Temperature (°C)" },
    },
    series: [
      {
        name: chartId,
        data: filteredData.map((d) => [new Date(d.date).getTime(), d.value]), // Convert date to timestamp
        type: "line",
      },
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{chartId}</h2>

      {chartData.length === 0 ? (
        <p>No data available for {chartId}</p>
      ) : (
        <>
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <TextField
              label="Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={startDate || ""}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <TextField
              label="End Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={endDate || ""}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </>
      )}
    </div>
  );
};

export default ChartViewer;
