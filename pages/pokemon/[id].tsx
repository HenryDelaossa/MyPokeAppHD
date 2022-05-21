import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import { useRouter } from 'next/router'
import { pokeApi } from '../../api';
import { Pokemons } from '../../interfaces';

interface Props {
    pokemon: Pokemons
}

const PokemonPage:NextPage<Props> = ({pokemon}) => {

    console.log(pokemon)

    const router = useRouter()
    console.log(router.query)
  return (
    <div>
        <p>hola, soy {pokemon.name}</p>
        <img src={`${pokemon.sprites.front_default}`} alt={`imagen pokemon ${pokemon.name}`} />
    </div>
  )
}




export const getStaticPaths: GetStaticPaths = async (ctx) => {

    
    
    /* creo un array de 250 elementos, y luego mapear cada elemento a una cadena del índice + 1*/
    // constatar primero de cuanto es el limit de la api, ver: pages/pokemon/index.tsx  {getStaticProps}
    const totalPokemons = [...Array(250)].map((val, i) => `${i + 1}`)

    // console.log(totalPokemons)

    return {
        paths: totalPokemons.map(id => ({
            params: {id}
        })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {

    const {id} = params as {id:string}

    const { data } = await pokeApi.get<Pokemons>(`/pokemon/${id}`)
      
  
  
    return {
      props: {
          pokemon:data
      }
    }
  }


export default PokemonPage
