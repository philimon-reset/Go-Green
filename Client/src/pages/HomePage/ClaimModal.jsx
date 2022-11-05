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
} from "@chakra-ui/react";

export default function ClaimModal({ modalOpen, modalClose, BountyInfo }) {
  return (
    <Modal isOpen={modalOpen} onClose={modalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{BountyInfo.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image
            roundedTop={"lg"}
            height={{ base: 100, sm: 200 }}
            width={"100%"}
            objectFit={"cover"}
            src={BountyInfo.image}
          />
          {BountyInfo.description}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" mr={3}>
            Claim !
          </Button>
          <Button variant="ghost" onClick={modalClose}>
            Secondary Action
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
