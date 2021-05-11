import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import axios from 'axios'

import { formatNumber } from '../helpers/utilities';
import { Country } from "../types/Country";
import Filter from '../components/Filter'

import api from '../api/Api'

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const Home = () => {
  // const [countries, setCountries] = useState<Country[]>();
  const [countries, setCountries] = useState();
  const [countriesAll, setCountriesAll] = useState();
  const [textSearch, setTextSearch] = useState('');
  const [regionSelected, setRegionSelected] = useState('');

  useEffect(() => {
    if (textSearch && textSearch.length > 0) {
      axios.get(`https://restcountries.eu/rest/v2/name/${textSearch}`)
        .then(({ data }) => setCountries(data));
    } else {
      setCountries(countries);
    }
  }, [textSearch]);

  useEffect(() => {
    QueryAllCountries()
    setCountriesAll(countries)
  }, []);

  useEffect(() => {
    if (regionSelected) {
      axios.get(`https://restcountries.eu/rest/v2/region/${regionSelected}`)
        .then(({ data }) => setCountries(data));
    } else {
      setCountries(countriesAll);
    }
  }, [regionSelected]);


  const QueryAllCountries = async () => {
    // Use [] as second argument in useEffect for not rendering each time
    axios.get('https://restcountries.eu/rest/v2/all')
      // .then((response: AxiosResponse) => {
      .then((response) => {
        setCountries(response.data);
      });
  }

  const handleInput = ({ value }) => {
    setTextSearch(value)
  }

  const handleChange = (e) => {
    setRegionSelected(e.target.value);
  }

  return (
    <>
      <Grid container className='filter-row'>
        <Grid item xs={9}>
          <InputBase
            placeholder="Search for a country..."
            inputProps={{ 'aria-label': 'search' }}
            onInput={({ target }) => handleInput(target)}
            value={textSearch}
          />
        </Grid>

        {/* <Grid item xs={3}>
          <Filter />
        </Grid> */}

        <FormControl variant="outlined">
          <InputLabel id="region-label">Região</InputLabel>
          <Select
            labelId="region-label"
            value={regionSelected}
            onChange={handleChange}
            label="Region"
          >
            <MenuItem value="All">
              <span>Filter by Region</span>
            </MenuItem>
            <MenuItem value="Africa">Africa</MenuItem>
            <MenuItem value="Americas">Americas</MenuItem>
            <MenuItem value="Asia">Asia</MenuItem>
            <MenuItem value="Europe">Europe</MenuItem>
            <MenuItem value="Oceania">Oceania</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Countries flags */}
      <Grid container spacing={3}>
        {countries && (
          countries.map((country, i) => (
            <Grid item xs={3} key={i}>

              <Link to={`countries/${country.alpha3Code}`} params={{ countryMap: country }}>
                <img src={country.flag} alt={`Flag of ${country.name}`} />
              </Link>

              <div>
                <h5>{country.name}</h5>
                <p><strong>Population:</strong> {formatNumber(country.population)}</p>
                <p><strong>Region:</strong> {country.region}</p>
                <p><strong>Capital:</strong> {country.capital}</p>
              </div>

            </Grid>
          ))
        )}

      </Grid>

    </>

  );
};

export default Home;
