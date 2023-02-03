import { Button, Box } from "@chakra-ui/react";
import {useState} from "react";

const GetStarted = () => {
    const [hover, setHover] = useState(false);

    const handleHover = () => {
        setHover(true);
    };

    const handleLeave = () => {
        setHover(false);
    };
    return (
        <Button
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            colorScheme={"brand"}
            /*IMPORT GOTO SOMEWHERE*/

            style={{
                position: "absolute",
                width: "254.7px",
                height: "81px",
                left: "120px",
                top: "544px",
                background: "brand",
                boxShadow: hover ? "2px 2px 0px #CEECEF" : "6px 8px 0px #CEECEF",
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
        >
            Get Started</Button>
    )
};

export default GetStarted;
