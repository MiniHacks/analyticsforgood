import { Box, Image } from "@chakra-ui/react";

const ExampleBox = (): JSX.Element => (
    <Box
        style={{
            position: "absolute",
            background: "white",
            top:"200px",
            left:"775px",
            width: "519px",
            height: "325px",
            borderColor: "brand.600",
            border: "5px solid #58C85C",
            boxShadow: "6px 6px 0px #CEECEF",
            borderRadius: "15px",
            transform: "rotate(8.72deg)",
        }}
    >
            {/*<Image>*/}
            {/*    <source srcSet="https://i.imgur.com/4ZQZ1Zu.png" />*/}
            {/*</Image>*/}
    </Box>
)

export default ExampleBox
