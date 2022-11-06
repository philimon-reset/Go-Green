import { Navigate, useOutletContext } from "react-router-dom";
import BountyItem from "./BountyItem";
import { Accordion } from "@chakra-ui/react";

import { useMutation, useQuery } from "@tanstack/react-query";
import server from "../../service/server";

const Contracts = () => {
  const { user } = useOutletContext();

  if (!user) {
    return <Navigate to="/auth/" />;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["my_bounties"],
    queryFn: async () => {
      const { data } = await server.get("/bounty_me");
      return data;
    },
  });

  const Bounties = [];
  for (let i = 0; i < 5; i++) {
    Bounties.push(<BountyItem key={i} />);
  }

  return <Accordion>{Bounties}</Accordion>;
};

export default Contracts;
