/*
 Non utilisé (Inclus directement dans pages/city/search comme recommandé par Next)

import cities from "../../../public/city.list.json";
const levenSort = require("leven-sort");

export default function getCity({ query: { city } }, res) {
  cities = cities.filter((c) =>
    c.name.toLowerCase().includes(city.toLowerCase())
  );
  cities = levenSort(cities, city, ["name"]);

  res.status(200).json({
    cities,
  });
}
*/
