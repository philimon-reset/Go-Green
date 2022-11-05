import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Text,
  Heading,
  Center,
  Divider,
  useColorModeValue,
  Link,
  Select,
} from "@chakra-ui/react";

import { Link as ReactLink } from "react-router-dom";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  let _cities = [
    "Bremen",
    "Munich",
    "Dusseldorf",
    "Frankfurt",
    "Berlin",
    "Munster",
  ];
  let cities = [];
  for (let i = 0; i < _cities.length; i++) {
    cities.push(<option value={i}>{_cities[i]}</option>);
  }

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
          p={6}
        >
          <Heading fontSize={"xl"}>
            <Center>Create a new account</Center>
          </Heading>
          <Divider my={4} />
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="ame" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="location" isRequired>
                  <FormLabel>City</FormLabel>
                  <Select placeholder="Select your city">{cities}</Select>
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"green.600"}
                color={"white"}
                _hover={{
                  bg: "green.500",
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link as={ReactLink} to="/auth/" color={"green.600"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
