import { HStack, Box, Text, Heading, VStack, Image } from "@chakra-ui/react";
import React from "react";

const PageLayoutComponents = (): JSX.Element => {
  return (
    <Box>
      <HStack
        marginTop={"300px"}
        w={"100%"}
        h={"600px"}
        bg={"white"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <HStack justifyContent={"space-between"} mr={"100px"} ml={"50px"}>
          <VStack>
            <Heading fontSize={"50px"}>What We Do</Heading>
            <Text fontFamily={"Poppins"} fontWeight={"300"} px={"20%"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              vitae tincidunt nibh. Sed tempus augue nulla, nec luctus arcu
              dignissim ut. Praesent et urna convallis, auctor urna in, vehicula
              lorem. Aenean vel massa id mauris finibus facilisis. Integer
              scelerisque velit ut viverra varius. Duis vitae eros ac libero
              finibus lobortis eu et orci. Duis lacinia non augue id porta.
              Quisque in orci eget leo placerat pellentesque. Pellentesque
              consequat sodales est nec facilisis.
            </Text>
          </VStack>
          <Image src={"https://picsum.photos/500/300"} px={8} />
        </HStack>
      </HStack>
    </Box>
  );
};

export default PageLayoutComponents;
