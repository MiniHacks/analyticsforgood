import { Button, Link } from "@chakra-ui/react";

const GetStarted = () => {
  return (
    <Button
      colorScheme={"brand"}
      style={{
        marginTop: "50px",
        width: "254.7px",
        height: "81px",
        background: "brand",
        boxShadow: "6px 6px 0px #CEECEF",
        borderRadius: "15px",
        font: "Poppins",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "24px",
        lineHeight: "118%",
        display: "flex",
        alignItems: "center",
        letterSpacing: "0.04em",
        color: "#FFFFFF",
      }}
      _hover={{
        boxShadow: "3px 3px 0px #CEECEF !important",
        backgroundColor: "brand.600",
        transform: "translate(3px, 4px)",
      }}
    >
      <Link href={"/dash"}>Get Started</Link>
    </Button>
  );
};

export default GetStarted;
