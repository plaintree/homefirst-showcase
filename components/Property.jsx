import Image from "next/image";
import Link from "next/link";
import { Box, Flex, Text, Avatar, Icon, Spacer } from "@chakra-ui/react";
import {
  FaBed,
  FaRulerCombined,
  FaCheckCircle,
  FaBath,
  FaBullseye,
} from "react-icons/fa";
import millify from "millify";
import DefaultImage from "../assets/images/house.jpeg";

const Property = ({
  property: {
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
  },
}) => {
  return (
    <Link href={`/property/${externalID}`} passHref>
      <Flex
        wrap='wrap'
        w='420px'
        p='5'
        pt='0'
        justify='center'
        cursor='pointer'>
        <Box>
          <Image
            src={coverPhoto ? coverPhoto.url : DefaultImage}
            alt='house'
            width={400}
            height={260}
          />
        </Box>

        <Box w='100%'>
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
          <Text fontSize='md'>
            {title.length > 30 ? `${title.substring(0, 30)}...` : title}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default Property;
