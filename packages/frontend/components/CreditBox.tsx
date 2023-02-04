import { HStack, Box, Text, Heading, VStack} from "@chakra-ui/react";
import React from "react";

const Credits = (): JSX.Element => {
    return (
        <Box>
            <HStack
                w={"100%"}
                h={"200px"}
                bg={"white"}
                justifyContent={"center"}
                fontFamily={"Poppins"}
            >
                <HStack justifyContent={"space-between"}>
                    <VStack alignItems={"left"}>
                        <Text fontSize={"25px"} fontWeight={"500"}>Made For "Analytics For Good Hackathon"</Text>
                        <Text>
                            Hacked together by <a href = "https://yok.dev"> Samyok</a>, <a href = "https://github.com/Kanishk-K">Kanishk</a>, <a href = "https://anshpa.tel">Ansh</a>, <a href = "https://brandonlam.dev">Brandon</a>,  and <a href = "https://iamstuti.com">Stuti</a>. We all study
                            Computer Science at the University of Minnesota, Twin Cities.
                        </Text>
                        <Text>Star us on <a href = "https://github.com/minihacks/goodaly">Github.</a>
                        </Text>
                    </VStack>
                </HStack>
            </HStack>
        </Box>
    );
};

export default Credits;
