import NavBar from "../components/Layout/NavBar";
import type { NextPage } from "next";
import { HStack, VStack, Box, Heading } from "@chakra-ui/react";
import PageLayout from "../components/Layout/PageLayout";

const Home: NextPage = () => {
  return (
    <PageLayout title={"geese, by minihacks"}>
      <Box px={[5, 10]}>
        <NavBar />
      </Box>
      <HStack>
        <HStack>
          // dotted lines on the far left
          <svg
            width="134"
            height="57"
            viewBox="0 0 134 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-262.426 18.3522C-238.26 14.7084 -214.082 10.9651 -189.902 7.43887C-152.8 2.02838 -121.961 1.55612 -90.8826 3.57983C-48.7902 6.32075 -12.716 13.429 17.4715 21.6974C56.0859 32.2739 63.148 58.9917 131.736 54.1137"
              stroke="#4292A0"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-dasharray="8 16"
            />
          </svg>
          // dotted line in the middle
          <svg
            width="337"
            height="69"
            viewBox="0 0 337 69"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.00256 62.6756C21.425 64.0131 40.8612 65.4487 60.2894 66.668C90.0992 68.5388 114.673 66.0904 139.312 61.1368C172.683 54.4277 175.749 35.9735 212.932 18.8304C250.115 1.68738 275.234 1.93659 334.818 2.52774"
              stroke="#4292A0"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-dasharray="8 16"
            />
          </svg>
          // dotted line on the far right
          <svg
            width="203"
            height="84"
            viewBox="0 0 203 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.00256 6.03331C18.6155 4.88923 35.2394 3.64734 51.8584 2.62151C77.3581 1.04752 98.4187 3.73784 119.559 8.93234C148.192 15.9678 172.572 26.7255 192.896 38.0326C218.894 52.4961 242.277 68.0914 269.789 81.9436"
              stroke="#4292A0"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-dasharray="8 16"
            />
          </svg>
        </HStack>
      </HStack>
    </PageLayout>
  );
};

export default Home;
