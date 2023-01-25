import useNavigateStore from "../stores/useNavigate";
import classes from "./Navigation.module.css";

export default function Navigation() {
  const { currentSection, setTargetSection, setCurrentSection } = useNavigateStore(
    (state) => state
  );

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
            className={currentSection === 1 ? classes.active : ""}
            onClick={(e) => setCurrentSection(1)}
          >
            Project 1
          </li>
          <li
            className={currentSection === 2 ? classes.active : ""}
            onClick={(e) => setCurrentSection(2)}
          >
            Project 2
          </li>
          <li
            className={currentSection === 3 ? classes.active : ""}
            onClick={(e) => setCurrentSection(3)}
          >
            Project 3
          </li>
          <li
            className={currentSection === 4 ? classes.active : ""}
            onClick={(e) => setCurrentSection(4)}
          >
            Project 4
          </li>
          <li
            className={currentSection === 5 ? classes.active : ""}
            onClick={(e) => setCurrentSection(5)}
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
