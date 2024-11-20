import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#0D1E4C",
    },
    secondary: {
      main: "#C48CB3",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
