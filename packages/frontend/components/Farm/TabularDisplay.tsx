import {
  Badge,
  Spinner,
  Table,
  TableCaption,
  TableCellProps,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { order as Order, producer as Producer } from "@prisma/client";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { useRouter } from "next/router";
import { CROP_MAPPING, money } from "../../util/lib";

type TabularDisplayProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  loading: boolean;
};

export type FilledOrder = Order & {
  producer: Producer;
};

const HEADINGS = ["ID", "Date", "QTY", "Cost", "Price", "Producer"];

const NUMERIC_COLUMNS = [3, 4, 5];

const TableDataCell = ({ children, ...props }: TableCellProps) => (
  <Td py={1} {...props}>
    {children}
  </Td>
);
const TabularDisplay = ({
  data,
  loading,
}: TabularDisplayProps): JSX.Element => {
  const router = useRouter();
  if (loading) return <Spinner />;

  const headingRow = (
    <Tr>
      {HEADINGS.map((heading, index) => (
        <Th key={heading} isNumeric={NUMERIC_COLUMNS.includes(index)}>
          {heading}
        </Th>
      ))}
    </Tr>
  );

  // the type of row is the prisma order schema:
  const rows = data.map((order: FilledOrder) => {
    const year = format(new Date(order.date), "yyyy");
    const color = parseInt(year, 10) % 2 ? "blue" : "purple";

    return (
      <Tr
        fontSize={"sm"}
        _hover={{
          backgroundColor: "brand.100",
          cursor: "pointer",
        }}
        onClick={() => router.push(`/prod/${order.prod_id}`)}
      >
        <TableDataCell color={"gray.400"}>{order.id}</TableDataCell>
        <TableDataCell>
          <Tag size={"sm"} colorScheme={color}>
            {year}
          </Tag>
          <Tag size={"sm"} colorScheme={"white"}>
            {format(new Date(order.date), "MM/dd")}
          </Tag>
        </TableDataCell>
        <TableDataCell isNumeric>{order.quantity}</TableDataCell>
        <TableDataCell isNumeric>{money(order.cost)}</TableDataCell>
        <TableDataCell isNumeric>{money(order.price)}</TableDataCell>
        <TableDataCell display={"flex"} justifyContent={"space-between"}>
          <span>
            <Badge>{order.prod_id}</Badge> {CROP_MAPPING[order.prod_id]}
          </span>
          <ExternalLinkIcon color={"brand.500"} />
        </TableDataCell>
      </Tr>
    );
  });

  return (
    <TableContainer>
      <Table variant={"simple"}>
        <Thead>{headingRow}</Thead>
        <Tbody>{rows}</Tbody>
        <Tfoot>{headingRow}</Tfoot>
      </Table>
    </TableContainer>
  );
};

export default TabularDisplay;
