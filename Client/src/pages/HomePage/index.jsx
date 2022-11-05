import Card from "./Card.jsx";
import { Flex, Box } from "@chakra-ui/react";

export default function () {
  const cards = [];
  for (let i = 0; i < 101; i++) {
    cards.push(<Card key={i} />);
  }
  return (
    <Flex
      flexDirection={"row"}
      justifyContent={"space-evenly"}
      flexWrap={"wrap"}
      alignContent={"flex-start"}
      gap={"5px"}
    >
      {cards}
    </Flex>
  );
}
