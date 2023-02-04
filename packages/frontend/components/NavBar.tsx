import { Box, Button, HStack } from "@chakra-ui/react";
import { useSession, signOut, signIn } from "next-auth/react";
import Logo from "./Logo";

const NavBar = (): JSX.Element => {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    window.location.href = "/dash";
  }

  console.log(status);

  async function handleGoogleSignIn() {
    signIn("google", { callbackUrl: "/dash" });
  }
  return (
    <Box color={"black"} py={7} bg={"transparent"} top={"0"} zIndex={"100"}>
      <HStack px={"5%"} justifyContent={"space-between"}>
        <Logo />
        <HStack>
          {!session ? (
            <Button
              variant={"solid"}
              fontWeight={"200"}
              fontFamily={"Poppins"}
              fontSize={"18px"}
              colorScheme={"white"}
              color={"brand.600"}
              onClick={handleGoogleSignIn}
              _hover={{
                transform: "translate(3px, 4px)",
              }}
            >
              Login
            </Button>
          ) : (
            <Button
              variant={"solid"}
              fontWeight={"200"}
              fontFamily={"Poppins"}
              fontSize={"18px"}
              colorScheme={"white"}
              color={"brand.600"}
              onClick={signOut}
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
