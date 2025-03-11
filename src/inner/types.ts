export type Language = {
  name: string;
  native: string;
  __typename: "Language";
};
export type Languages = Language[];

export type Continent = {
  name: string;
  __typename: "Continent";
};

export type Country = {
  name: string;
  code: string;
  emoji: string;
  currency: string | null;
  phone: string;
  languages: Languages;
  capital: string | null;
  continent: Continent;
  __typename: "Country";
};

export type Countries = Country[];
