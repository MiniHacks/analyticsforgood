import { VStack, Box, Text } from "@chakra-ui/react";

const NumberGraphCard = (): JSX.Element => (
  <Box
    style={{
      position: "absolute",
      width: "287.08px",
      height: "148px",
      left: "179px",
      top: "154px",
      background: "#FFFFFF",
      boxShadow: "20px 20px 50px rgba(30, 141, 203, 0.08)",
      borderRadius: "44px",
    }}
  >
    <VStack>
      <Text
        fontFamily={"Inter"}
        fontWeight={"300"}
        style={{
          width: "154.69px",
          height: "20.08px",
          left: "210.98px",
          top: "177.8px",
          color: "rgba(0, 58, 77, 0.5)",
          lineHeight: "19px",
          letterSpacing: "-0.03rem",
        }}
      >
        number of something
      </Text>
      <Text
        fontFamily={"Inter"}
        fontWeight={700}
        fontSize={"71px"}
        style={{
          width: "44.62px",
          height: "84.04px",
          left: "211px",
          top: "198px",

          color: "#003A4D",
        }}
      >
        5
      </Text>
    </VStack>
  </Box>
);

export default NumberGraphCard;
