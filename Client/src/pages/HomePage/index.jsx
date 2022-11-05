import { Flex, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

import Card from "./Card.jsx";
import ClaimModal from "./ClaimModal.jsx";
import image from "../../assets/tree.jpg";

export default function HomePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBounty, setSelectedBounty] = useState(null);

  function openModal(index) {
    onOpen();
    setSelectedBounty(index);
  }

  const BountyInfo = {
    treeName: "Acacia",
    price: "$57",
    location: "Bremen, Germany",
    title: "Plant a tree",
    description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat at officiis perspiciatis esse 
      velit deserunt saepe provident beatae excepturi est fugit eaque fuga nihil, sapiente 
      laborum repudiandae. Error, at. Autem!`,
    image,
  };

  const cards = [];
  for (let i = 0; i < 25; i++) {
    cards.push(
      <Card key={i} BountyInfo={BountyInfo} openModal={() => openModal(i)} />
    );
  }

  return (
    <>
      <Flex
        flexDirection={"row"}
        justifyContent={"space-evenly"}
        flexWrap={"wrap"}
        alignContent={"flex-start"}
        gap={"5px"}
      >
        {cards}
      </Flex>
      <ClaimModal
        modalOpen={isOpen}
        modalClose={() => {
          onClose();
          setSelectedBounty(null);
        }}
        BountyInfo={BountyInfo}
      />
    </>
  );
}
