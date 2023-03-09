require('dotenv').config();

export const PORT = process.env.PORT || 3000;
export const WELCOME_MESSAGE = "Welcome to PokeAPI (Ping endpoint)";
export const MONGO_URL = "mongodb://localhost:27017/Pokemon";
export const FINDALL_ERROR = "There was a problem fetching all pokemons Known: ";
export const CREATE_ERROR = "There was a problem creating a new pokemon: ";
export const CREATE_EXTERNAL_ERROR = "There was a problem creating a new pokemon from pokedex api request: ";
export const DELETE_ERROR = "There was a problem deleting the pokemon: ";
export const UPDATE_ERROR = "There was a problem updating the pokemon: ";
export const POKEMON_API_BASE_URL = "https://pokeapi.co/api/v2/pokemon/";