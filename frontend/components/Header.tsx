import { cookies } from 'next/dist/client/components/headers';
import Link from 'next/link';
import styles from '../styles/Header.module.scss';

const Header = () => {
  const loggedIn = cookies().has('session');

  return (
    <header className={styles.header}>
      <Link className={styles.link} href='/'>
        Home
      </Link>
      {loggedIn ? (
        <Link className={styles.link} href='/dashboard'>
          Dashboard
        </Link>
      ) : (
        <Link className={styles.link} href='/auth'>
          Authentication
        </Link>
      )}
      <Link className={styles.link} href='/about'>
        About
      </Link>
    </header>
  );
};

export default Header;
