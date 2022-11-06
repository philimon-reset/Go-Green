import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";

import server from "../../service/server";

import { useMutation } from "@tanstack/react-query";

export default function ClaimModal({
  modalOpen,
  modalClose,
  BountyInfo,
  claimBounty,
}) {
  if (!modalOpen) {
    return <div></div>;
  }

  const ClaimMutation = useMutation({
    mutationFn: async () => {
      const { data } = await server.post(`/claim/${BountyInfo.id}`);
      return data;
    },
  });

  const RemoveClaimMutaion = useMutation({
    mutationFn: async () => {
      const { data } = await server.delete(`/claim/${BountyInfo.id}`);
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
    <Modal isOpen={modalOpen} onClose={modalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{BountyInfo.tree.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image
            roundedTop={"lg"}
            height={{ base: 100, sm: 200 }}
            width={"100%"}
            objectFit={"cover"}
            src={BountyInfo.tree.pic}
          />
          {BountyInfo.tree.description}
        </ModalBody>
        {!BountyInfo.claimed ? (
          <ModalFooter>
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
            <Button variant="ghost" onClick={modalClose}>
              Close
            </Button>
          </ModalFooter>
        ) : (
          <ModalFooter>
            <Button
              bg={"green.700"}
              color={"white"}
              size={"sm"}
              _hover={{
                bg: "green.500",
              }}
              onClick={modalClose}
            >
              <Text fontSize={"12px"}>Close</Text>
            </Button>
            <Button
              variant="ghost"
              onClick={(event) => {
                event.stopPropagation();
                ClaimMutation.mutate();
              }}
            >
              Remove Claim
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}
