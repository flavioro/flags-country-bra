import React from "react";

const options = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const Filter = () => (
  <select>
    {options.map((e, i) =>
      <option value={e} key={i}>{e}</option>
    )}
  </select>
);

export default Filter;