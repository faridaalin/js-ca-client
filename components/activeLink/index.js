import { withRouter } from 'next/router';
import { Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import styles from '../../styles/Navbar.module.css';

const ActiveLink = ({ href, router, children }) => {
  const handleClick = (event) => {
    event.preventDefault();
    router.push(href);
  };

  const isCurrentPath = router.pathname === href || router.asPath === href;

  return (
    <NextLink href={href} onClick={handleClick}>
      <Link
        color='pink.700'
        bg={isCurrentPath ? 'pink.50' : ''}
        rounded='md'
        p='2'
        fontSize='0.8rem'
        className={styles.navItem}
      >
        {children}
      </Link>
    </NextLink>
  );
};

export default withRouter(ActiveLink);
