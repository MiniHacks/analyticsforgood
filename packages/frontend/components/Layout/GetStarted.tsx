import { Button } from "@chakra-ui/react";

const GetStarted = (): JSX.Element => (

        <Button
            colorScheme={"brand"}
            /*IMPORT GOTO SOMEWHERE*/
            style={{
                position: "absolute",
                width: "283px",
                height: "90px",
                left: "149px",
                top: "544px",
                background: "#58BAC8",
                boxShadow: "6px 6px 0px #CEECEF",
                borderRadius: "15px",
                font: "Popins",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "24px",
                lineHeight: "118%",
                display: "flex",
                alignItems: "center",
                letterSpacing: "0.04em",
                color: "#FFFFFF",
            }}
        >
            Get Started</Button>
);

export default GetStarted;
