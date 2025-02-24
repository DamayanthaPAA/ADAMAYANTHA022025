import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ChartData {
  name: string;
  type: string;
  color: string;
  dataseries: { value: number; date: string }[];
  xAxis: string;
  yAxis: string;
  description: string;
}


// interface ChartData {
//   name: string;
//   type: string;
//   color: string;
//   dataseries: string;
//   xAxis: string;
//   yAxis: string;
//   description: string;
// }

interface ChartState {
  charts: ChartData[];
  selectedChart: ChartData | null;
}

const initialState: ChartState = {
  charts: [],
  selectedChart: null,
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    addChart: (state, action: PayloadAction<ChartData>) => {
      state.charts.push(action.payload);
    },
    selectChart: (state, action: PayloadAction<string>) => {
      state.selectedChart = state.charts.find(chart => chart.name === action.payload) || null;
    },
  },
});

export const { addChart, selectChart } = chartSlice.actions;
export default chartSlice.reducer;
