import { useLocation } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

const MeteoDetailsComponent = () => {
  const location = useLocation();
  const { weatherInfo } = location.state || {};

  // Stato per i dati meteo dei prossimi 5 giorni
  const [meteoCinqueGiorni, setMeteoCinqueGiorni] = useState([]);

  // Funzione per fare la fetch dei dati meteo dei prossimi 5 giorni
  const fetchWeatherDays = () => {
    const apiKey = "a84e27c2398fcc67d1a63fd6b7d39c5c";

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${weatherInfo.coord.lat}&lon=${weatherInfo.coord.lon}&appid=${apiKey}&units=metric`)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Errore nella chiamata");
        }
      })
      .then((data) => {
        console.log(data); //fare slice
        setMeteoCinqueGiorni(data.list); // dati salvati in meteocinqueGiorni
      })
      .catch((error) => {
        console.error("Errore:", error);
      });
  };

  // Quando arrivano i dati, parte la fetch solo se weatherInfo è definito
  useEffect(() => {
    if (weatherInfo) {
      fetchWeatherDays();
    }
  }, [weatherInfo]);
  if (!weatherInfo) {
    return (
      <Container className="main-section text-center pt-5">
        <div className="alert alert-danger" role="alert">
          <h3>Nessun dato trovato!</h3>
        </div>
      </Container>
    );
  } else {
    const description = weatherInfo.weather[0].main;
    const firstTemperature = weatherInfo.main.temp;
    const minTemperature = weatherInfo.main.temp_min;
    const maxTemperature = weatherInfo.main.temp_max;

    // Funzione per cambiare icona a seconda della descrizione meteo
    const getWeatherIcon = (description) => {
      switch (description) {
        case "Thunderstorm":
          return "⛈️";

        case "Rain":
          return "🌧️";
        case "Snow":
          return "❄️";
        case "Clear":
          return "☀️";
        case "Clouds":
          return "☁️";

        case "Fog":
          return "🌫️";

        default:
          return "❓";
      }
    };

    return (
      <Container fluid className="main-section pt-3">
        <div className="d-flex flex-column pb-4">
          <div className="d-flex flex-column display-1 text-center mx-auto">
            <p className="text-light fw-bold">{weatherInfo.name.toUpperCase()}</p>
            <p className="display-1">{getWeatherIcon(description)}</p>
            <p className="text-light">{weatherInfo.weather[0].description}</p>
          </div>
          <div className="d-flex mx-auto flex-column">
            <div className="d-flex align-items-center gap-4">
              <div className="fs-1">
                <p className="text-light">
                  <i className="bi bi-thermometer-half me-2" style={{ color: "white", fontSize: "24px" }}></i>
                  <strong>Temperature:</strong> {(firstTemperature - 273.15).toFixed(1)} °C
                </p>
              </div>
              <div className="d-flex flex-column fs-5" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                <p>
                  <strong>Max: </strong> {(maxTemperature - 273.15).toFixed(1)}
                </p>
                <p>
                  <strong>Min: </strong> {(minTemperature - 273.15).toFixed(1)}
                </p>
              </div>
            </div>

            <div className="fs-1">
              <p className="text-light">
                <i className="bi bi-droplet-fill me-2" style={{ color: "white", fontSize: "24px" }}></i>
                <strong>Humidity:</strong> {weatherInfo.main.humidity}%
              </p>
            </div>
            <div className="fs-1 pb-3">
              <p className="text-light">
                <i className="bi bi-wind me-2" style={{ color: "white", fontSize: "24px" }}></i>
                <strong>Wind:</strong> {weatherInfo.wind.speed} m/s
              </p>
            </div>
          </div>
          <div>
            {" "}
            <h1 className="text-light ms-4 mb-4 ">Next Five Days:</h1>
          </div>
        </div>

        <Row className="d-flex justify-content-around">
          {
            //prendo il primo elemento dei primi cinque giorni
            //index --> iterazione per ogni giorno
            meteoCinqueGiorni.slice(0, 5).map((day, index) => {
              //data di oggi
              const today = new Date();

              //prendo la data di oggi e aggiungo 0 giorni al primo giro, 1 al secondo ecc...
              const cardDate = new Date(today.setDate(today.getDate() + index));

              //converto la data e ricavo solo il nome del giorno
              const dayName = cardDate.toLocaleDateString("en-US", { weekday: "long" });

              //ottengop temperatura approssimata
              const temperature = day.main.temp.toFixed(1);

              //icona in base alla descrizione
              const weatherDescription = day.weather[0].main;
              const icon = getWeatherIcon(weatherDescription);

              return (
                <Col key={day.dt} xs={10} md={4} lg={3} xl={2} className="mb-5">
                  <Card>
                    <Card.Body className="DaysCards text-light rounded border">
                      <Card.Title>{dayName}</Card.Title>
                      <Card.Text>
                        <p className="mt-3 fs-2">
                          <strong className="me-2">{weatherDescription.toUpperCase()}</strong>
                          {icon}
                        </p>

                        <div>
                          <p className="text-light">
                            <i className="bi bi-thermometer-half me-2" style={{ color: "white", fontSize: "18px" }}></i>
                            <strong>Temperature:</strong> {temperature} °C
                          </p>
                        </div>
                        <div className="d-flex gap-2" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                          <p>
                            <strong>Max: </strong> {day.main.temp_max} °C
                          </p>
                          <p>
                            <strong>Min: </strong> {day.main.temp_min} °C
                          </p>
                        </div>

                        <div>
                          <p className="text-light">
                            <i className="bi bi-droplet-fill me-2" style={{ color: "white", fontSize: "18px" }}></i>
                            <strong>Humidity:</strong> {day.main.humidity}%
                          </p>
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          }
        </Row>
      </Container>
    );
  }
};

export default MeteoDetailsComponent;
