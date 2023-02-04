import { HStack, Box, Text, Heading, VStack, Image } from "@chakra-ui/react";
import React from "react";

const PL3 = (): JSX.Element => {
  return (
    <Box>
      <HStack
        marginTop={"200px"}
        w={"100%"}
        h={"600px"}
        bg={"white"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <HStack justifyContent={"space-between"} mr={"100px"} ml={"20px"}>
          <Image src={"GraphicAly.png"} px={"10%"} maxWidth={"850px"} />
          <VStack>
            <Heading fontSize={"50px"}>Problem</Heading>
            <Text fontFamily={"Poppins"} fontWeight={"300"} px={8} py={3}>
              The Good Acre is committed to creating positive change and
              supporting our local farming community.
              <Box py={3} /> Unfortunately, the issue of "Money on the Table"
              has arisen, presenting a setback in the mission. <Box py={3} />{" "}
              This phrase represents missed opportunities, where potential funds
              are left untapped, thereby hindering our ability to aid
              underrepresented farmers. Aly is an innovative solution aimed at
              resolving the issue
            </Text>
          </VStack>
        </HStack>
      </HStack>
    </Box>
  );
};

export default PL3;
