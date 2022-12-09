import { useContext } from "react";
import { CanvasContext } from "../CanvasContext";
import classes from "./Navigation.module.css";

export default function Navigation() {
  const { width, height, scrollElement } = useContext(CanvasContext);

  function scrollToSection(section) {
    scrollElement.scrollTo({ left: width * section, behaviour: "smooth" });
  }

  return (
    <header>
      <nav className={classes.navigation}>
        <ul className={classes.navItems}>
          <li onClick={(e) => scrollToSection(1)}>Project 1</li>
          <li onClick={(e) => scrollToSection(2)}>Project 2</li>
          <li onClick={(e) => scrollToSection(3)}>Project 3</li>
          <li onClick={(e) => scrollToSection(4)}>Project 4</li>
          <li onClick={(e) => scrollToSection(5)}>Contact</li>
        </ul>
      </nav>
    </header>
  );
}
