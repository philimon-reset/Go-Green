import { Navigate, useOutletContext } from "react-router-dom";
import BountyItem from "./BountyItem";
import { Accordion } from "@chakra-ui/react";

const Contracts = () => {
  const { user } = useOutletContext();

  if (!user) {
    return <Navigate to="/auth/" />;
  }
  const Bounties = [];
  for (let i = 0; i < 5; i++) {
    Bounties.push(<BountyItem key={i} />);
  }

  return <Accordion>{Bounties}</Accordion>;
};

export default Contracts;
