import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, TextField, TextFieldProps } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, DateRangePicker } from "@mui/lab";

const ChartView: React.FC = () => {
  const selectedChart = useSelector((state: RootState) => state.chart.selectedChart);

  // Get the minimum and maximum dates from the data series
  const minDate = selectedChart
    ? new Date(Math.min(...selectedChart.dataseries.map((data) => new Date(data.date).getTime())))
    : null;
  const maxDate = selectedChart
    ? new Date(Math.max(...selectedChart.dataseries.map((data) => new Date(data.date).getTime())))
    : null;

  // Set initial state for date range
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([minDate, maxDate]);

  // Update date range when a new chart is selected
  useEffect(() => {
    setDateRange([minDate, maxDate]);
  }, [selectedChart]);

  if (!selectedChart) {
    return (
      <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h6">No charts created yet.</Typography>
      </Box>
    );
  }

  // Filter data based on selected date range
  const filteredData = selectedChart.dataseries.filter((data) => {
    const date = new Date(data.date);
    if (dateRange[0] && dateRange[1]) {
      return date >= dateRange[0] && date <= dateRange[1];
    }
    return true; // Show all if no range selected
  });

  const options = {
    chart: { type: selectedChart.type.toLowerCase() },
    title: { text: selectedChart.name, align: "left", style: { fontSize: "18px", fontWeight: "bold" } },
    xAxis: {
      title: { text: selectedChart.xAxis },
      categories: filteredData.map((data) => new Date(data.date).toLocaleDateString()), // X-axis = Dates
    },
    yAxis: {
      title: { text: selectedChart.yAxis },
    },
    series: [
      {
        name: selectedChart.name,
        data: filteredData.map((data) => data.value), // Y-axis = Values
        color: selectedChart.color.toLowerCase(),
      },
    ],
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Paper sx={{ padding: 3, borderRadius: 2, position: "relative" }}>
        {/* Date Range Picker - Positioned at the Top Right */}
        <Box sx={{ position: "absolute", top: 16, right: 16 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="Start Date"
              endText="End Date"
              value={dateRange}
              onChange={(newValue: [Date | null, Date | null]) => setDateRange(newValue)}
              renderInput={(startProps: TextFieldProps, endProps: TextFieldProps) => (
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField {...startProps} variant="outlined" size="small" />
                  <TextField {...endProps} variant="outlined" size="small" />
                </Box>
              )}
            />
          </LocalizationProvider>
        </Box>

        {/* Chart Component */}
        <HighchartsReact highcharts={Highcharts} options={options} />

        {/* Centered Chart Description */}
        <Typography variant="body2" sx={{ marginTop: 2, textAlign: "center", color: "gray" }}>
          {selectedChart.description || "No additional information available."}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ChartView;
