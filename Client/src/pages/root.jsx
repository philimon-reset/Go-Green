import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div>Home</div>
      <Outlet />
    </>
  );
}
