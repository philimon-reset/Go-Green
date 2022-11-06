import { Flex, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

import Card from "./Card.jsx";
import ClaimModal from "./ClaimModal.jsx";

import server from "../../service/server";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBounty, setSelectedBounty] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["bounties"],
    queryFn: async () => {
      const { data } = await server.get("/bounty");
      return data;
    },
  });

  function openModal(index) {
    onOpen();
    setSelectedBounty(index);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // const BountyInfo = {
  //   treeName: "Acacia",
  //   price: "$57",
  //   location: "Bremen, Germany",
  //   title: "Plant a tree",
  //   description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat at officiis perspiciatis esse
  //     velit deserunt saepe provident beatae excepturi est fugit eaque fuga nihil, sapiente
  //     laborum repudiandae. Error, at. Autem!`,
  //   image,
  //   claimed: false,
  // };

  return (
    <>
      <Flex
        flexDirection={"row"}
        justifyContent={"space-evenly"}
        flexWrap={"wrap"}
        alignContent={"flex-start"}
        gap={"5px"}
      >
        {data.data.map((bounty) => {
          return (
            <Card
              key={bounty.id}
              BountyInfo={bounty}
              openModal={() => openModal(bounty.id)}
              claimBounty={(bool) => {}}
            />
          );
        })}
      </Flex>
      <ClaimModal
        modalOpen={isOpen}
        modalClose={() => {
          onClose();
          setSelectedBounty(null);
        }}
        BountyInfo={data.data[selectedBounty]}
      />
    </>
  );
}
