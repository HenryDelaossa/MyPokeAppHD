import type { NextPage, GetStaticProps } from 'next'

import { Layouts } from '../components/layouts';
import { PokemonCards } from '../components/pokemon';

import { pokeApi } from '../api'
import { ResponsePokemons, PokemonsSmall } from '../interfaces'
import { GridContainerNextUI } from '../components/layouts';
import { useState, useEffect } from 'react';
import { Button, Container } from '@nextui-org/react';

interface Props {
  pokemons: PokemonsSmall[]
}


const Home: NextPage<Props> = ({ pokemons }) => {



  const [cantToShowAdd, setCantToShowAdd] = useState(20)

  pokemons.slice(0, cantToShowAdd)

  const showMoreCards = () => {
    setCantToShowAdd(cantToShowAdd + 20)
  }

  return (
    <>
      <Layouts title='Listado de pokemons'>
        <GridContainerNextUI>
          {pokemons.slice(0, cantToShowAdd).map(poke => <PokemonCards key={poke.id} pokemons={poke} />)}
        </GridContainerNextUI>
        {cantToShowAdd <= pokemons.length && <Container display='flex' justify='center'>
          <Button ghost onClick={() => showMoreCards()}>ver mas</Button>
        </Container>
        }
      </Layouts>

    </>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
// getStatics props solo se puede usar en las pages...

export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<ResponsePokemons>("/pokemon?limit=250")
  // console.log(data.results)

  const pokemons: PokemonsSmall[] = data.results.map((pok, i) => (
    Object.assign(pok, { id: i + 1 }, { img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg` })
  ))


  return {
    props: {
      pokemons
    }
  }
}

export default Home
