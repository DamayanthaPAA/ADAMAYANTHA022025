import { useState } from "react";
import { Button, List, ListItem, ListItemText, IconButton, TextField ,ListItemButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import AddChartModal from "./AddChartModal";

const Sidebar = () => {
  const navigate = useNavigate();
  const [charts, setCharts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleSaveChart = (chartData: any) => {
    setCharts((prev) => [...prev, chartData.dataseries]); // Save sensor name
    setModalOpen(false);
  };

  return (
    <div style={{ width: 250, padding: 16, borderRight: "1px solid #ddd" }}>
      <h3>Logopusum</h3>
      <TextField
        fullWidth
        size="small"
        label="Search..."
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button
        variant="contained"
        fullWidth
        style={{ marginTop: 10 }}
        onClick={() => setModalOpen(true)}
      >
        + Add Chart
      </Button>
      
      <List>
        {charts.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: 20 }}>No charts</p>
        ) : (
          charts.map((chart, index) => (
            <ListItem
            key={index}
            secondaryAction={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
          >
            <ListItemButton component="li" onClick={() => navigate(`/${chart}`)}>
              <ListItemText primary={chart} />
            </ListItemButton>
          </ListItem>
          ))
        )}
      </List>

      <AddChartModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSaveChart} />
    </div>
  );
};

export default Sidebar;
