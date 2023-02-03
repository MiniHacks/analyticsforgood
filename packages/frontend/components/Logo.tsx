import { chakra, Heading } from "@chakra-ui/react";

const Logo = (): JSX.Element => (
  <Heading
    fontFamily={"'Baloo 2', sans-serif"}
    fontSize={"45px"}
    color={"brand.600"}
  >
    <a href={"#home"}>
      <chakra.span color={"brand.600"}>aly</chakra.span>
      <chakra.span color={"brand.400"}>.so</chakra.span>
    </a>
  </Heading>
);

export default Logo;
