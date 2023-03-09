import { IPokemon } from "../interfaces/amaris.interface";
import { Pokemon } from "../models/amaris.model";
import { WELCOME_MESSAGE, POKEMON_API_BASE_URL } from "../constants/amaris.constants";
import fetch from "node-fetch";

type pokedexPokemon = {[key: string] : string}

export class PokemonService {
  
    public getWelcomeMessage() {
      return WELCOME_MESSAGE;
    }

    public findAll(): Promise<IPokemon[]> {
        return Pokemon.find({}).exec();
      }

      public add(pokemon: IPokemon): Promise<IPokemon> {
        const newPokemon = new Pokemon(pokemon);
        return newPokemon.save();
      }

    public async addExternal(name: string){

        const pokemonApiData: any = await fetch(POKEMON_API_BASE_URL + name, {
            method: 'GET',
            headers: {
            Accept: 'application/json',
        },
         }).then(res => res.json());

        if (pokemonApiData){
            const newPokemon = new Pokemon();
            newPokemon.name = pokemonApiData.name;
            newPokemon.gender = 'Any';
            newPokemon.type = pokemonApiData.types[0].type.name;
            newPokemon.height = pokemonApiData.height;
            newPokemon.weight = pokemonApiData.weight;
            newPokemon.photo = pokemonApiData.sprites.front_default;

            return newPokemon.save();
        }
        else{
            throw new Error(`Pokemon with name '${name}' not found in the pokedex API`);
        }

        
      }

      public async delete(id: string) {
        const deletedPokemon = await Pokemon.findByIdAndDelete(
          id
        ).exec();
    
        if (!deletedPokemon) {
          throw new Error(`Pokemon with id '${id}' not found`);
        }
    
        return deletedPokemon;
      }
    
      public async update(id: string, pokemon: IPokemon) {
        const updatedPokemon = await Pokemon.findByIdAndUpdate(
          id,
          pokemon
        ).exec();
    
        if (!updatedPokemon) {
          throw new Error(`Pokemon with id '${id}' not found`);
        }
    
        return updatedPokemon;
      }
  }

  