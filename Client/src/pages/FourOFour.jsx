import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function FourOFour() {
  return (
    <>
      <h1>404 Not Found !</h1>
      <div>
        Go Back{" "}
        <Link as={RouterLink} to="/">
          Home
        </Link>
      </div>
    </>
  );
}
