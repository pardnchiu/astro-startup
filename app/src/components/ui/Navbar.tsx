import { NAV_LINKS } from '@/constants';
import styles from './Navbar.module.scss';

export function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          Home
        </a>
        <nav className={styles.nav}>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
