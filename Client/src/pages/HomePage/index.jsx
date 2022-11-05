import Card from "./Card.jsx";
import { Flex, Box } from "@chakra-ui/react";

export default function () {
  const cards = [];
  for (let i = 0; i < 100; i++) {
    cards.push(<Card key={i} flexGrow={1} />);
  }
  return (
    <Flex
      flexDirection={"row"}
      justifyContent={"space-evenly"}
      flexWrap={"wrap"}
    >
      {cards}
    </Flex>
  );
}
