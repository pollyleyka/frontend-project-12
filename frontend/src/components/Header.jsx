import { Container, Button, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index.jsx';

const LogOutButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut} className="btn-primary">{t('loginPage.logout')}</Button>
      : null
  );
};
const Header = () => {
  const { t } = useTranslation();
  return (
    <Navbar className="shadow-sm" bg="white" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">{t('hexletChat')}</Navbar.Brand>
        <LogOutButton />
      </Container>
    </Navbar>
  );
};

export default Header;
