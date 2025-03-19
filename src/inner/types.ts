export type Subdivision = { code: string; name: string; __typename: string };

export type LanguageSchema = {
  name: string;
  native: string;
  code: string;
  __typename: "Language";
};

export type ContinentSchema = {
  name: string;
  code: string;
  __typename: "Continent";
};

export type CountrySchema = {
  name: string;
  code: string;
  emoji: string;
  currency: string | null;
  phone: string;
  languages: LanguageSchema[];
  capital: string | null;
  subdivisions: Subdivision[];
  continent: {
    name: string;
    code: string;
    __typename: "Continent";
  };
  __typename: "Country";
};

export type Countries = CountrySchema[];
