import React from "react";
import { Stack, Image, Box, Button, Flex, Text } from "@chakra-ui/react";
import image from "../../assets/tree.jpg";

export default function SimpleCookiePreference() {
  return (
    <Stack p="4" boxShadow="lg" m="2" borderRadius={5}>
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Flex gap={2}>
          <Image
            borderRadius={5}
            height={{ base: 75, sm: 200 }}
            width={{ base: 75, sm: 200 }}
            objectFit={"cover"}
            src={image}
          />
          <Flex flexDirection={"column"}>
            <Text fontWeight={600} fontSize={"xl"} color={"black"}>
              Acacia Tree
            </Text>
            <Text fontWeight={400} fontSize={"lg"} color={"black"}>
              Bremen
            </Text>
            <Text fontSize={"md"} color={"green.500"} as="b">
              $75
            </Text>
          </Flex>
        </Flex>
        <Flex flexDirection={"column"} rowGap={3}>
          <Button colorScheme="green" size={{ base: "sm", md: "lg" }}>
            <Text>Start Planting !</Text>
          </Button>
          <Button colorScheme="gray" size={{ base: "sm", md: "lg" }}>
            <Text>Resources</Text>
          </Button>
        </Flex>
      </Flex>
    </Stack>
  );
}
