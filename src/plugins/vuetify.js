// Styles
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
// import lightColorTheme from "@/theme/light-colors-theme.js";
// import darkColorTheme from "@/theme/dark-colors-theme.js";

// Vuetify
import { createVuetify } from "vuetify";

export default createVuetify({
  theme: {
    defaultTheme: "lightTheme",
    themes: {
      lightTheme: {
        dark: false,
        colors: {
          background: "#FAFAFA",
          surface: "#FFFFFF",
          primary: "#3DB374",
          secondary: "#242424",
          error: "#FF513D",
          "light-primary": "#4DE594",
          "light-secondary": "#96EABD",
          "primary-text": "#242424",
          "secondary-text": "#5E5E5E",
        },
      },
    },
  },
});
