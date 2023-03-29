import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Container,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

import { useWeather, useError } from "./hooks";

export const App: React.FC = () => {
  const { coordinates, removeWeather, fetchWeather } = useWeather();
  const { errorMessage, showError, hideError } = useError();

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Weather</Typography>
      <TextField
        type="number"
        label="Latitude"
        variant="outlined"
        value={latitude}
        onChange={({ target: { value } }) => setLatitude(value)}
        fullWidth
        margin="normal"
      />
      <TextField
        type="number"
        label="Longitude"
        variant="outlined"
        value={longitude}
        onChange={({ target: { value } }) => setLongitude(value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => fetchWeather(latitude, longitude, showError)}
      >
        Add Coordinates
      </Button>
      <List>
        {coordinates.map((coordinate, index) => (
          <ListItem button key={uuid()} onClick={() => removeWeather(index)}>
            <ListItemText
              primary={`Latitude: ${coordinate.latitude}, Longitude: ${coordinate.longitude}`}
              secondary={`Temperature: ${coordinate.temperature}°C`}
            />
          </ListItem>
        ))}
      </List>
      <Snackbar
        open={errorMessage !== ""}
        autoHideDuration={6000}
        onClose={hideError}
      >
        <Alert variant="filled" onClose={hideError} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};
