import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button,
  MenuItem, FormHelperText, FormControl, Select, InputLabel, Box
} from "@mui/material";

interface SensorData {
  name: string;
  dataseries: { value: number; date: string }[];
}

interface ChartFormData {
  name: string;
  type: string;
  color: string;
  dataseries: SensorData | null;
  xAxis: string;
  yAxis: string;
  description: string;
}

interface ChartModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: ChartFormData) => void;
}

const ChartModal: React.FC<ChartModalProps> = ({ open, onClose, onAdd }) => {
  const { register, handleSubmit, control, setValue, formState: { errors }, reset } = useForm<ChartFormData>();
  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  useEffect(() => {
    fetch("/dataseries.json")
      .then(response => response.json())
      .then(data => setSensorData(data))
      .catch(error => console.error("Error loading dataseries:", error));
  }, []);

  const handleSensorChange = (sensorName: string) => {
    const selectedSensor = sensorData.find(sensor => sensor.name === sensorName);
    if (selectedSensor) {
      setValue("dataseries", selectedSensor);
      setValue("xAxis", "Date");
      setValue("yAxis", "Temperature (°C)");
    }
  };

  const onSubmit = (data: ChartFormData) => {
    onAdd(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Chart</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>

          {/* Chart Name */}
          <TextField
            {...register("name", { required: "Required field" })}
            label="Chart Name"
            fullWidth margin="dense"
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          {/* Chart Type Dropdown */}
          <FormControl fullWidth margin="dense" error={!!errors.type}>
            <InputLabel>Type *</InputLabel>
            <Controller
              name="type"
              control={control}
              defaultValue=""
              rules={{ required: "Required field" }}
              render={({ field }) => (
                <Select {...field}>
                  <MenuItem value="Line">Line</MenuItem>
                  <MenuItem value="Bar">Bar</MenuItem>
                  <MenuItem value="Pie">Pie</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.type?.message}</FormHelperText>
          </FormControl>

          {/* Color Dropdown */}
          <FormControl fullWidth margin="dense" error={!!errors.color}>
            <InputLabel>Color *</InputLabel>
            <Controller
              name="color"
              control={control}
              defaultValue=""
              rules={{ required: "Required field" }}
              render={({ field }) => (
                <Select {...field}>
                  <MenuItem value="Black">Black</MenuItem>
                  <MenuItem value="Red">Red</MenuItem>
                  <MenuItem value="Blue">Blue</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.color?.message}</FormHelperText>
          </FormControl>

          {/* Dataseries (Sensor Selection) */}
          <FormControl fullWidth margin="dense" error={!!errors.dataseries}>
            <InputLabel>Dataseries *</InputLabel>
            <Controller
              name="dataseries"
              control={control}
              rules={{ required: "Required field" }}
              render={({ field }) => (
                <Select {...field} onChange={(e) => { field.onChange(e); handleSensorChange(e.target.value as string); }}>
                  {sensorData.map((sensor) => (
                    <MenuItem key={sensor.name} value={sensor.name}>{sensor.name}</MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{errors.dataseries?.message}</FormHelperText>
          </FormControl>

          {/* X-Axis and Y-Axis Names */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField {...register("xAxis")} label="X-axis (Date)" fullWidth margin="dense" disabled />
            <TextField {...register("yAxis")} label="Y-axis (Temperature)" fullWidth margin="dense" disabled />
          </Box>

          {/* Description */}
          <TextField {...register("description")} label="Description" fullWidth multiline rows={2} margin="dense" />

          {/* Action Buttons */}
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">Add Chart</Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ChartModal;
