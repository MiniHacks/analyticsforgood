import React from "react";
import { Box, Button, VStack } from "@chakra-ui/react";
import Card from "./Card";
import Logo from "./Logo";

const Sidebar = (): JSX.Element => {
  return (
    <Box py={4} position={"absolute"} top={0} left={0}>
      <Box px={12} pb={2}>
        <Logo />
      </Box>
      <Card
        width={200}
        height={"calc(100vh - 100px)"}
        py={4}
        my={2}
        mx={4}
        px={4}
        border={"none !important"}
        boxShadow={"none !important"}
      >
        <VStack alignItems={"start"}>
          <Button colorScheme={"brand"} variant={"ghost"}>
            Products
          </Button>
          <Button colorScheme={"brand"} variant={"ghost"}>
            Producers
          </Button>
          <Button colorScheme={"brand"} variant={"ghost"}>
            Calculator
          </Button>
        </VStack>
      </Card>
    </Box>
  );
};

export default Sidebar;
