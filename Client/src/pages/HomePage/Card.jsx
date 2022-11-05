import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
} from "@chakra-ui/react";

import IMAGE from "../../assets/tree.jpg";

export default function Card() {
  return (
    <Center py={{ base: 1, sm: 4 }}>
      <Box
        role={"group"}
        maxW={{ base: "160px", sm: "500px" }}
        maxH={{ base: "260px", sm: "500px" }}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
      >
        <Image
          roundedTop={"lg"}
          height={{ base: 100, sm: 200 }}
          width={"100%"}
          objectFit={"cover"}
          src={IMAGE}
          style={{
            clipPath: "polygon(0 0,100% 0, 100% 85%, 0 100%)",
          }}
        />

        <Stack p={3}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            Bremen, Germany
          </Text>
          <Heading
            fontSize={{ base: "xl", sm: "2xl" }}
            fontFamily={"body"}
            fontWeight={500}
          >
            Acacia Tree
          </Heading>
          <Stack
            direction={"row"}
            align={"center"}
            justifyContent={"space-between"}
          >
            <Text fontWeight={600} fontSize={"xl"} color={"green.500"}>
              $57
            </Text>
            <Button
              bg={"green.700"}
              color={"white"}
              _hover={{
                bg: "green.500",
              }}
            >
              Claim
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
