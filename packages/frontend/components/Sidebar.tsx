import React from "react";
import { Box, Button, VStack } from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import { FaCarrot, FaTractor, FaCalculator } from "react-icons/fa";
import { FiArrowUpLeft } from "react-icons/fi";
import Card from "./Card";
import Logo from "./Logo";

const Sidebar = (): JSX.Element => {
  const { data: session, status } = useSession();

  console.log(status);
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
            <FaCarrot />
            &nbsp;Products
          </Button>
          <Button colorScheme={"brand"} variant={"ghost"}>
            <FaTractor />
            &nbsp;Producers
          </Button>
          <Button colorScheme={"brand"} variant={"ghost"}>
            <FaCalculator />
            &nbsp;Calculator
          </Button>
        </VStack>
        <Box px={8} py={450}>
          <Button
            variant={"ghost"}
            fontWeight={"700"}
            fontFamily={"Inter"}
            fontSize={"16xpx"}
            colorScheme={"brand"}
            color={"brand.600"}
            onClick={() => {
              signOut();
              window.location.href = "/landingpage";
            }}
          >
            <FiArrowUpLeft />
            &nbsp;Logout
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default Sidebar;
