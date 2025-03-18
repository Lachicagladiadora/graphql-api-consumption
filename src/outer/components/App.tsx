import { useEffect, useState } from "react";
import { Countries } from "../../inner/types";
import { DATA } from "../../inner/constants";
import { Country } from "./Country";
import { Continents } from "./Continents";
import {
  TypedDocumentNode,
  OperationVariables,
  gql,
  useQuery,
} from "@apollo/client";
import { DocumentNode } from "graphql";
import { ContinentData } from "../../inner/types";

const FEED_QUERY:
  | DocumentNode
  | TypedDocumentNode<
      { continents: ContinentData[] },
      OperationVariables
    > = gql`
  {
    continents {
      name
      code
      countries {
        name
        code
        emoji
        emojiU
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
          __typename
        }
        __typename
      }
    }
  }
`;

function App() {
  const { data } = useQuery(FEED_QUERY);
  console.log({ data });
  const [resultCountries, setResultCountries] = useState<Countries>([]);
  const [resultByContinent, setResultByContinent] = useState<ContinentData[]>(
    []
  );
  const [value, setValue] = useState("");
  const [filterBy, setFilterBy] = useState<"continent" | "language">(
    "continent"
  );

  useEffect(() => {
    if (!data) return;
    if (filterBy === "language") {
      const filterByLanguage = DATA.countries.filter((c) => {
        if (!c.languages.length) return false;
        return c.languages[0].name
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase())
          ? true
          : false;
      });
      setResultCountries(filterByLanguage);
      return;
    }
    const filterByContinent = data.continents.some((c) => {
      const existCountry = c.countries.filter((cur) =>
        cur.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
      console.log({ existCountry }, { c });

      if (!existCountry.length) return false;
      return true;
    });
    if (!value) setResultByContinent(data.continents);
    if (!filterByContinent) return;
    const newFilteredByContinent = data.continents.map((c) => {
      const filteredCountries = c.countries.filter((cur) =>
        cur.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
      if (!filteredCountries.length)
        return { name: c.name, code: c.code, countries: [] };
      return { name: c.name, code: c.code, countries: filteredCountries };
    });
    setResultByContinent(newFilteredByContinent);
  }, [value, filterBy, data]);

  useEffect(() => {
    if (!data) return;
    setResultByContinent(data.continents);
  }, [data]);

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
          onClick={() => setFilterBy("continent")}
          style={{
            background: filterBy === "continent" ? "#00796b" : "transparent",
            color: filterBy === "continent" ? "#fff" : "#898989",
          }}
        >
          Continent
        </button>
        <button
          onClick={() => setFilterBy("language")}
          style={{
            background: filterBy === "language" ? "#00796b" : "transparent",
            color: filterBy === "language" ? "#fff" : "#898989",
          }}
        >
          Language
        </button>
      </section>
      {filterBy === "language" && (
        <section className="countries-wrapper">
          {resultCountries.map((c, i) => (
            <Country key={i} currentCountry={c} />
          ))}
        </section>
      )}

      {filterBy === "continent" && (
        <Continents allContinents={resultByContinent} />
      )}
    </>
  );
}

export default App;
