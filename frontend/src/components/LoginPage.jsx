import { Navbar, Form, Button, Container, Row, Col } from 'react-bootstrap';
import LoginForm from './LoginForm.jsx';

export default LoginPage = () => {
  return (
    <div className='d-flex flex-column h-100'>
    <Navbar expand="lg" className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
      </Container>
    </Navbar>
    <LoginForm />
    </div>
  );
}

