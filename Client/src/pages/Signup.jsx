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

import { Link as ReactLink, Navigate } from "react-router-dom";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import server from "../service/server";
import { useQuery, useMutation } from "@tanstack/react-query";

export default function Signup() {
  // react query
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const { data } = await server.get("/city");
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (vars) => {
      console.log(vars);
      const { data } = await server.post("/users/register", vars);
      return data;
    },
  });

  if (mutation.isSuccess) {
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
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
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="location" isRequired>
                  <FormLabel>City</FormLabel>
                  <Select
                    placeholder="Select your city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    {data.data.map((city) => {
                      return (
                        <option value={city.id} key={city.id}>
                          {city.name}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
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
                type="submit"
                onClick={() => {
                  mutation.mutate({
                    email,
                    name,
                    password,
                    location,
                  });
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
