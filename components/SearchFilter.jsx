import { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  Input,
  Select,
  Icon,
  Spinner,
  Button,
  CloseButton,
  useColorMode,
} from "@chakra-ui/react";
import { MdTimer } from "react-icons/md";
import { useRouter } from "next/router";
import { filterData, getFilterValues } from "../utils/filterData";
import { baseUrl, fetchApi } from "../utils/fetchApi";

const SearchFilter = () => {
  const router = useRouter();
  const [filters, setFilters] = useState(filterData);
  const [locationMenu, setLocationMenu] = useState(false);
  const [locationData, setLocationData] = useState();
  const [searchField, setSearchField] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (searchField !== "") {
      const fetchLocation = async () => {
        setIsLoading(true);
        const data = await fetchApi(
          `${baseUrl}/auto-complete?query=${searchField}`
        );
        setIsLoading(false);
        setLocationData(data?.hits);
      };
      fetchLocation();
    }
  }, [searchField]);

  const searchProperties = (filterValues) => {
    const { query, pathname } = router;
    const values = getFilterValues(filterValues);

    for (let item of values) {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    }
    router.push({ pathname, query });
  };
  return (
    <Flex
      bg={colorMode === "light" ? "gray.100" : "gray.700"}
      p='4'
      wrap='wrap'
      justify='center'>
      {filters.map((filter) => {
        const handleChange = (e) =>
          searchProperties({ [filter.queryName]: e.target.value });

        return (
          <Box key={filter.queryName}>
            <Select
              placeholder={filter.placeholder}
              w='fit-content'
              p='2'
              onChange={handleChange}>
              {filter.items.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Box>
        );
      })}
      <Flex flexDir='column'>
        <Button
          onClick={() => setLocationMenu(!locationMenu)}
          border='1px'
          borderColor='gray.200'
          marginTop='2'>
          Search Location
        </Button>
        {locationMenu && (
          <Flex flexDir='column' pos='relative' paddingTop='2'>
            <Input
              placeholder='Type Here'
              value={searchField}
              w='300px'
              focusBorderColor='gray.300'
              onChange={(e) => setSearchField(e.target.value)}
            />
            {searchField !== "" && (
              <CloseButton
                pos='absolute'
                cursor='pointer'
                right='3'
                top='4'
                zIndex='100'
                size='sm'
                onClick={() => {
                  setSearchField("");
                  setLocationMenu(false);
                }}
              />
            )}
            {isLoading && <Spinner margin='auto' marginTop='3' />}
            {locationMenu && (
              <Box height='300px' overflow='auto'>
                {locationData?.map((location) => (
                  <Box
                    key={location.id}
                    onClick={() => {
                      searchProperties({
                        locationExternalIDs: location.externalID,
                      });
                      setSearchField(location.name);
                      setLocationMenu(false);
                    }}>
                    <Text
                      cursor='pointer'
                      bg='gray.200'
                      p='2'
                      borderBottom='1px'
                      borderColor='gray.100'>
                      {location.name}
                    </Text>
                  </Box>
                ))}
                {!isLoading && !locationData?.length && (
                  <Flex
                    justifyContent='center'
                    alignItems='center'
                    flexDir='column'
                    marginTop='5'
                    marginBottom='5'>
                    <Icon as={MdTimer} w='100px' />
                    <Text fontSize='xl' marginTop='3'>
                      Waiting to search!
                    </Text>
                  </Flex>
                )}
              </Box>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default SearchFilter;
