import classes from "./Navigation.module.css";

export default function Navigation() {
  return (
    <header>
      <nav className={classes.navigation}>
        <a
          href="https://github.com/jblaszak"
          className={classes.profileLink}
          aria-label="Jo Blaszak"
        >
          Jo Blaszak
        </a>
        <ul className={classes.navItems}>
          <li>Project 1</li>
          <li>Project 2</li>
          <li>Project 3</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
}
