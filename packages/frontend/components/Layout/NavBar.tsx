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
            color={"black"}
            py={7}
            bg={"white"}
            top={"0"}
            zIndex={"100"}
        >
            <HStack px={"5%"} justifyContent={"space-between"}>
                <Heading fontFamily={"'Baloo 2', sans-serif"} fontSize={"45px"} color={"brand.600"}>
                    <a href={"#home"}>aly</a>
                </Heading>
                <HStack>
                    <Button
                        variant={"solid"}
                        fontFamily={"Poppins"}
                        fontSize={"18px"}
                        colorScheme={"white"}
                        color={"brand.600"}
                    >
                        <a href={"#home"}>Home</a>
                    </Button>
                    <Button
                        variant={"solid"}
                        fontFamily={"Poppins"}
                        fontSize={"18px"}
                        colorScheme={"white"}
                        color={"brand.600"}
                    >
                        Login
                    </Button>
                    <Button
                        variant={"ghost"}
                        fontFamily={"Poppins"}
                        fontSize={"18px"}
                        borderRadius={"25px"}
                        backgroundColor={""}
                        color={"brand.600"}
                    >
                        Get Started
                    </Button>
                </HStack>
            </HStack>
        </Box>
    );
};

export default NavBar
