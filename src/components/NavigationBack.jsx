import { NavLink, useLocation } from "react-router-dom";
import { setActive } from "../utils/setActive";

export default function NavigationBack() {
  const location = useLocation();
  console.log(location);

  const backLink =
    location.state?.from?.pathname + location.state?.from?.search || "/";
  console.log(backLink);

  return (
    <NavLink to={backLink} className={`{setActive} naviBack btn`}>
      Go back
    </NavLink>
  );
}
