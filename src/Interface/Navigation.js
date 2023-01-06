import { useContext } from "react";
import { CanvasContext } from "../CanvasContext";
import { ActiveProjectContext } from "../ActiveProjectContext";
import classes from "./Navigation.module.css";

export default function Navigation() {
  const { width, scrollElement } = useContext(CanvasContext);
  const { activeProject } = useContext(ActiveProjectContext);

  function scrollToSection(section) {
    scrollElement.scrollTo({ left: width * section });
  }

  const isContact = scrollElement?.scrollLeft > width * 4.15;

  return (
    <header className={classes.navContainer}>
      <nav className={classes.navigation}>
        <ul className={classes.navItems}>
          <li
            className={activeProject === 1 ? classes.active : ""}
            onClick={(e) => scrollToSection(1)}
          >
            Project 1
          </li>
          <li
            className={activeProject === 2 ? classes.active : ""}
            onClick={(e) => scrollToSection(2)}
          >
            Project 2
          </li>
          <li
            className={activeProject === 3 ? classes.active : ""}
            onClick={(e) => scrollToSection(3)}
          >
            Project 3
          </li>
          <li
            className={activeProject === 4 ? classes.active : ""}
            onClick={(e) => scrollToSection(4)}
          >
            Project 4
          </li>
          <li className={isContact ? classes.active : ""} onClick={(e) => scrollToSection(5)}>
            Contact
          </li>
        </ul>
      </nav>
    </header>
  );
}
