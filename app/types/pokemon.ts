export interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
  types: PokemonType[];
}

export interface PokemonType {
  name: string;
  url: string;
}
