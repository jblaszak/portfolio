import classes from "./Navigation.module.css";

export default function Navigation() {
  return (
    <header>
      <nav className={classes.navigation}>
        <ul className={classes.navItems}>
          <li>Project 1</li>
          <li>Project 2</li>
          <li>Project 3</li>
          <li>Project 4</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
}
