import { useEffect, useState } from 'react';
import { Layouts } from '../../components/layouts'
import {NoFavorit} from '../../components/ui'
import { localStorFavorites } from '../../utils';
import { FavoritsPokemons } from '../../components/pokemon';

const FavoritesPage = () => {

  const [pokemonFavorito, setPokemonFavorito] = useState<number[]>([])

  useEffect(()=> {
    setPokemonFavorito(localStorFavorites.pokemons())
  },[])



  return (
    <>
        <Layouts title='Pokemons-Favoritos'>
          {
            pokemonFavorito.length===0 ? <NoFavorit/> : <FavoritsPokemons pokemonFavorito={pokemonFavorito}/>
            
          }
        </Layouts>
    </>
  )
}

export default FavoritesPage