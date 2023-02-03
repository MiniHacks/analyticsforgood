import {
  Box,
  Button,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";

import React from "react";
import Sidebar from "../components/Sidebar";
import ShadowCard from "../components/ShadowCard";

const MainContent = (): JSX.Element => {
  return (
    <VStack ml={"200px"} mt={12} px={8} alignItems={"start"} width={"100%"}>
      <HStack justifyContent={"space-between"} width={"100%"}>
        <Heading fontSize={48}>Carrots</Heading>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            colorScheme={"brand"}
            variant={"outline"}
          >
            Actions
          </MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      <ShadowCard p={6} pt={0}>
        <TableContainer>
          <Table variant={"simple"}>
            <TableCaption placement={"top"}>
              Imperial to metric conversion factors
            </TableCaption>
            <Thead>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr
                _hover={{
                  backgroundColor: "brand.100",
                  cursor: "pointer",
                }}
              >
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
              <Tr
                _hover={{
                  backgroundColor: "brand.100",
                  cursor: "pointer",
                }}
              >
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td isNumeric>30.48</Td>
              </Tr>
              <Tr
                _hover={{
                  backgroundColor: "brand.100",
                  cursor: "pointer",
                }}
              >
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </ShadowCard>
    </VStack>
  );
};

const Dash = (): JSX.Element => {
  return (
    <Box
      minHeight={"100vh"}
      backgroundColor={"brand.100"}
      display={"flex"}
      flexDirection={"row"}
      px={6}
    >
      <Sidebar />
      <MainContent />
    </Box>
  );
};

export default Dash;
