import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Flex,
  Button,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Avatar,
  Icon,
} from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";

function UserItem() {
  return (
    <Tr>
      <Td>
        <Flex
          justifyContent={"space-evenly"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <Avatar
            size={"sm"}
            src={`https://avatars.dicebear.com/api/human/aberra.svg`}
          />
          User 1
        </Flex>
      </Td>
      <Td>
        <Flex
          justifyContent={"start"}
          color="black"
          gap={3}
          flexDirection={"column"}
        >
          <p>🌲 : 25</p>
          <p>⭐: 4.5</p>
        </Flex>
      </Td>
      <Td>
        <Button backgroundColor={"green.200"}>Approve</Button>
      </Td>
    </Tr>
  );
}

export default function BountyItem() {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Bounty
            <Badge ml={3} backgroundColor={"green.200"}>
              6
            </Badge>
          </Box>
          <AccordionIcon backgroundColor={"green.200"} borderRadius={4} />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <TableContainer width={{ sm: "50%" }}>
          <Table
            size={{ base: "md", sm: "md" }}
            variant="striped"
            colorScheme="green"
          >
            <Thead>
              <Tr>
                <Th>User</Th>
                <Th>Stats</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              <UserItem />
              <UserItem />
              <UserItem />
            </Tbody>
            <TableCaption
              textAlign={"left"}
              style={{
                paddingLeft: "0px",
                paddingRight: "0px",
              }}
            >
              <Flex justifyContent={"space-between"}>
                <Text size={"sm"} alignSelf={"end"} as="i">
                  05/11/2022
                </Text>
                <Button backgroundColor={"red.200"} size="sm" color={"black"}>
                  <p>
                    <Icon as={DeleteIcon} /> Delete
                  </p>
                </Button>
              </Flex>
            </TableCaption>
          </Table>
        </TableContainer>
      </AccordionPanel>
    </AccordionItem>
  );
}
