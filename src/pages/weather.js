import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import axios from "axios";
import styled from "styled-components";

import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Card,
  CardBlock,
} from "@bootstrap-styled/v4";

const Div = styled.div`
  margin-top: 1rem;
`;

const Img = styled.img`
  margin-bottom: 0;
`;

const HugeText = styled.span`
  font-size: 3rem;
`;

const BigText = styled.span`
  font-size: 2rem;
`;

const Grid = styled.div`
  width: 100%;
`;
const Row = styled.div`
  width: 100%;
  display: flex;
`;

const Col = styled.div`
  flex-grow: ${props => (props.grow ? 1 : 0)};
`;

const CardFooter = styled.div`
  padding: 0.75rem 1.25rem;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
  p {
    margin: 0;
  }
`;

const windDegToCard = value => {
  value = parseFloat(value);
  if (value <= 11.25) return "N";
  value -= 11.25;
  var allDirections = [
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
    "N",
  ];
  var dIndex = parseInt(value / 22.5);
  return allDirections[dIndex] ? allDirections[dIndex] : "N";
};

const Weather = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadWeather = async () => {
      const resToday = await axios.get(
        "https://api.openweathermap.org/data/2.5/onecall?lat=48.85&lon=2.35&appid=98ccb10032a8b2b2e8891cf936ca9f3a&units=metric&exclude=minutely,hourly,alerts"
      );
      setData(resToday.data);
    };
    loadWeather();
  }, []);
  return (
    <Layout>
      <SEO title="Weather - Paris" />
      <div>Weather</div>
      <h1>Paris</h1>
      {data ? (
        <>
          <Card>
            <CardBlock>
              <Grid>
                <Row>
                  <Col grow={true}>
                    <div>Today</div>
                    <HugeText>
                      {Math.round(data.current.temp)}ºC,
                      {data.current.weather[0].main}
                    </HugeText>
                    <div>
                      Feels like {Math.round(data.current.feels_like)}ºC
                    </div>
                  </Col>
                  <Col>
                    <Img
                      src={`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`}
                      alt=""
                    />
                  </Col>
                </Row>
              </Grid>
            </CardBlock>
            <CardFooter>
              <p>
                Humidity is about <b>{data.current.humidity}%</b>.
              </p>
            </CardFooter>
            <CardFooter>
              <p>
                The <b>{windDegToCard(data.current.wind_deg)}</b> wind's speed
                is <b>{data.current.wind_speed} m/s</b>.
              </p>
            </CardFooter>
          </Card>

          <ListGroup tag={Div}>
            <ListGroupItem tag={Div}>
              <ListGroupItemHeading>
                Weather forecast (7 days)
              </ListGroupItemHeading>
            </ListGroupItem>
            {data.daily.map(
              (day, i) =>
                i > 0 && (
                  <ListGroupItem tag={Grid} key={i}>
                    <Row>
                      <Col grow={true}>
                        <div>
                          {new Date(day.dt * 1000).toLocaleDateString(
                            undefined,
                            {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </div>
                        <BigText>
                          {Math.round(day.temp.day)}ºC, {day.weather[0].main}
                        </BigText>
                        <div>Feels like {Math.round(day.feels_like.day)}ºC</div>
                        <div>
                          min. {Math.round(day.temp.min)}ºC & max. {Math.round(day.temp.max)}ºC
                        </div>
                      </Col>
                      <Col>
                        <Img
                          src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                          alt=""
                        />
                      </Col>
                    </Row>
                  </ListGroupItem>
                )
            )}
          </ListGroup>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Layout>
  );
};

export default Weather;
