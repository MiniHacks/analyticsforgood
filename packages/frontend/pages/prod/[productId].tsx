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
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../components/Sidebar";
import ShadowCard from "../../components/ShadowCard";
import TabularDisplay from "../../components/TabularDisplay";
import TabularDisplayPlans from "../../components/TabularDisplayPlans";
import { CROP_MAPPING } from "../../util/lib";
import { useSearch } from "../../components/Search/useSearch";
import SearchBar from "../../components/Search/SearchBar";
import SearchResults from "../../components/Search/SearchResults";

type ProductDisplayType = {
  pid: number;
};

const ProductDisplay = ({ pid }: ProductDisplayType): JSX.Element => {
  const [data, setData] = useState({ orders: {}, plans: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (!pid) return;
    fetch(`/api/products?pid=${pid}`)
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      });
  }, [pid]);

  const crop = CROP_MAPPING[pid];
  const cropName = crop?.split(",").reverse().join(" ");
  // @ts-ignore
  return (
    <VStack ml={"200px"} mt={24} px={8} alignItems={"start"} width={"100%"}>
      <HStack justifyContent={"space-between"} width={"100%"}>
        <VStack alignItems={"start"} spacing={2} pb={4}>
          <Heading fontSize={48}>{cropName}</Heading>
          <Tag colorScheme={"teal"}>Product #{pid}</Tag>
        </VStack>
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
              {(data?.plans as string)?.length === 0 && (
                <Text size={"md"}>No plans found</Text>
              )}
              {(data?.plans as string)?.length > 0 && (
                <TabularDisplayPlans data={data?.plans} loading={loading} />
              )}
            </TabPanel>
            <TabPanel>
              <TabularDisplay data={data?.orders} loading={loading} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ShadowCard>
    </VStack>
  );
};

const Dash = (): JSX.Element => {
  const router = useRouter();
  const { productId } = router.query;
  const pid = parseInt(productId as string, 10);
  const {
    search,
    searchResults,
    pageShown: [rawShowPage, setShowPage],
    handleChange,
  } = useSearch();

  const showPage = rawShowPage || !search;

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
      <Box
        position={"fixed"}
        left={254}
        top={0}
        width={"calc(100vw - 254px)"}
        backgroundColor={"brand.100"}
      >
        <Box pr={258} pt={8} width={"100%"}>
          <SearchBar onChange={handleChange} />
        </Box>
        <Box backgroundColor={"brand.100"} width={"100%"}>
          <SearchResults
            search={search}
            searchResults={searchResults}
            pageShown={[showPage, setShowPage]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dash;
