import type { NextPage, GetStaticProps } from 'next'
import { pokeApi } from '../api'
import { ResponsePokemons, PokemonsSmall } from '../interfaces'
import { Layouts } from '../components/layouts'

interface Props {
  pokemons: PokemonsSmall[]
}


const Home: NextPage<Props> = ({ pokemons }) => {

  console.log(pokemons)
  

  return (
    <>
      <Layouts title='Listado de pokemons'>
          {pokemons.map(({name, id, img}) => 
            <div key={id}>
              <p >id: {id} Nombre: {name}</p>
              <img src={img} alt={`imagen pokemon ${name}`} />
            </div>
          )}
  

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

  const { data } = await pokeApi.get<ResponsePokemons>("/pokemon?limit=151")
  console.log(data.results)

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
