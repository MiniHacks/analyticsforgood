import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false
  },
  colors: {
    brand: {
      50: "#EFFAF2",
      100: "#C8EDCE",
      200: "#95E098",
      300: "#95DAE0",
      400: "#76D47F",
      500: "#58C85C",
      600: "#42A051",
      700: "#1A4F1F",
      800: "#1A4F1F",
      900: "#1A4F1F",
    },
  },
  fonts: {
    heading: "Poppins",
    body: "Inter",
  },
  components: {
    Heading: {
      baseStyle: {
        lineHeight: "1.2",
        // paddingBottom: 0,
        // marginBottom: -2,
      },
    },
    Td: {
      baseStyle: {
        padding: "0px !important",
      },
    },
  },
});
