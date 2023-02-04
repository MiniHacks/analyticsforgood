import { Box, Button, HStack } from "@chakra-ui/react";
import Logo from "./Logo";
import { useSession, signOut } from "next-auth/react";

const NavBar = (): JSX.Element => {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    window.location.href = "/dash";
  }

  console.log(status);
  return (
    <Box color={"black"} py={7} bg={"transparent"} top={"0"} zIndex={"100"}>
      <HStack px={"5%"} justifyContent={"space-between"}>
        <Logo />
        <HStack>
          {!session ? (
            <>
              <Button
                variant={"solid"}
                fontWeight={"200"}
                fontFamily={"Poppins"}
                fontSize={"18px"}
                colorScheme={"white"}
                color={"brand.600"}
                onClick={() => window.open("https://accounts.google.com/o/oauth2/auth", "_blank")}
          _hover={{
            boxShadow: "3px 3px 0px #CEECEF !important",
            backgroundColor: "brand.200",
            transform: "translate(3px, 4px)",
          }}
              >
                Login
              </Button>
            </>
          ) : (
            <Button
              variant={"solid"}
              fontWeight={"200"}
              fontFamily={"Poppins"}
              fontSize={"18px"}
              colorScheme={"white"}
              color={"brand.600"}
              onClick={() => signOut()}
            >
              Logout {session.user.name}
            </Button>
          )}
          <Button
            variant={"solid"}
            fontWeight={"200"}
            fontFamily={"Poppins"}
            fontSize={"18px"}
            colorScheme={"white"}
            color={"brand.600"}
            _hover={{
              boxShadow: "3px 3px 0px #CEECEF !important",
              backgroundColor: "brand.200",
              transform: "translate(3px, 4px)",
            }}
          >
            Get Started
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
};

export default NavBar;
