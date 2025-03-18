export type Subdivisions = { code: string; name: string; __typename: string };

export type Language = {
  name: string;
  native: string;
  code: string;
  __typename: "Language";
};
export type Languages = Language[] | [];

export type ContinentData = {
  name: string;
  code: string;
  countries: CountryData[];
};

export type CountryData = {
  name: string;
  code: string;
  emoji: string;
  emojiU: string;
  currency: string | null;
  phone: string;
  languages: Languages;
  capital: string | null;
  subdivisions: Subdivisions[];
  continent: {
    name: string;
    __typename: "Continent";
  };
  __typename: "Country";
};

export type Countries = CountryData[];
