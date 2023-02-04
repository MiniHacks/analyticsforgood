import { HStack, Box, Text, Heading, VStack, Image } from "@chakra-ui/react";
import React from "react";

const PageLayoutComponents = (): JSX.Element => {
  return (
    <Box>
      <HStack
        w={"100%"}
        h={"600px"}
        bg={"brand.100"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <HStack justifyContent={"space-between"} mr={"30px"}>
          <VStack ml={"70px"}>
            <Heading fontSize={"50px"}>What We Do</Heading>
            <Text fontFamily={"Poppins"} fontWeight={"300"} py={3} px={"5%"}>
              Aly is a sophisticated dashboard designed to provide an intuitive
              user experience. <Box py={3} />
              It features comprehensive Good Acre data and advanced
              functionality, including farm/crop search, producer and product
              overviews, and a predictive calculator utilizing random forest
              regression. <Box py={3} />
              The calculator incorporates environmental data such as sunlight,
              precipitation, and snow to enhance its accuracy in forecasting a
              producer's success in the coming months.
            </Text>
          </VStack>
          <Image
            src={"https://i.imgur.com/Vg5bKr7.jpg"}
            px={"10%"}
            maxW={"850px"}
          />
        </HStack>
      </HStack>
    </Box>
  );
};

export default PageLayoutComponents;
