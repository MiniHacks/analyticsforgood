import { HStack, Box, Text, Heading, VStack, Button } from "@chakra-ui/react";
import React from "react";

const Credits = (): JSX.Element => {
  return (
    <Box>
      <HStack
        w={"100%"}
        h={"200px"}
        bg={"brand.100"}
        justifyContent={"center"}
        fontFamily={"Poppins"}
      >
        <HStack justifyContent={"space-between"}>
          <VStack alignItems={"left"}>
            <Text color={"black"} fontSize={"25px"} fontWeight={"600"}>
              Made For Analytics For Good Hackathon
            </Text>
            <Text fontFamily={"Inter"}>
              Hacked together by{" "}
              <Button
                color={"black"}
                fontWeight={"600"}
                variant={"link"}
                as={"a"}
                target={"_blank"}
                href={"https://yok.dev"}
              >
                {" "}
                Samyok
              </Button>
              ,{"  "}
              <Button
                color={"black"}
                fontWeight={"600"}
                variant={"link"}
                as={"a"}
                target={"_blank"}
                href={"https://github.com/Kanishk-K"}
              >
                Kanishk
              </Button>
              ,{"  "}
              <Button
                color={"black"}
                fontWeight={"600"}
                variant={"link"}
                as={"a"}
                target={"_blank"}
                href={"https://anshpa.tel"}
              >
                Ansh
              </Button>
              ,{"  "}
              <Button
                color={"black"}
                fontWeight={"600"}
                variant={"link"}
                as={"a"}
                target={"_blank"}
                href={"https://brandonlam.dev"}
              >
                Brandon
              </Button>
              , and {"  "}
              <Button
                color={"black"}
                fontWeight={"600"}
                variant={"link"}
                as={"a"}
                target={"_blank"}
                href={"https://iamstuti.com"}
              >
                Stuti
              </Button>
              . We all study Computer Science at the University of Minnesota,
              Twin Cities.
            </Text>
            <Text fontFamily={"Inter"}>
              Star us on{"  "}
              <Button
                color={"black"}
                fontWeight={"600"}
                variant={"link"}
                as={"a"}
                target={"_blank"}
                href={"https://github.com/minihacks/goodaly"}
              >
                Github.
              </Button>
            </Text>
          </VStack>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Credits;
