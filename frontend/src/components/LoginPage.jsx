import { Navbar, Form, Button, Container, Row, Col } from 'react-bootstrap';
import LoginForm from './LoginForm.jsx';

const LoginPage = () => {
  return (
    <>
      <div className="d-flex flex-column h-100">
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
          </Container>
        </Navbar>
        <div className="container-fluid h-100">
          <Row className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <Row className="card-body p-5">
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img
                      src="../assets/avatar.jpg"
                      className="rounded-circle"
                      alt="Войти"
                    ></img>
                  </div>
                  <LoginForm />
                </Row>
                <div className="card-footer p-4">
                  <div className="text-center">
                    <span>Нет аккаунта? </span>
                    <a href="/signup">Регистрация</a>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
