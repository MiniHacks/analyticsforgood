import { Collapse, Heading, Spinner, Tag, VStack } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import Card from "../Card";
import { searchDurations } from "../../util/config";
import GGCard from "../GGCard";
import { cma } from "../../util/lib";

const Classes = ({ searchResults, onClick }) => {
  if (
    searchResults === null ||
    !searchResults.success ||
    searchResults.data.crops?.length === 0
  ) {
    return null;
  }

  return (
    <VStack spacing={2} width={"100%"} align={"start"}>
      <Heading size={"md"} pt={4}>
        Crops
      </Heading>
      {searchResults.data.crops.map(([id, crop]) => (
        <GGCard key={id} href={`/prod/${id}`} onClick={onClick}>
          <Tag colorScheme={"teal"} mr={1}>
            #{id}
          </Tag>{" "}
          {cma(crop)}
        </GGCard>
      ))}
    </VStack>
  );
};

const Departments = ({ searchResults, onClick }) => {
  if (
    searchResults === null ||
    !searchResults.success ||
    searchResults.data.farms?.length === 0
  ) {
    return null;
  }

  return (
    <VStack spacing={2} width={"100%"} align={"start"}>
      <Heading size={"md"} pt={4}>
        Farms
      </Heading>
      {searchResults.data.farms.map((row) => (
        <GGCard key={row} href={`/farm/${row}`} onClick={onClick}>
          {row}
        </GGCard>
      ))}{" "}
    </VStack>
  );
};

export default function SearchResults({
  search,
  searchResults,
  pageShown: [showPage, setShowPage],
}) {
  const clickHandler = useCallback(() => {
    setShowPage(true);
  }, [setShowPage]);
  return (
    <Collapse
      in={!showPage}
      transition={{
        exit: { duration: searchDurations.enter },
        enter: {
          duration: (3 * searchDurations.exit) / 4,
          delay: searchDurations.exit / 8,
        },
      }}
      width={"100%"}
    >
      <VStack
        spacing={4}
        width={"100%"}
        align={"start"}
        px={2}
        pt={2}
        pb={16}
        pr={64}
        minH={"100vh"}
      >
        <Heading pt={4}>
          Search Results for &ldquo;{search.trim()}&rdquo;
        </Heading>
        {/* no results box: */}
        {searchResults !== null &&
          searchResults.data.crops?.length +
            searchResults.data.farms?.length ===
            0 && (
            <Heading size={"md"} pt={4}>
              No results found.
            </Heading>
          )}
        {/* Loading indicator: */}
        {searchResults === null && (
          <Heading size={"md"} pt={4}>
            <Spinner size={"sm"} mr={2} />
            Loading...
          </Heading>
        )}
        <Departments searchResults={searchResults} onClick={clickHandler} />
        <Classes searchResults={searchResults} onClick={clickHandler} />
      </VStack>
    </Collapse>
  );
}
