import { Link } from "./link";

export const Footer = () => (
  <footer className="not-prose mt-16 text-muted-foreground text-sm leading-relaxed">
    <p>
      &copy; {new Date().getFullYear()} Barrels Grenada. All rights reserved.
    </p>
  </footer>
);
