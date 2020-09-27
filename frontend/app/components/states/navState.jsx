import { createContainer } from "unstated-next";
import { useState } from "react";

const useNavState = () => {
  const [current, setCurrent] = useState("Home");
  return { current, setCurrent };
};

const NavState = createContainer(useNavState);

export default NavState;
