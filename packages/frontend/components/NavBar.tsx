import {
    Box,
    Button,
    Heading,
    HStack,
    VStack,
    Text,
    Input,
} from "@chakra-ui/react";
import Logo from "./Logo";

const NavBar = (): JSX.Element => {
    return (
        <Box
            color={"black"}
            py={7}
            bg={"transparent"}
            top={"0"}
            zIndex={"100"}
        >
            <HStack px={"5%"} justifyContent={"space-between"}>
                <Logo/>
                <HStack>
                    <Button
                        variant={"solid"}
                        fontWeight={"200"}
                        fontFamily={"Poppins"}
                        fontSize={"18px"}
                        colorScheme={"white"}
                        color={"brand.600"}
                    >
                        LOGIN
                    </Button>
                    <Button
                        variant={"solid"}
                        fontWeight={"200"}
                        fontFamily={"Poppins"}
                        fontSize={"18px"}
                        borderRadius={"25px"}
                        colorScheme={"white"}
                        color={"brand.600"}
                    >
                        GET STARTED
                    </Button>
                </HStack>
            </HStack>
        </Box>
    );
};

export default NavBar
