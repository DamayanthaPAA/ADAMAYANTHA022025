import { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

// Type definition for the chart form
interface ChartFormData {
  name: string;
  type: string;
  color: string;
  dataseries: string;
  xAxis: string;
  yAxis: string;
  description: string;
}

// Available chart types and colors
const chartTypes = ["Line", "Bar", "Pie"];
const colors = ["Black", "Blue", "Red", "Green", "Orange"];

const AddChartModal = ({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: (data: ChartFormData) => void }) => {
  const { control, handleSubmit, reset } = useForm<ChartFormData>({
    defaultValues: {
      name: "",
      type: "Line",
      color: "Black",
      dataseries: "",
      xAxis: "",
      yAxis: "",
      description: "",
    },
  });

  const [dataSeriesList, setDataSeriesList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load available sensor names from JSON file
  useEffect(() => {
    const loadSensorData = async () => {
      try {
        const response = await fetch("/dataseries.json"); // Ensure JSON file is in `public/`
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        const sensorNames = data.map((sensor: any) => sensor.name); // Extract sensor names
        setDataSeriesList(sensorNames);
        setLoading(false);
      } catch (err) {
        setError("Error loading data series.");
        setLoading(false);
      }
    };

    if (open) {
      loadSensorData();
    }
  }, [open]); // Fetch data every time modal opens

  const onSubmit = (data: ChartFormData) => {
    onSave(data);
    reset(); // Clear form after saving
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add Chart</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Required field" }}
            render={({ field, fieldState }) => (
              <TextField {...field} label="Name" fullWidth margin="dense" error={!!fieldState.error} helperText={fieldState.error?.message} />
            )}
          />

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Type" fullWidth margin="dense">
                {chartTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Color" fullWidth margin="dense">
                {colors.map((color) => (
                  <MenuItem key={color} value={color}>
                    {color}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="dataseries"
            control={control}
            rules={{ required: "Required field" }}
            render={({ field }) => (
              <TextField {...field} select label="Dataseries" fullWidth margin="dense">
                {loading ? (
                  <MenuItem disabled>Loading...</MenuItem>
                ) : error ? (
                  <MenuItem disabled>{error}</MenuItem>
                ) : (
                  dataSeriesList.map((series) => (
                    <MenuItem key={series} value={series}>
                      {series}
                    </MenuItem>
                  ))
                )}
              </TextField>
            )}
          />

          <Controller
            name="xAxis"
            control={control}
            render={({ field }) => <TextField {...field} label="X-axis name" fullWidth margin="dense" />}
          />

          <Controller
            name="yAxis"
            control={control}
            render={({ field }) => <TextField {...field} label="Y-axis name" fullWidth margin="dense" />}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => <TextField {...field} label="Description" fullWidth multiline rows={2} margin="dense" />}
          />

          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Add Chart
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddChartModal;
