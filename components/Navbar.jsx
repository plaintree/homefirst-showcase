import Link from "next/link";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
  Box,
  Spacer,
} from "@chakra-ui/react";
import {
  BiMenu,
  BiHome,
  BiDollarCircle,
  BiSearchAlt,
  BiKey,
} from "react-icons/bi";

const Navbar = () => {
  return (
    <Flex p='2' borderBottom='1px' borderColor='gray.100'>
      <Box fontSize='3xl' color='blue.400' fontWeight='bold'>
        <Link href='/' pl='2'>
          Realtor
        </Link>
      </Box>
      <Spacer />
      <Box>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<BiMenu />}
            variant='outline'
            color='gray.400'
          />
          <MenuList>
            <Link href='/' passHref>
              <MenuItem icon={<BiHome />}>Home</MenuItem>
            </Link>
            <Link href='/search' passHref>
              <MenuItem icon={<BiSearchAlt />}>Search</MenuItem>
            </Link>
            <Link href='/search?purpose=for-sale' passHref>
              <MenuItem icon={<BiDollarCircle />}>Buy Property</MenuItem>
            </Link>
            <Link href='/search?purpose=for-rent' passHref>
              <MenuItem icon={<BiKey />}>Rent Property</MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Navbar;
