import {
  Box,
  Button,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../components/Sidebar";
import ShadowCard from "../../components/ShadowCard";
import TabularDisplay from "../../components/TabularDisplay";
import TabularDisplayPlans from "../../components/TabularDisplayPlans";

type ProductDisplayType = {
  pid: number;
};

const ProductDisplay = ({ pid }: ProductDisplayType): JSX.Element => {
  const [data, setData] = useState({ orders: {}, plans: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products?pid=${pid}`)
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      });
  }, [pid]);

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
      <ShadowCard p={6} pt={3}>
        <Tabs>
          <TabList>
            <Tab>Plans</Tab>
            <Tab>Orders</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <TabularDisplayPlans
                data={data?.plans}
                loading={loading}
                caption={"Planned carrots"}
              />
            </TabPanel>
            <TabPanel>
              <TabularDisplay
                data={data?.orders}
                loading={loading}
                caption={"Orders of carrots"}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ShadowCard>
      <HStack alignItems={"start"} pb={10}>
        <ShadowCard p={6} pt={0} />
      </HStack>
    </VStack>
  );
};

const Dash = (): JSX.Element => {
  const router = useRouter();
  const { productId } = router.query;
  const pid = parseInt(productId as string, 10);
  return (
    <Box
      minHeight={"100vh"}
      backgroundColor={"brand.100"}
      display={"flex"}
      flexDirection={"row"}
      px={6}
    >
      <Sidebar />
      <ProductDisplay pid={pid} />
    </Box>
  );
};

export default Dash;
