import {
  TypedDocumentNode,
  OperationVariables,
  gql,
  useQuery,
} from "@apollo/client";
import { DocumentNode } from "graphql";
import { CountrySchema, LanguageSchema } from "../../inner/types";
import { Country } from "./Country";

const FEED_QUERY:
  | DocumentNode
  | TypedDocumentNode<
      { languages: LanguageSchema[] },
      OperationVariables
    > = gql`
  {
    languages {
      name
      code
      __typename
    }
  }
`;

type LanguagesProps = { countries: CountrySchema[] };

export const Languages = ({ countries }: LanguagesProps) => {
  const { data: languagesData } = useQuery(FEED_QUERY);

  type FilterCountriesByLanguageOutput = {
    language: string;
    codeLanguage: string;
    countries: CountrySchema[];
  }[];

  const filterCountriesByLanguage = (
    allCountries: CountrySchema[]
  ): FilterCountriesByLanguageOutput => {
    const countriesPerLanguage = languagesData?.languages.map((c) => ({
      language: c.name,
      codeLanguage: c.code,
      countries:
        allCountries.filter((country) => {
          const existLanguage = country.languages.some(
            (curr) =>
              curr.name.toLocaleLowerCase() === c.name.toLocaleLowerCase()
          );
          return existLanguage;
        }) ?? [],
    }));
    return countriesPerLanguage ?? [];
  };

  return (
    <>
      {Boolean(languagesData?.languages.length) &&
        filterCountriesByLanguage(countries).map((c) => (
          <div key={c.codeLanguage} className="wrapper-filtered-by">
            {Boolean(c.countries.length) && (
              <>
                <h2 className="second-title">
                  {c.language} ({c.codeLanguage})
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
