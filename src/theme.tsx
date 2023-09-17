import { createTheme, responsiveFontSizes } from "@mui/material";
import DMSans from "./fonts/DM_Sans/DMSans-Regular.ttf";
import VazirmatnRegular from "./fonts/Vazirmatn/Vazirmatn-Regular.ttf";
import VazirmatnMedium from "./fonts/Vazirmatn/Vazirmatn-Medium.ttf";
import VazirmatnSemiBold from "./fonts/Vazirmatn/Vazirmatn-SemiBold.ttf";
import VazirmatnBold from "./fonts/Vazirmatn/Vazirmatn-Bold.ttf"

const dmSans400 = {
  fontFamily: "DMSans",
  fontStyle: "normal",
  fontWeight: "400",
  src: `url(${DMSans}) format('truetype')`
}

const Vazirmatn400 = {
  fontFamily: "Vazirmatn",
  fontStyle: "normal",
  fontWeight: "400",
  src: `url(${VazirmatnRegular}) format('truetype')`
}

const Vazirmatn500 = {
  fontFamily: "Vazirmatn",
  fontStyle: "normal",
  fontWeight: "500",
  src: `url(${VazirmatnMedium}) format('truetype')`
}

const Vazirmatn600 = {
  fontFamily: "Vazirmatn",
  fontStyle: "normal",
  fontWeight: "600",
  src: `url(${VazirmatnSemiBold}) format('truetype')`
}

const Vazirmatn700 = {
  fontFamily: "Vazirmatn",
  fontStyle: "normal",
  fontWeight: "700",
  src: `url(${VazirmatnBold}) format('truetype')`
}

let theme = createTheme()
theme = createTheme(theme , {
  palette: {
    primary: {
      main: "#000",
      light: "#fff"
    },
    secondary: {
      main: "#E6A800",
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: [
          {'@font-face': dmSans400},
          {'@font-face': Vazirmatn400},
          {'@font-face': Vazirmatn500},
          {'@font-face': Vazirmatn600},
          {'@font-face': Vazirmatn700},
        ],
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          font: "normal normal normal 18px/28px",
          fontFamily: `"Vazirmatn"`
        },
        h1: {
          fontFamily: "Vazirmatn",
          fontSize: "20px !important",
          fontWeight: "700",
          letterSpacing: "0",
          marginTop: "15px"
        },
        h2: {
          [theme.breakpoints.up("md")]: {
            marginTop: "5px"
          },
          fontFamily: "Vazirmatn",
          fontSize: "18px !important",
          fontWeight: "500",
          letterSpacing: "0",
          marginBottom: "15px"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: () => ({
          '&:hover': {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.main,
            border: `2px solid ${theme.palette.primary.main}`,
            transition: '0.2s',
          },
          [theme.breakpoints.up("sm")]: {
            width: "230px",
          },
          [theme.breakpoints.up("md")]: {
            marginTop: "5px"
          },
          fontFamily: "DMSans",
          fontSize: "16px",
          letterSpacing: "0",
          textTransform: "none",
          padding: "10px",
          borderRadius: "8px",
          width: "100%",
          border: `2px solid transparent`,
        }),
      },
      endIcon: {
        margin: "0",
        position: "absolute",
        right: "15px",
        fontSize: "13px",
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: () => ({
          '&:hover, &.active': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.light,
            transition: '0.2s',
          },
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.primary.main,
          borderRadius: "5px",
          padding: "5px",
          marginLeft: "5px"
        })
      }
    },
  },
})

export default responsiveFontSizes(theme);
