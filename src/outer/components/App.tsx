import { useEffect, useState } from "react";
import { CountrySchema } from "../../inner/types";
import { Continents } from "./Continents";
import {
  TypedDocumentNode,
  OperationVariables,
  gql,
  useQuery,
} from "@apollo/client";
import { DocumentNode } from "graphql";
import { Languages } from "./Languages";

const FEED_QUERY:
  | DocumentNode
  | TypedDocumentNode<{ countries: CountrySchema[] }, OperationVariables> = gql`
  {
    countries {
      name
      code
      emoji
      currency
      phone
      languages {
        name
        native
        code
      }
      capital
      subdivisions {
        code
        name
        __typename
      }
      continent {
        name
        code
        __typename
      }
      __typename
    }
  }
`;

function App() {
  const { data: countriesData } = useQuery(FEED_QUERY);
  const [countriesByContinent, setCountriesByContinent] = useState<
    CountrySchema[]
  >([]);
  const [countriesByLanguages, setCountriesByLanguages] = useState<
    CountrySchema[]
  >([]);
  const [value, setValue] = useState("");
  const [filterBy, setFilterBy] = useState<"continent" | "language">(
    "continent"
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!countriesData) return;
    if (!filterBy) return;

    if (!value) {
      setCountriesByLanguages(countriesData.countries);
      setCountriesByContinent(countriesData.countries);
      setIsLoading(false);
      return;
    }

    if (filterBy === "language" && value) {
      setIsLoading(true);
      const filterByLanguage = countriesData.countries.filter((c) =>
        c.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
      setCountriesByLanguages(filterByLanguage);
      setIsLoading(false);
      return;
    }

    if (filterBy === "continent" && value) {
      setIsLoading(true);
      const filterByContinent = countriesData.countries.filter((c) =>
        c.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );

      if (!filterByContinent) return;

      const newFilteredByContinent = countriesData.countries.filter((cur) =>
        cur.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
      setCountriesByContinent(newFilteredByContinent);
      setIsLoading(false);
      return;
    }
  }, [value, filterBy, countriesData]);

  return (
    <>
      <h1>Country Search</h1>
      <section className="searcher-wrapper">
        Some random text
        <div className="input-wrapper">
          <div className="icon">⚲</div>
          <input
            className="input-search"
            type="text"
            placeholder=""
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </section>
      <section className="buttons-wrapper">
        <h2>Group by:</h2>
        <button
          onClick={() => {
            setIsLoading(true);
            setFilterBy("continent");
          }}
          style={{
            background: filterBy === "continent" ? "#00796b" : "transparent",
            color: filterBy === "continent" ? "#fff" : "#898989",
          }}
        >
          Continent
        </button>
        <button
          onClick={() => {
            setIsLoading(true);
            setFilterBy("language");
          }}
          style={{
            background: filterBy === "language" ? "#00796b" : "transparent",
            color: filterBy === "language" ? "#fff" : "#898989",
          }}
        >
          Language
        </button>
      </section>
      <section className="results-wrapper">
        {isLoading && <div className="loading-wrapper">...Loading</div>}
        {filterBy === "language" && !isLoading && (
          <Languages countries={countriesByLanguages} />
        )}

        {filterBy === "continent" && !isLoading && (
          <Continents countries={countriesByContinent} />
        )}
      </section>
    </>
  );
}

export default App;
