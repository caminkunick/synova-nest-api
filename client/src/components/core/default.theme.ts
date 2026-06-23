import { createTheme } from "@mui/material";

export const defaultTheme = () =>
  createTheme({
    palette: {
      primary: {
        main: "#e3a622",
        light: "#f9e2b2",
        dark: "#e29025",
      },
      secondary: {
        main: "#1b1e2c",
        light: "#1a2550",
        dark: "#101118",
      },
    },
    typography: {
      fontSize: 18,
      fontFamily: "DB Heavent, sans-serif",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          outlined: {
            borderWidth: 2,
          }
        }
      }
    }
  });
