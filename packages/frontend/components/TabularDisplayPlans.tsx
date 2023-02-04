import {
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
import { planned as Planned, producer as Producer } from "@prisma/client";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { format } from "date-fns";
import { money } from "../util/lib";

type TabularDisplayProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  loading: boolean;
  caption: string;
  showPrice?: boolean;
};

type FilledPlan = Planned & {
  producer: Producer;
};

const HEADINGS = ["ID", "Date", "QTY", "QTY On Time", "Price", "Producer"];

const NUMERIC_COLUMNS = [3, 4, 5];

const TableDataCell = ({ children, ...props }: TableCellProps) => (
  <Td py={1} {...props}>
    {children}
  </Td>
);
const TabularDisplayPlans = ({
  data,
  loading,
  showPrice = true,
  caption,
}: TabularDisplayProps): JSX.Element => {
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
  const rows = data.map((plan: FilledPlan) => {
    const year = format(new Date(plan.date), "yyyy");
    const color = parseInt(year, 10) % 2 ? "blue" : "purple";

    const filled = Math.min(plan.quantity_fulfilled, plan.quantity);
    return (
      <Tr
        fontSize={"sm"}
        _hover={{
          backgroundColor: "brand.100",
          cursor: "pointer",
        }}
      >
        <TableDataCell color={"gray.400"}>{plan.id}</TableDataCell>
        <TableDataCell>
          <Tag size={"sm"} colorScheme={color}>
            {year}
          </Tag>
          <Tag size={"sm"} colorScheme={"white"}>
            {format(new Date(plan.date), "MM/dd")}
          </Tag>
        </TableDataCell>
        <TableDataCell isNumeric>{plan.quantity}</TableDataCell>
        <TableDataCell isNumeric>{filled}</TableDataCell>
        <TableDataCell isNumeric>{money(plan.cost)}</TableDataCell>
        <TableDataCell display={"flex"} justifyContent={"space-between"}>
          {plan.producer.code} <ExternalLinkIcon color={"brand.500"} />
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

export default TabularDisplayPlans;
