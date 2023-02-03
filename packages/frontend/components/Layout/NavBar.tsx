import {
    Box,
    Button,
    Heading,
    HStack,
    VStack,
    Text,
    Input,
} from "@chakra-ui/react";

const NavBar = (): JSX.Element => {
    return (
        <Box
            color={"#2C344C"}
            py={7}
            top={"0"}
            zIndex={"100"}
            fontFamily={"Poppins"}
        >
            <HStack px={"5%"} justifyContent={"space-between"}>
                <Heading fontFamily={"Poppins"} fontSize={"45px"}>
                    <a href={"#home"}>aly</a>
                </Heading>
                <HStack>
                    <Button
                        variant={"solid"}
                        fontFamily={"Cabin"}
                        fontSize={"18px"}
                        colorScheme={"white"}
                        color={"#2C344C"}
                    >
                        <a href={"#home"}>Home</a>
                    </Button>
                    <Button
                        variant={"solid"}
                        fontFamily={"Cabin"}
                        fontSize={"18px"}
                        colorScheme={"white"}
                        color={"#2C344C"}
                    >
                        Login
                    </Button>
                    <Button
                        variant={"ghost"}
                        fontFamily={"Cabin"}
                        fontSize={"18px"}
                        borderRadius={"25px"}
                        backgroundColor={"#EECC6E"}
                        color={"#2C344C"}
                        colorScheme={"yellow"}
                    >
                        Get Started
                    </Button>
                </HStack>
            </HStack>
        </Box>
    );
};
