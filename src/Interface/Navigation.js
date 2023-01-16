import { useContext } from "react";
import { SectionContext } from "../SectionContext";
import classes from "./Navigation.module.css";

export default function Navigation() {
  const { currSection, setTargetSection } = useContext(SectionContext);

  // function prevSection() {
  //   const target = currSection - 1;
  //   setTargetSection(target < 0 ? 0 : target);
  // }

  // function nextSection() {
  //   const target = currSection + 1;
  //   setTargetSection(target > 5 ? 5 : target);
  // }

  return (
    <header className={classes.navContainer}>
      <nav className={classes.navigation}>
        <ul className={classes.navItems}>
          <li
            className={currSection === 1 ? classes.active : ""}
            onClick={(e) => setTargetSection(1)}
          >
            Project 1
          </li>
          <li
            className={currSection === 2 ? classes.active : ""}
            onClick={(e) => setTargetSection(2)}
          >
            Project 2
          </li>
          <li
            className={currSection === 3 ? classes.active : ""}
            onClick={(e) => setTargetSection(3)}
          >
            Project 3
          </li>
          <li
            className={currSection === 4 ? classes.active : ""}
            onClick={(e) => setTargetSection(4)}
          >
            Project 4
          </li>
          <li
            className={currSection === 5 ? classes.active : ""}
            onClick={(e) => setTargetSection(5)}
          >
            Contact
          </li>
        </ul>
      </nav>
      {/* <nav className={classes.sideNav}>
        <button className={} onClick={(e) => prevSection()}>←</button>
        <button onClick={(e) => nextSection()}>→</button>
      </nav> */}
    </header>
  );
}
