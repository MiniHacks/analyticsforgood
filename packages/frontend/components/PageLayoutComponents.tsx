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
        <HStack justifyContent={"space-between"} mr={"100px"}>
          <VStack>
            <Heading fontSize={"50px"}>What We Do</Heading>
            <Text fontFamily={"Poppins"} fontWeight={"300"} px={"20%"}>
              Aly is a sophisticated dashboard designed to provide an intuitive
              user experience. It features comprehensive Good Acre data and advanced
              functionality, including farm/crop search, producer and product overviews,
              and a predictive calculator utilizing random forest regression. The calculator
              incorporates environmental data such as sunlight, precipitation, and snow to enhance
              its accuracy in forecasting a producer's success in the coming months.
            </Text>
          </VStack>
          <Image src={"https://picsum.photos/500/300"} px={8} />
        </HStack>
      </HStack>
    </Box>
  );
};

export default PageLayoutComponents;
