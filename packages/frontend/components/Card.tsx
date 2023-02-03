import { Box } from "@chakra-ui/react";
import React from "react";

const Card = ({
  style,
  children,
  ...props
}: React.ComponentProps<typeof Box>): JSX.Element => (
  <Box
    style={{
      borderColor: "brand.500",
      border: "5px solid #58BAC8",
      boxShadow: "6px 6px 0px #CEECEF",
      borderRadius: "15px",
      backgroundColor: "white",
      ...style,
    }}
    {...props}
  >
    {children}
  </Box>
);

export default Card;
