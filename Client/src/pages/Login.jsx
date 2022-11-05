import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Divider,
  useColorModeValue,
  Center,
  Link,
} from "@chakra-ui/react";

import { Link as ReactLink } from "react-router-dom";

export default function Login() {
  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      maxH={"75vh"}
    >
      <Stack
        spacing={{ base: 5, lg: 8 }}
        mx={"auto"}
        width={{ base: "75vw", lg: "35vw" }}
        py={1}
        px={0}
      >
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Heading fontSize={"4xl"}>
            <Center>Log In</Center>
          </Heading>
          <Divider my={4} />
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10} py={2}>
              <Button
                bg={"green.600"}
                color={"white"}
                _hover={{
                  bg: "green.500",
                }}
              >
                Log In
              </Button>
              <Center color={"green.600"}>
                <Link as={ReactLink} to="/auth/signup">
                  Sign up instead ?
                </Link>
              </Center>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
