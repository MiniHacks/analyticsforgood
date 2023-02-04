import {
  Box,
  Button,
  chakra,
  Collapse,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
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
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FaHandHoldingWater } from "react-icons/fa";
import { BiLandscape } from "react-icons/bi";
import Sidebar from "../../components/Sidebar";
import ShadowCard from "../../components/ShadowCard";
import TabularDisplay, {
  FilledOrder,
} from "../../components/Farm/TabularDisplay";
import TabularDisplayPlans, {
  FilledPlan,
} from "../../components/Farm/TabularDisplayPlans";
import { CROP_MAPPING, nato } from "../../util/lib";
import { useSearch } from "../../components/Search/useSearch";
import SearchBar from "../../components/Search/SearchBar";
import SearchResults from "../../components/Search/SearchResults";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  elements: {
    line: {
      tension: 0.2,
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Order/Plan Activity",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const sampleData = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => Math.random() * 2000 - 1000),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => Math.random() * 2000 - 1000),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

type ProductDisplayType = {
  farmCode: string;
};

const ProductDisplay = ({ farmCode }: ProductDisplayType): JSX.Element => {
  const [data, setData] = useState<{
    orders: FilledOrder[];
    plans: FilledPlan[];
    producer: Record<string, string>;
  }>({ orders: [], plans: [], producer: {} });
  const [loading, setLoading] = useState(true);
  const [onTimeInFull, setOnTimeInFull] = useState(0);
  const [onTime, setOnTime] = useState(0);
  const [avgFulfillment, setAvgFulfillment] = useState(0);

  const [dates, setDates] = useState<string[]>([]);
  const [chartJSData, setChartJSData] = useState<any>({});

  useEffect(() => {
    setLoading(true);
    if (!farmCode) return;
    fetch(`/api/farm?farmCode=${farmCode}`)
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
        const total = d.plans.length;
        const fulfilled = d.plans.filter(
          (p: FilledPlan) => p.quantity <= p.quantity_fulfilled
        ).length;
        const partial = d.plans.filter(
          (p: FilledPlan) => p.quantity_fulfilled > 0
        ).length;
        const totalFulfillment = d.plans.reduce(
          (acc: number, p: FilledPlan) => acc + p.quantity_fulfilled,
          0
        );

        const totalQuantity = d.plans.reduce(
          (acc: number, p: FilledPlan) => acc + p.quantity,
          0
        );

        setOnTimeInFull(Math.round((fulfilled / total) * 100));
        setOnTime(Math.round((partial / total) * 100));
        setAvgFulfillment(Math.round((totalFulfillment / totalQuantity) * 100));
        setDates(
          Array.from(
            new Set([
              ...d.plans.map((p: FilledPlan) => p.date),
              ...d.orders.map((o: FilledOrder) => o.date),
            ])
          )
            .map((a) => new Date(a).valueOf())
            .sort()
            .map((a) => new Date(a).toLocaleDateString())
        );
      });
  }, [farmCode]);

  useEffect(() => {
    if (!data?.orders) return;
    const orderVals = new Array(dates.length).fill(0);
    data.orders?.forEach((o: FilledOrder) => {
      const idx = dates.indexOf(new Date(o.date).toLocaleDateString());
      orderVals[idx] += o.quantity;
    });

    const planVals = new Array(dates.length).fill(0);
    data.plans?.forEach((p: FilledPlan) => {
      const idx = dates.indexOf(new Date(p.date).toLocaleDateString());
      planVals[idx] += p.quantity;
    });

    const fulfilledVals = new Array(dates.length).fill(0);
    data.plans?.forEach((p: FilledPlan) => {
      const idx = dates.indexOf(new Date(p.date).toLocaleDateString());
      orderVals[idx] += p.quantity_fulfilled;
    });

    const chartData = {
      labels: dates,
      datasets: [
        {
          label: "Orders",
          data: orderVals,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Plans",
          data: planVals,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };

    setChartJSData(chartData);
  }, [dates]);

  return (
    <VStack ml={"200px"} mt={24} px={8} alignItems={"start"} width={"100%"}>
      <HStack justifyContent={"space-between"} width={"100%"}>
        <VStack alignItems={"start"} spacing={2} pb={4}>
          <Heading fontSize={48}>{nato(farmCode)}</Heading>
          <Collapse in={!loading}>
            <HStack>
              <Tag colorScheme={"gray"} size={"lg"}>
                Provider Code: {farmCode}
              </Tag>
              {data.producer?.water_access && (
                <Tag colorScheme={"blue"} size={"lg"}>
                  <FaHandHoldingWater />
                  <chakra.span ml={2}>Irrigation Access</chakra.span>
                </Tag>
              )}
              {data.producer?.land_ownership && (
                <Tag colorScheme={"orange"} size={"lg"}>
                  <BiLandscape />
                  <chakra.span ml={2}>Landowner</chakra.span>
                </Tag>
              )}
            </HStack>
          </Collapse>
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
      <Collapse
        in={!loading}
        style={{
          width: "100%",
        }}
      >
        <HStack spacing={2} width={"100%"}>
          <ShadowCard p={4} flexGrow={1}>
            <VStack spacing={0} alignItems={"center"}>
              <Heading fontSize={"72px"} color={"brand.700"}>
                {onTimeInFull}
                <chakra.span fontSize={"36px"}>%</chakra.span>
              </Heading>
              <Text
                color={"brand.600"}
                style={{
                  textTransform: "uppercase",
                  fontWeight: 500,
                  fontSize: "18px",
                  letterSpacing: "-0.4px",
                }}
              >
                On Time &amp; In Full
              </Text>
            </VStack>
          </ShadowCard>
          <ShadowCard p={4} flexGrow={1}>
            <VStack spacing={0} alignItems={"center"}>
              <Heading fontSize={"72px"} color={"brand.600"}>
                {onTime}
                <chakra.span fontSize={"36px"}>%</chakra.span>
              </Heading>
              <Text
                color={"brand.500"}
                style={{
                  textTransform: "uppercase",
                  fontWeight: 500,
                  fontSize: "18px",
                  letterSpacing: "-0.4px",
                }}
              >
                On Time
              </Text>
            </VStack>
          </ShadowCard>
          <ShadowCard p={4} flexGrow={1}>
            <VStack spacing={0} alignItems={"center"}>
              <Heading fontSize={"72px"} color={"brand.600"}>
                {avgFulfillment}
                <chakra.span fontSize={"36px"}>%</chakra.span>
              </Heading>
              <Text
                color={"brand.500"}
                style={{
                  textTransform: "uppercase",
                  fontWeight: 500,
                  fontSize: "18px",
                  letterSpacing: "-0.4px",
                }}
              >
                Fulfillment Avg
              </Text>
            </VStack>
          </ShadowCard>
        </HStack>
      </Collapse>
      <Collapse
        in={!loading}
        style={{
          width: "100%",
        }}
      >
        <ShadowCard p={4} width={"100%"}>
          {chartJSData.labels && <Line options={options} data={chartJSData} />}
        </ShadowCard>
      </Collapse>

      <HStack justifyContent={"center"} width={"100%"} pb={8}>
        <ShadowCard p={6} pt={3} width={"100%"}>
          {loading ? (
            <Spinner />
          ) : (
            <Tabs>
              <TabList justifyContent={"center"}>
                <Tab>Plans</Tab>
                <Tab>Orders</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  {data.plans?.length === 0 && (
                    <Text size={"md"}>No plans found</Text>
                  )}
                  {data.plans?.length > 0 && (
                    <TabularDisplayPlans data={data?.plans} loading={loading} />
                  )}
                </TabPanel>
                <TabPanel>
                  <TabularDisplay data={data?.orders} loading={loading} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}
        </ShadowCard>
      </HStack>
    </VStack>
  );
};

const Dash = (): JSX.Element => {
  const router = useRouter();
  const { farmCode } = router.query;

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
      <ProductDisplay farmCode={farmCode as string} />
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
