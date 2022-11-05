import { Accordion } from "@chakra-ui/react";

import BountyItem from "./BountyItem";

const Contracts = () => {
  const Bounties = [];
  for (let i = 0; i < 5; i++) {
    Bounties.push(<BountyItem key={i} />);
  }

  return <Accordion>{Bounties}</Accordion>;
};

export default Contracts;
