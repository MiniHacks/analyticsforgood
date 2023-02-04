import React, { useState } from "react";
import { Box, Button, VStack } from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import { FaCarrot, FaTractor, FaCalculator } from "react-icons/fa";
import { FiArrowUpLeft } from "react-icons/fi";
import { useRouter } from "next/router";
import Card from "./Card";
import Logo from "./Logo";

const Sidebar = (): JSX.Element => {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <Box py={4} position={"fixed"} top={0} left={0}>
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
        <VStack
          alignItems={"start"}
          justifyContent={"space-between"}
          height={"100%"}
        >
          <Button
            colorScheme={"brand"}
            variant={"ghost"}
            onClick={() => router.push("/prod")}
          >
            <FaCarrot />
            &nbsp;Products
          </Button>
          <Button
            colorScheme={"brand"}
            variant={"ghost"}
            onClick={() => router.push("/farm")}
          >
            <FaTractor />
            &nbsp;Producers
          </Button>
          <Button
            colorScheme={"brand"}
            variant={"ghost"}
            onClick={() => router.push("/calculator")}
          >
            <FaCalculator />
            &nbsp;Calculator
          </Button>
          <VStack align={"end"} flexGrow={1} flexDirection={"column-reverse"}>
            <Button
              variant={"ghost"}
              fontWeight={"700"}
              fontFamily={"Inter"}
              fontSize={"16xpx"}
              colorScheme={"brand"}
              color={"brand.600"}
              onClick={() => {
                signOut();
                window.location.href = "/";
              }}
            >
              <FiArrowUpLeft />
              &nbsp;Logout
            </Button>
          </VStack>
        </VStack>
      </Card>
    </Box>
  );
};

export default Sidebar;
