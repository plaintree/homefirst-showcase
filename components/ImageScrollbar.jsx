import { useContext } from "react";
import Image from "next/image";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";

const LeftArrow = () => {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);
  return (
    <Flex justify='center' align='center' mr='1'>
      <Icon
        as={FaRegArrowAltCircleLeft}
        onClick={() => scrollPrev()}
        disabled={isFirstItemVisible}
        fontSize='2xl'
        cursor='pointer'
        d={["none", "none", "none", "block"]}
      />
    </Flex>
  );
};

const RightArrow = () => {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);
  return (
    <Flex justify='center' align='center' ml='1'>
      <Icon
        as={FaRegArrowAltCircleRight}
        onClick={() => scrollNext()}
        disabled={isLastItemVisible}
        fontSize='2xl'
        cursor='pointer'
        d={["none", "none", "none", "block"]}
      />
    </Flex>
  );
};

const ImageScrollbar = ({ data }) => {
  return (
    <ScrollMenu>
      {data.map((photo) => (
        <Box w={1000} itemID={photo.id} key={photo.id} p='1'>
          <Image
            placeholder='blur'
            blurDataURL={photo.url}
            src={photo.url}
            layout='responsive'
            width={1000}
            height={500}
            sizes='(max-width:500px) 100px, (max-width: 1024px) 400px, 1000px'
            alt='Property Images'
          />
        </Box>
      ))}
    </ScrollMenu>
  );
};

export default ImageScrollbar;
