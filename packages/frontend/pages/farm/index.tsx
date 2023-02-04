import {
  Badge,
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
  Table,
  TableCellProps,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";

import { ChevronDownIcon, ExternalLinkIcon } from "@chakra-ui/icons";

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
import { format } from "date-fns";
import { FaHandHoldingWater } from "react-icons/fa";
import { BiLandscape } from "react-icons/bi";
import Sidebar from "../../components/Sidebar";
import ShadowCard from "../../components/ShadowCard";
import TabularDisplay, { FilledOrder } from "../../components/TabularDisplay";
import TabularDisplayPlans, {
  FilledPlan,
} from "../../components/TabularDisplayPlans";
import { CROP_MAPPING, money, nato } from "../../util/lib";
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
  pid: number;
};
const TableDataCell = ({ children, ...props }: TableCellProps) => (
  <Td py={1} {...props}>
    {children}
  </Td>
);
const HEADINGS = [
  "ID",
  "Name",
  "OTIF",
  "OT + Partial",
  "Avg Fulfillment",
  "Land Ownership",
  "Water Access",
];
const NUMERIC_COLUMNS = [3, 4, 5];

const ProductDisplay = ({ pid }: ProductDisplayType): JSX.Element => {
  const [data, setData] = useState<ProductDisplayType[]>([]);
  const [loading, setLoading] = useState(true);
  const [onTimeInFull, setOnTimeInFull] = useState(0);
  const [onTime, setOnTime] = useState(0);
  const [avgFulfillment, setAvgFulfillment] = useState(0);

  const router = useRouter();
  const [dates, setDates] = useState<string[]>([]);
  const [chartJSData, setChartJSData] = useState<any>({});

  useEffect(() => {
    setLoading(true);
    fetch(`/api/summary`)
      .then((res) => res.json())
      .then((d) => {
        setData(d.producers);
        setLoading(false);
      });
  }, []);

  const headingRow = (
    <Tr>
      {HEADINGS.map((heading, index) => (
        <Th key={heading} isNumeric={NUMERIC_COLUMNS.includes(index)}>
          {heading}
        </Th>
      ))}
    </Tr>
  );

  const rows = data
    .filter((a) => a.total)
    ?.sort((a, b) => (a.OTIF / a.total > b.OTIF / b.total ? -1 : 1))
    .map((procut: ProductDisplayType) => {
      return (
        <Tr
          fontSize={"sm"}
          _hover={{
            backgroundColor: "brand.100",
            cursor: "pointer",
          }}
          onClick={() => router.push(`/farm/${procut.code}`)}
        >
          <TableDataCell color={"gray.400"}>{procut.code}</TableDataCell>
          <TableDataCell>{nato(procut.code)}</TableDataCell>
          <TableDataCell isNumeric>
            {((procut.OTIF * 100) / procut.total).toFixed(2)}%
          </TableDataCell>
          <TableDataCell isNumeric>
            {((procut.OT * 100) / procut.total).toFixed(2)}%
          </TableDataCell>
          <TableDataCell isNumeric>
            {((procut.FA * 100) / procut.total).toFixed(2)}%
          </TableDataCell>
          <TableDataCell textAlign={"center"}>
            {procut.land_ownership && (
              <Tag colorScheme={"orange"} size={"lg"}>
                <BiLandscape />
              </Tag>
            )}
          </TableDataCell>
          <TableDataCell textAlign={"center"}>
            {procut?.water_access && (
              <Tag colorScheme={"blue"} size={"lg"}>
                <FaHandHoldingWater />
              </Tag>
            )}
          </TableDataCell>
          {/* <TableDataCell> */}
          {/*  <Tag size={"sm"} colorScheme={color}> */}
          {/*    {year} */}
          {/*  </Tag> */}
          {/*  <Tag size={"sm"} colorScheme={"white"}> */}
          {/*    {format(new Date(order.date), "MM/dd")} */}
          {/*  </Tag> */}
          {/* </TableDataCell> */}
          {/* <TableDataCell isNumeric>{order.quantity}</TableDataCell> */}
          {/* <TableDataCell isNumeric>{money(order.cost)}</TableDataCell> */}
          {/* <TableDataCell isNumeric>{money(order.price)}</TableDataCell> */}
          {/* <TableDataCell display={"flex"} justifyContent={"space-between"}> */}
          {/*  <span> */}
          {/*    <Badge>{order.prod_id}</Badge> {CROP_MAPPING[order.prod_id]} */}
          {/*  </span> */}
          {/*  <ExternalLinkIcon color={"brand.500"} /> */}
          {/* </TableDataCell> */}
        </Tr>
      );
    });

  return (
    <VStack ml={"200px"} mt={24} px={8} alignItems={"start"} width={"100%"}>
      <title>aly.so - producers</title>
      <HStack justifyContent={"space-between"} width={"100%"}>
        <VStack alignItems={"start"} spacing={2} pb={4}>
          <Heading fontSize={48}>Producers</Heading>
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
            <MenuItem>Download as Excel</MenuItem>
            <MenuItem>Upload CSV</MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      {/* <Collapse */}
      {/*  in={!loading} */}
      {/*  style={{ */}
      {/*    width: "100%", */}
      {/*  }} */}
      {/* > */}
      {/*  <ShadowCard p={4} width={"100%"}> */}
      {/*    {chartJSData.labels && <Line options={options} data={chartJSData} />} */}
      {/*  </ShadowCard> */}
      {/* </Collapse> */}

      <HStack justifyContent={"center"} width={"100%"} pb={8}>
        <ShadowCard p={6} pt={3} width={"100%"}>
          <TableContainer>
            <Table variant={"simple"}>
              <Thead>{headingRow}</Thead>
              <Tbody>{rows}</Tbody>
              <Tfoot>{headingRow}</Tfoot>
            </Table>
          </TableContainer>
        </ShadowCard>
      </HStack>
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
