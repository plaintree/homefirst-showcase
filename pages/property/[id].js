import React from "react";
import {
  Box,
  Flex,
  Spacer,
  Text,
  Avatar,
  Icon,
  Wrap,
  WrapItem,
  useColorMode,
} from "@chakra-ui/react";
import {
  FaBed,
  FaRulerCombined,
  FaCheckCircle,
  FaBath,
  FaBullseye,
} from "react-icons/fa";
import millify from "millify";
import ImageScrollbar from "../../components/ImageScrollbar";

import { baseUrl, fetchApi } from "../../utils/fetchApi";

const PropertyDetail = ({ propertyDetails }) => {
  const {
    externalID,
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    furnishingStatus,
    amenities,
    photos,
    purpose,
  } = propertyDetails;
  const { colorMode } = useColorMode();
  return (
    <Box maxW='7xl' m='auto' p='4'>
      {photos && <ImageScrollbar data={photos} />}
      <Box w='full' p='6'>
        <Flex pt='2' align='center' justify='space-between'>
          <Flex align='center'>
            <Box pr='3'>
              {isVerified ? (
                <Icon as={FaCheckCircle} color='green.400' />
              ) : (
                <Icon as={FaBullseye} color='yellow.400' />
              )}
            </Box>

            <Text fontWeight='bold' fontSize='lg'>
              AED {millify(price)}
              {rentFrequency && `/${rentFrequency}`}
            </Text>
          </Flex>
          <Spacer />
          <Box>
            <Avatar size='md' src={agency?.logo?.url} />
          </Box>
        </Flex>
        <Flex
          p='1'
          w={250}
          color='yellow.500'
          align='center'
          justify='space-between'>
          <Icon as={FaBed} />
          {rooms} | <Icon as={FaBath} />
          {baths} | <Icon as={FaRulerCombined} />
          {millify(area)} sqft
        </Flex>
        <Box mt='2'>
          <Text fontSize='lg' mb='2' fontWeight='bold'>
            {title}
          </Text>
          <Text lineHeight='2' fontSize='sm'>
            {description}
          </Text>
        </Box>
        <Flex wrap='wrap' textTransform='uppercase' justify='space-between'>
          <Flex
            justify='space-between'
            w={400}
            borderColor='gray.100'
            p='3'
            borderBottom='1px'>
            <Text>Type</Text>
            <Text fontWeight='bold'>{type}</Text>
          </Flex>
          <Flex
            justify='space-between'
            w={400}
            borderColor='gray.100'
            p='3'
            borderBottom='1px'>
            <Text>Purpose</Text>
            <Text fontWeight='bold'>{purpose}</Text>
          </Flex>
          {furnishingStatus && (
            <Flex
              justify='space-between'
              w={400}
              borderColor='gray.100'
              p='3'
              borderBottom='1px'>
              <Text>Furnishing Status</Text>
              <Text fontWeight='bold'>{furnishingStatus}</Text>
            </Flex>
          )}
        </Flex>
        <Box>
          {amenities.length && (
            <Text fontSize='2xl' mt='5' fontWeight='black'>
              Facilities:
            </Text>
          )}
          <Wrap>
            {amenities.map((item) =>
              item.amenities.map((subItem) => (
                <WrapItem>
                  <Text
                    key={subItem.text}
                    fontWeight='bold'
                    color={colorMode === "light" ? "red.400" : "red.500"}
                    fontSize='lg'
                    p='2'
                    bg={colorMode === "light" ? "gray.100" : "gray.700"}
                    m='1'
                    borderRadius='5'>
                    {subItem.text}
                  </Text>
                </WrapItem>
              ))
            )}
          </Wrap>
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyDetail;

export async function getServerSideProps({ params }) {
  const { id } = params;
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      propertyDetails: data,
    },
  };
}
