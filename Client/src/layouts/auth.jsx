import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { Player } from "@lottiefiles/react-lottie-player";

export default function AuthLayout() {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"space-evenly"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Box>
        <Player
          autoplay
          loop
          src="https://assets7.lottiefiles.com/packages/lf20_i9mxcD.json"
          style={{ height: "200px", width: "300px" }}
        />
        <Outlet />
      </Box>
    </Flex>
  );
}
