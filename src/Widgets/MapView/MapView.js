import React, { useState, useEffect } from "react";
import "./MapView.css";
import {
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import InfoBox from "../../Components/InfoBox";
import { prettyPrintStat } from "../../Utils";
import numeral from "numeral";
import Map from "../../Components/Map";
import "leaflet/dist/leaflet.css";

const infoBoxColorMap = {
  cases: 'c19t-infoBox--redish',
  recovered: 'c19t-infoBox--greenish',
  deaths: 'c19t-infoBox--darkredish',
};

const App = ({ title = 'Covid 19 Tracker - Map View' }) => {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
          setMapCountries(data);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <div><h1>{title}</h1></div>
          <div>
            <FormControl className="app__dropdown c19t-country">
              <Select
                className="c19t-country__select"
                value={country}
                onChange={onCountryChange}
              >
                <MenuItem
                  value="worldwide"
                  className="c19t-country__option"
                  >
                    Worldwide
                </MenuItem>
                {countries.map((country) => (
                  <MenuItem className="c19t-country__option" value={country.value}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            className={`c19t-cases ${casesType === 'cases' && infoBoxColorMap.cases}`}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            className={`c19t-recovered ${casesType === 'recovered' && infoBoxColorMap.recovered}`}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            className={`c19t-deaths ${casesType === 'deaths' && infoBoxColorMap.deaths}`}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </div>
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
    </div>
  );
};

export default App;
