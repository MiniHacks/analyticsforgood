import { HStack, Box, Text, Heading, VStack, Image } from "@chakra-ui/react";
import React from "react";

const PL2 = (): JSX.Element => {
  return (
    <Box>
      <HStack
        w={"100%"}
        h={"600px"}
        bg={"white"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <HStack justifyContent={"space-between"} mr={"100px"} ml={"20px"}>
          <Image src={"GraphicAly.png"} px={"10%"} maxWidth={"850px"} />
          <VStack>
            <Heading fontSize={"50px"}>How We Fit</Heading>
            <Text fontFamily={"Poppins"} fontWeight={"300"} px={8} py={3}>
              Aly is your ultimate planning partner, delivering exceptional
              support for a wide range of functions. <Box py={3} />
              With Aly by your side, you can approach negotiations with
              confidence, knowing you have a direct and reliable source to turn
              to. <Box py={3} />
              Whether you're working with customers or farmers, Aly ensures a
              smooth and efficient planning process, elevating your efforts to
              new heights.
            </Text>
          </VStack>
        </HStack>
      </HStack>
    </Box>
  );
};

export default PL2;
