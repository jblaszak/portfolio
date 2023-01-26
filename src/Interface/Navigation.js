import useMoveCharacter from "../hooks/useMoveCharacter";
import useNavigateStore from "../stores/useNavigate";
import classes from "./Navigation.module.css";

export default function Navigation() {
  const currentSection = useNavigateStore((state) => state.currentSection);
  const moveCharacter = useMoveCharacter();

  return (
    <header className={classes.navContainer}>
      <nav className={classes.navigation}>
        <ul className={classes.navItems}>
          <li
            className={currentSection === 1 ? classes.active : ""}
            onClick={(e) => moveCharacter(1)}
          >
            Project 1
          </li>
          <li
            className={currentSection === 2 ? classes.active : ""}
            onClick={(e) => moveCharacter(2)}
          >
            Project 2
          </li>
          <li
            className={currentSection === 3 ? classes.active : ""}
            onClick={(e) => moveCharacter(3)}
          >
            Project 3
          </li>
          <li
            className={currentSection === 4 ? classes.active : ""}
            onClick={(e) => moveCharacter(4)}
          >
            Project 4
          </li>
          <li
            className={currentSection === 5 ? classes.active : ""}
            onClick={(e) => moveCharacter(5)}
          >
            Contact
          </li>
        </ul>
      </nav>
    </header>
  );
}
