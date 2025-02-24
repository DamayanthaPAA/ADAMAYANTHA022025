import React from "react";
import { Drawer, List, ListItem, ListItemText, ListItemButton, Button, TextField, Box, Typography } from "@mui/material";

interface SidebarProps {
  charts: string[];
  onAddChart: () => void;
  onSelectChart: (chartName: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ charts, onAddChart, onSelectChart }) => {
  return (
    <Drawer variant="permanent" sx={{ width: 250, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: 250 } }}>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6">📊 Chart App</Typography>
        <TextField fullWidth label="Search..." variant="outlined" sx={{ marginY: 2 }} />
        <Button variant="contained" fullWidth onClick={onAddChart}>+ Add Chart</Button>
      </Box>
      <List>
        {charts.length > 0 ? (
          charts.map((chart, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => onSelectChart(chart)}>
                <ListItemText primary={chart} />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <Typography sx={{ padding: 2 }}>No charts</Typography>
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
