import { Box } from "@chakra-ui/react";
import React from "react";

const ShadowCard = ({
  children,
  ...props
}: React.ComponentProps<typeof Box>): JSX.Element => (
  <Box
    borderRadius={"15px"}
    boxShadow={"20px 20px 50px rgba(30, 141, 203, 0.08)"}
    backgroundColor={"white"}
    {...props}
  >
    {children}
  </Box>
);

export default ShadowCard;
