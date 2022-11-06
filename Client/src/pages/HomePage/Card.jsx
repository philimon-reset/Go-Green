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

import { useMutation } from "@tanstack/react-query";
import server from "../../service/server";

export default function Card({ BountyInfo, openModal, claimBounty }) {
  const ClaimMutation = useMutation({
    mutationFn: async () => {
      const { data } = await server.post(`/bounty/claim/${BountyInfo.id}`);
      return data;
    },
  });

  const RemoveClaimMutaion = useMutation({
    mutationFn: async () => {
      const { data } = await server.delete(`/bounty/claim/${BountyInfo.id}`);
      return data;
    },
  });

  if (ClaimMutation.isSuccess) {
    claimBounty(true);
    // notification
  }

  if (RemoveClaimMutaion.isSuccess) {
    claimBounty(false);
    // notification
  }

  return (
    <Center py={{ base: 1, sm: 4 }}>
      <Box
        role={"group"}
        maxW={{ base: "160px", sm: "200px" }}
        maxH={{ base: "260px", sm: "500px" }}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        border={"1px"}
        borderColor="green.100"
        rounded={"lg"}
        _hover={{
          cursor: "pointer",
        }}
        onClick={openModal}
      >
        <Image
          roundedTop={"lg"}
          height={{ base: 100, sm: 200 }}
          width={"100%"}
          objectFit={"cover"}
          src={BountyInfo.tree.pic}
          style={{
            clipPath: "polygon(0 0,100% 0, 100% 85%, 0 100%)",
          }}
        />

        <Stack p={3}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            {/* {BountyInfo.location} */}
            Bremen, Germany
          </Text>
          <Heading
            fontSize={{ base: "xl", sm: "2xl" }}
            fontFamily={"body"}
            fontWeight={500}
          >
            {BountyInfo.tree.name}
          </Heading>
          <Stack
            direction={"row"}
            align={"center"}
            justifyContent={"space-between"}
          >
            <Text fontWeight={600} fontSize={"xl"} color={"green.500"}>
              {`$` + BountyInfo.Price}
            </Text>
            {!BountyInfo.claimed ? (
              <Button
                bg={"green.700"}
                color={"white"}
                size={"sm"}
                _hover={{
                  bg: "green.500",
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  ClaimMutation.mutate();
                }}
              >
                <Text fontSize={"12px"}>Claim</Text>
              </Button>
            ) : (
              <Button
                bg={"red.400"}
                color={"white"}
                size={"sm"}
                _hover={{
                  bg: "red.200",
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  RemoveClaimMutaion.mutate();
                }}
              >
                <Text fontSize={"12px"}>Remove Claim</Text>
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
