import { Heading, Flex, useColorModeValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import Lottie from "lottie-react";
import treeAniim from "../assets/tree_anim.json";

export default function AuthLayout() {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"space-evenly"}
      flexDirection={"column"}
    >
      <Lottie
        autoplay
        loop
        animationData={treeAniim}
        style={{ height: "200px", width: "300px" }}
      />
      <Heading color={"green.500"} mt={-9} mb={{ md: 3.5 }}>
        `Forrest
      </Heading>
      <Outlet />
    </Flex>
  );
}
