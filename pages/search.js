import { useState } from "react";
import { useRouter } from "next/router";
import { Flex, Box, Text, Icon, useColorMode } from "@chakra-ui/react";
import { RiFilter2Line } from "react-icons/ri";
import { GiDistraction } from "react-icons/gi";
import SearchFilter from "../components/SearchFilter";
import Property from "../components/Property";
import { fetchApi, baseUrl } from "../utils/fetchApi";

const Search = ({ properties }) => {
  const [toggleSearchFilter, setToggleSearchFilter] = useState(false);
  const router = useRouter();
  const { colorMode } = useColorMode();

  const handleClickFilter = () =>
    setToggleSearchFilter((prevState) => !prevState);

  return (
    <Box>
      <Flex
        cursor='pointer'
        bg={colorMode === "light" ? "gray.100" : "gray.700"}
        borderColor='gray.700'
        borderBottom='1px'
        p='2'
        fontWeight='black'
        fontSize='lg'
        justify='center'
        align='center'
        onClick={handleClickFilter}>
        <Text>Search Property By Filter</Text>
        <Icon as={RiFilter2Line} pl='2' w='7' />
      </Flex>
      {toggleSearchFilter && <SearchFilter />}

      <Text fontSize='2xl' p='4' fontWeight='bold'>
        Properties {router.query.purpose}
      </Text>
      <Flex wrap='wrap'>
        {properties.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      {properties.length === 0 && (
        <Flex justify='center' align='center' flexDir='column' my='5'>
          <Icon as={GiDistraction} w={100} h={100} color='red.700' />
          <Text fontSize='2xl' mt='3'>
            Oops, found no properties...
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default Search;

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || "for-rent";
  const rentFrequency = query.rentFrequency || "yearly";
  const minPrice = query.minPrice || "0";
  const maxPrice = query.maxPrice || "1000000";
  const roomsMin = query.roomsMin || "0";
  const bathsMin = query.bathsMin || "0";
  const sort = query.sort || "price-desc";
  const areaMax = query.areaMax || "35000";
  const locationExternalIDs = query.locationExternalIDs || "5002";
  const categoryExternalID = query.categoryExternalID || "4";
  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      properties: data?.hits,
    }, // will be passed to the page component as props
  };
}
