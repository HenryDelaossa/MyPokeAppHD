import { pokeApi } from "../api";
import { Pokemons } from "../interfaces";

export const getPokemonInfo = async (idOrname:string) => {


  const { data } = await pokeApi.get<Pokemons>(`/pokemon/${idOrname}`);

  return {
    id: data.id,
    name: data.name,
    sprites: data.sprites,
    abilities: data.abilities
  }

}