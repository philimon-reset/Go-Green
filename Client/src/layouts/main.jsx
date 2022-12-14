import { Outlet } from "react-router-dom";
import {
  Link,
  Box,
  Stack,
  Heading,
  Flex,
  useColorMode,
  useDisclosure,
  Button,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuDivider,
  Center,
  MenuItem,
} from "@chakra-ui/react";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link as RouterLink, redirect } from "react-router-dom";
import "./style.css";

import Lottie from "lottie-react";
import treeAniim from "../assets/tree_anim.json";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import server from "../service/server";

export default function MainLayout() {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await server.get("/me");
      return data;
    },
    retry: false,
  });

  const { colorMode, toggleColorMode } = useColorMode();

  let location = useLocation();

  const isActive = (location, currentLocation) => {
    if (location.pathname == currentLocation) {
      return true;
    }
    return false;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  let user = null;

  if (isSuccess) {
    user = data.data;
  }

  return (
    <>
      <div className="top-container">
        <Flex justifyContent={"space-between"} align={"center"} padding={1}>
          <Stack direction={"row"} align={"center"} pr={{ base: 5, sm: 10 }}>
            <div className="gif">
              <Lottie
                autoplay
                loop
                animationData={treeAniim}
                style={{ height: "60px", width: "60px" }}
                pb={2}
              />
            </div>
            <div className="nav-title">
              <Heading size={"lg"} color={"green.500"}>
                Forrest
              </Heading>
            </div>
          </Stack>
          <Flex alignItems={"center"} pr={{ base: 5, sm: 10 }}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode} mt={1}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              {user ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                    _hover={{
                      border: "1px",
                      borderColor: "green.500",
                    }}
                  >
                    <Avatar
                      size={"sm"}
                      src={`https://avatars.dicebear.com/api/human/${user.name}.svg`}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={`https://avatars.dicebear.com/api/human/${user.name}.svg`}
                      />
                    </Center>
                    <br />
                    <Center color="black">
                      <p>{user.name}</p>
                    </Center>
                    <br />
                    <Flex justifyContent={"space-around"} color="black">
                      <p>???? : 25</p>
                      <p>????: 150$</p>
                      <p>???: 4.5</p>
                    </Flex>
                    <MenuDivider />
                    <MenuItem>
                      <Link to="#">Account Settings</Link>
                    </MenuItem>
                    <MenuItem>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Link as={RouterLink} to="/auth">
                  Login
                </Link>
              )}
            </Stack>
          </Flex>
        </Flex>
      </div>

      <Box px={1} pt={7} overflow="hidden" mb={"11vh"} mt={"5vh"} zIndex={-1}>
        <Outlet context={{ user }} />
      </Box>

      <div className="nav-container">
        <Link as={RouterLink} to="/">
          <div
            className={`btn-container ${
              isActive(location, "/") && "active-nav-menu"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="40" width="45">
              <path d="M11.55 38.45h8.05v-12h8.8v12h8.05v-18.7L24 10.35l-12.45 9.4ZM10 40V19L24 8.4 38 19v21H26.85V28h-5.7v12Zm14-15.6Z" />
            </svg>
            <div className="label">Home</div>
          </div>
        </Link>

        <Link as={RouterLink} to="/sponsor">
          <div
            className={`btn-container ${
              isActive(location, "/sponsor") && "active-nav-menu"
            }`}
          >
            <svg
              className="nav-btn"
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              width="45"
            >
              <path d="M23.5 32h1.45v-1.6q1.5-.15 2.525-1.125T28.5 26.9q0-1.25-.95-2.15-.95-.9-2.55-1.6V19.6q.5.1.9.45t.65.7l1.7-.8q-.45-.85-1.275-1.475Q26.15 17.85 25 17.6V16h-1.5v1.6q-1.55.15-2.55.975-1 .825-1 2.175 0 1.25.95 2.175.95.925 2.6 1.675v3.75q-.8-.1-1.35-.6t-.75-1.15l-1.8.75q.4 1.15 1.45 1.975 1.05.825 2.45 1.075Zm1.5-3.6v-3.15q.65.3 1.1.7.45.4.45.95 0 .65-.425 1.025Q25.7 28.3 25 28.4Zm-1.5-5.9q-.6-.3-1.075-.7-.475-.4-.475-.9 0-.65.45-.95.45-.3 1.1-.4ZM16 35.7q-4.9 0-8.3-3.4-3.4-3.4-3.4-8.3t3.4-8.325q3.4-3.425 8.3-3.425h16q4.9 0 8.325 3.425Q43.75 19.1 43.75 24q0 4.9-3.425 8.3Q36.9 35.7 32 35.7Zm0-1.75h16q4.15 0 7.075-2.875T42 24q0-4.15-2.925-7.075T32 14H16q-4.15 0-7.05 2.9-2.9 2.9-2.9 7.1 0 4.15 2.9 7.05 2.9 2.9 7.05 2.9ZM24 24Z" />
            </svg>
            <div className="label">Sponsor</div>
          </div>
        </Link>

        <Link as={RouterLink} to="/contracts">
          <div
            className={`btn-container ${
              isActive(location, "/contracts") && "active-nav-menu"
            }`}
          >
            <svg
              className="nav-btn"
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              width="45"
            >
              <path d="M16.35 37.65q-.7 0-1.225-.525Q14.6 36.6 14.6 35.9v-2.1q0-.7.5-1.175.5-.475 1.15-.475h4.05v-7.2q-2 .45-4.125-.025-2.125-.475-3.425-1.825v-3H9.8l-4.7-4.8q-.4-.35-.375-.875.025-.525.375-.725 1.3-.8 3.15-1.6 1.85-.8 4.3-.8 2.1 0 4.025.625 1.925.625 3.725 2.025v-2.5q.05-.65.5-1.075.45-.425 1.15-.425H38.5q.7 0 1.175.475.475.475.475 1.175v22.2q0 1.6-1.125 2.725T36.35 37.65Zm5.7-5.5H32.7q.7 0 1.125.425.425.425.425 1.125v.1q0 .9.6 1.5t1.5.6q.85 0 1.45-.6t.6-1.5V11.7H22.05v3.7L32.5 25.85q.35.35.5.575.15.225.15.425 0 .35-.275.625t-.575.275q-.25 0-.5-.125t-.6-.525l-5.65-5.6-1.3 1.3q-.55.65-1.075.975-.525.325-1.125.575Zm-11.5-13.8h3.95v3.95q1 .7 1.95.975t1.85.275q1.35 0 2.675-.675Q22.3 22.2 23.05 21.45l1.25-1.25-3.7-3.7q-1.7-1.75-3.75-2.6-2.05-.85-4.3-.85-1.6 0-3.05.45-1.45.45-2.6 1.15Zm5.8 17.55H33.3q-.4-.35-.6-.9-.2-.55-.2-1.1H16.35Zm0 0v-2 2Z" />
            </svg>
            <div className="label">Contracts</div>
          </div>
        </Link>

        <Link as={RouterLink} to="/plant">
          <div
            className={`btn-container ${
              isActive(location, "/plant") && "active-nav-menu"
            }`}
          >
            <svg
              className="nav-btn"
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              width="45"
            >
              <path d="M15.9 34.45H6.25q-1 0-1.475-.875Q4.3 32.7 4.9 31.85l6.95-10h-1.6q-1 0-1.3-.85-.3-.85.3-1.75l6.85-9.9q.55-.65 1.4-.65.85 0 1.4.65l5.1 7.3 5.1-7.3q.55-.65 1.4-.65.85 0 1.4.65l6.9 9.9q.55.9.25 1.75-.3.85-1.3.85H36.2l6.9 10q.6.85.125 1.725-.475.875-1.475.875H32.1v6.35q0 .7-.425 1.15-.425.45-1.175.45-.65 0-1.125-.475T28.9 40.8v-6.35h-9.8v6.35q0 .7-.425 1.15-.425.45-1.175.45-.65 0-1.125-.475T15.9 40.8Zm14.75-1.75h10.8l-8.7-12.6h4.4l-6.65-9.5-5.35 7.65.75 1q.5.9.225 1.75t-1.275.85H23.2Zm-24.1 0h21.9l-8.7-12.6h4.4l-6.65-9.5-6.65 9.5h4.45Zm0 0h8.75-4.45 13.3-4.4 8.7Zm24.1 0H23.2h2.925-.975 12-4.4 8.7Zm-1.75 1.75h3.2-3.2Zm-.2 0Z" />
            </svg>
            <div className="label">Plant</div>
          </div>
        </Link>
      </div>
    </>
  );
}
