import {
  TypedDocumentNode,
  OperationVariables,
  gql,
  useQuery,
} from "@apollo/client";
import { DocumentNode } from "graphql";
import { ContinentSchema, CountrySchema } from "../../inner/types";
import { Country } from "./Country";

const FEED_QUERY:
  | DocumentNode
  | TypedDocumentNode<
      { continents: ContinentSchema[] },
      OperationVariables
    > = gql`
  {
    continents {
      name
      code
      __typename
    }
  }
`;

type ContinentsProps = { countries: CountrySchema[] };

export const Continents = ({ countries }: ContinentsProps) => {
  const { data: continentsData } = useQuery(FEED_QUERY);

  type FilterCountriesByContinentOutput = {
    continent: string;
    codeContinent: string;
    countries: CountrySchema[];
  }[];

  const filterCountriesByContinent = (
    allCountries: CountrySchema[]
  ): FilterCountriesByContinentOutput => {
    const countriesPerContinent = continentsData?.continents.map((c) => ({
      continent: c.name,
      codeContinent: c.code,
      countries:
        allCountries.filter(
          (cur) =>
            cur.continent.name.toLocaleLowerCase() ===
            c.name.toLocaleLowerCase()
        ) ?? [],
    }));
    return countriesPerContinent ?? [];
  };

  return (
    <>
      {Boolean(continentsData?.continents.length) &&
        filterCountriesByContinent(countries).map((c) => (
          <div key={c.continent} className="wrapper-filtered-by">
            {Boolean(c.countries.length) && (
              <>
                <h2 className="second-title">
                  {c.continent} ({c.codeContinent})
                </h2>
                <div className="countries-wrapper">
                  {c.countries.map((cur) => (
                    <Country key={cur.code} currentCountry={cur} />
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
    </>
  );
};
