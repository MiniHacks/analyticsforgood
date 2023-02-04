import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  colors: {
    brand: {
      50: "#e8ffff",
      100: "#EFFAFA",
      200: "#CEECEF",
      300: "#95DAE0",
      400: "#76CAD4",
      500: "#58BAC8",
      600: "#4292A0",
      700: "#1A434F",
      800: "#1A434F",
      900: "#1A434F",
    },
  },
  fonts: {
    heading: "Poppins",
    body: "Inter",
  },
  components: {
    Heading: {
      baseStyle: {},
    },
    Td: {
      baseStyle: {
        padding: "0px !important",
      },
    },
  },
});
