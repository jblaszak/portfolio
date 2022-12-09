import { useContext } from "react";
import { CanvasContext } from "../CanvasContext";
import classes from "./Navigation.module.css";

export default function Navigation() {
  const { width, height, scrollElement } = useContext(CanvasContext);

  function handleClick(e, page) {
    console.log(width);
    scrollElement.scrollTo({ left: width * page, behaviour: "smooth" });
  }

  return (
    <header>
      <nav className={classes.navigation}>
        <ul className={classes.navItems}>
          <li onClick={(e) => handleClick(e, 1)}>Project 1</li>
          <li onClick={(e) => handleClick(e, 2)}>Project 2</li>
          <li onClick={(e) => handleClick(e, 3)}>Project 3</li>
          <li onClick={(e) => handleClick(e, 4)}>Project 4</li>
          <li onClick={(e) => handleClick(e, 5)}>Contact</li>
        </ul>
      </nav>
    </header>
  );
}
