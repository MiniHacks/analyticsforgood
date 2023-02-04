import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import React from "react";
import CropDropDown from "../components/Layout/Dropdown";
import { useSearch } from "../components/Search/useSearch";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/Search/SearchBar";
import SearchResults from "../components/Search/SearchResults";

const Calculator = (): JSX.Element => {
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
      <Box pl={232} pt={90}>
        <CropDropDown />
      </Box>
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

export default Calculator;
