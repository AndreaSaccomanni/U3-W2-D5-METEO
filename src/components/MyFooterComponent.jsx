import { Col, Container, Row } from "react-bootstrap";

const MyFooterComponent = () => {
  return (
    <footer>
      <footer className="footer text-light pb-2 pt-5">
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12} sm={4} md={3} className="mb-3">
              <h5>About Us</h5>
              <ul className="list-unstyled">
                <li>
                  <p>
                    Here you can find meteo information
                    <br /> for your city!
                  </p>
                </li>
              </ul>
            </Col>
            <Col xs={12} sm={4} md={3} className="mb-3">
              <h5>Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/" className="text-light">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-light">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-light">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-light">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </Col>
            <Col xs={12} sm={4} md={3} className="mb-3">
              <h5>Contact</h5>
              <ul className="list-unstyled">
                <li>Email: meteoapp@weather.com</li>
                <li>Phone: 3467587465</li>
              </ul>
            </Col>
          </Row>
          <Row className="justify-content-center mt-4">
            <Col className="text-center">
              <p>&copy; 2024 Meteo App. All Rights Reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </footer>
  );
};

export default MyFooterComponent;
