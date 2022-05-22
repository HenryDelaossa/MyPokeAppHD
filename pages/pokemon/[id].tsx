import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { pokeApi } from '../../api';
import { Layouts } from '../../components/layouts';
import { Pokemons } from '../../interfaces';

interface Props {
  pokemon: Pokemons
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

  // console.log(pokemon)
  // console.log(infoExtra.)

  const router = useRouter()
  console.log(router.query)
  return (
    <>
      <Layouts title={`pokemon-${pokemon.name}`}>
        <Grid.Container css={{ marginTop: "5px" }} gap={2}>
          <Grid xs={12} sm={4}>
            <Card hoverable css={{ padding: "30px" }}>
              <Card.Body>
                <Card.Image src={pokemon.sprites.other?.dream_world.front_default || "/No-Img.png"}
                  alt={pokemon.name}
                  width="100%"
                  height={200}
                  css={{ cursor: "pointer" }}
                />
              </Card.Body>
            </Card>
          </Grid>
          <Grid xs={12} sm={8}>
            <Card>
              <Card.Header css={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                <Text h1 transform='capitalize'>{pokemon.name}</Text>
                <Button color="gradient" ghost >
                  guardar en favoritos
                </Button>
              </Card.Header>
              <Card.Body>
                <Text size={30}>Sprites: </Text>
                <Container direction='row' display='flex'>
                  <Image
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <Image
                    src={pokemon.sprites.back_default}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <Image
                    src={pokemon.sprites.front_shiny}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <Image
                    src={pokemon.sprites.back_shiny}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                </Container>
              </Card.Body>
            </Card>
          </Grid>
          <Grid xl={12} md={12} xs={12} sm={12}>
            <Card>
              <Card.Header css={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                <Text h2 transform='uppercase' weight={"bold"}>habilidades</Text>
              </Card.Header>
              <Card.Body >
                <Container display='flex' justify='space-evenly'>
                  {pokemon.abilities.map((habi) =>
                    <Card bordered css={{ marginTop: "10px", width: "200px" }} key={habi.ability.name}>
                      <Link href={`https://www.deepl.com/es/translator#en/es/${habi.ability.name}%0A`}>
                        <a target="_blank" style={{ textAlign: "center", color: "white" }}>{habi.ability.name}</a>
                      </Link>
                    </Card>
                  )}
                </Container>
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
      </Layouts>
    </>
  )
}




export const getStaticPaths: GetStaticPaths = async (ctx) => {



  /* creo un array de 250 elementos, y luego mapear cada elemento a una cadena del índice + 1*/
  // constatar primero de cuanto es el limit de la api, ver: pages/pokemon/index.tsx  {getStaticProps}
  const totalPokemons = [...Array(250)].map((val, i) => `${i + 1}`)

  // console.log(totalPokemons)

  return {
    paths: totalPokemons.map(id => ({
      params: { id }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { id } = params as { id: string }

  const { data } = await pokeApi.get<Pokemons>(`/pokemon/${id}`)



  return {
    props: {
      pokemon: data
    }
  }
}


export default PokemonPage
