import { useState } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MainComponent = () => {
  const [city, setCity] = useState(""); // Stato per il nome della città

  const navigate = useNavigate(); // Funzione per navigare tra le pagine

  const handleSearch = (e) => {
    e.preventDefault();

    const apiKey = "a84e27c2398fcc67d1a63fd6b7d39c5c";

    // Fetch per ottenere le coordinate della città
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Errore nella chiamata");
        }
      })
      .then((data) => {
        if (data.length === 0) {
          alert("Città non trovata!");
          //se non viene trovata nessuna città non ritorna niente
          return;
        } else {
          const { lat, lon } = data[0];

          // Fetch per ottenere i dati meteo usando lat e lon
          return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
            .then((resp) => {
              if (resp.ok) {
                return resp.json();
              } else {
                throw new Error("Errore nella chiamata");
              }
            })
            .then((weatherInfo) => {
              // porta alla pagina dei dettagli e passa i dati meteo come stato
              navigate("/details", { state: { weatherInfo } });
            })
            .catch((e) => {
              console.log("Errore nella ricerca meteo:", e);
              alert("Si è verificato un errore durante la ricerca dei dati meteo.");
            });
        }
      })
      .catch((e) => {
        console.log("Errore nella ricerca della città:", e);
        alert("Errore nella ricerca della città.");
      });
  };

  return (
    <Container fluid className="main-section pt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} className="text-center">
          <h1 className="text-light pb-3">Search for your city to find out what the weather is like </h1>
          <Form onSubmit={handleSearch} className="mb-5">
            <Form.Control
              type="text"
              placeholder="Search your city..."
              value={city}
              onChange={(e) => setCity(e.target.value)} // Imposta il valore dell'input
              className="mb-2"
            />
            <Button type="submit" variant="primary" className="mt-3">
              Search
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="justify-content-center gap-3 pb-5">
        <Col xs={12} sm={6} md={4} lg={3}>
          <Card>
            <Card.Img
              variant="top"
              src="https://plus.unsplash.com/premium_photo-1675975706513-9daba0ec12a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <Card.Body className="bg-dark rounded-bottom text-light">
              <Card.Title>ROME ☀️</Card.Title>
              <Card.Text>
                <div className="d-flex align-items-center">
                  <i className="bi bi-thermometer-half me-2 " style={{ color: "white", fontSize: "20px" }}></i>
                  <strong className="me-2">Temperature:</strong> 15°C{" "}
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-droplet-fill me-2" style={{ color: "white", fontSize: "20px" }}></i>
                  <strong className="me-2">Humidity:</strong> 20%
                </div>
                <p className="d-flex align-items-center mb-0">
                  <i className="bi bi-wind me-2" style={{ color: "white", fontSize: "20px" }}></i>
                  <strong className="me-2">Wind:</strong> 6 m/s
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={4} lg={3}>
          <Card>
            <Card.Img
              variant="top"
              src="https://plus.unsplash.com/premium_photo-1718035557075-5111d9d906d2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <Card.Body className="bg-dark rounded-bottom text-light">
              <Card.Title>PARIS ☀️</Card.Title>
              <Card.Text>
                <div className="d-flex align-items-center">
                  <i className="bi bi-thermometer-half me-2 " style={{ color: "white", fontSize: "20px" }}></i>
                  <strong className="me-2">Temperature:</strong> 9°C{" "}
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-droplet-fill me-2" style={{ color: "white", fontSize: "20px" }}></i>
                  <strong className="me-2">Humidity:</strong> 54%
                </div>
                <p className="d-flex align-items-center mb-0">
                  <i className="bi bi-wind me-2" style={{ color: "white", fontSize: "20px" }}></i>
                  <strong className="me-2">Wind:</strong> 12 m/s
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={4} lg={3}>
          <Card>
            <Card.Img
              variant="top"
              src="https://plus.unsplash.com/premium_photo-1661963067279-2f7bf970c49c?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <Card.Body className="bg-dark rounded-bottom text-light">
              <Card.Title>PRAGUE ☁️</Card.Title>
              <Card.Text>
                <div className="d-flex align-items-center">
                  <i className="bi bi-thermometer-half me-2 " style={{ color: "white", fontSize: "20px" }}></i>
                  <strong className="me-2">Temperature:</strong> 6°C{" "}
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-droplet-fill me-2" style={{ color: "white", fontSize: "20px" }}></i>
                  <strong className="me-2">Humidity:</strong> 80%
                </div>
                <p className="d-flex align-items-center mb-0">
                  <i className="bi bi-wind me-2" style={{ color: "white", fontSize: "20px" }}></i>
                  <strong className="me-2">Wind:</strong> 14m/s
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MainComponent;
