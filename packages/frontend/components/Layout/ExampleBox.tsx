import { Box, Image } from "@chakra-ui/react";

const ExampleBox = (): JSX.Element => (
  <Box
    style={{
      background: "#C8EDCE",
      position: "absolute",
      top: "200px",
      left: "775px",
      width: "600px",
      boxShadow: "6px 6px 0px #CEECEF",
      borderRadius: "15px",
      transform: "rotate(6deg)",
      zIndex: "1",
    }}
  >
    <Image
      borderRadius={"15px"}
      border={"5px solid #58C85C"}
      src={"/preview.png"}
    />
  </Box>
);

export default ExampleBox;
