import { useEffect, useState } from 'react';
import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import Link from 'next/link';

import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import confetti from "canvas-confetti"

import { Layouts } from '../../components/layouts';
import { Pokemons, ResponsePokemons } from '../../interfaces';
import { localStorFavorites } from '../../utils';
import { getPokemonInfo } from '../../utils';
import { pokeApi } from '../../api';
import { redirect } from 'next/dist/server/api-utils';

interface Props {
  pokemon: Pokemons
}

const PokemonBYName: NextPage<Props> = ({ pokemon }) => {

  const [isInFavorits, setIsInFavorits] = useState(false)

  useEffect(()=> {
    setIsInFavorits(localStorFavorites.ifExistPokeInFavorits(pokemon.id))
  },[])

  const favoriteToggle = () => {
    localStorFavorites.favoriteToggle(pokemon.id);
    setIsInFavorits(!isInFavorits)

    /* Returning from the function if the isInFavorits is true. */
    if (isInFavorits) return
    const duration = 0.7 * 1000;
    let animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }
    const interval: any = setInterval(function () {

      let timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval)
      let particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));

    }, 250);
  }
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
                <Button shadow color={!isInFavorits ? "gradient" : "error"} ghost={isInFavorits} rounded={isInFavorits} borderWeight="light" onPress={favoriteToggle}>
                  {!isInFavorits ? "guardar en favoritos" : "Eliminar de favoritos"}
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

  const { data } = await pokeApi.get<ResponsePokemons>(`/pokemon?limit=250`)
  const namesPokemons: string[] = data.results.map(pokemon => pokemon.name)

  // console.log(totalPokemons)

  return {
    paths: namesPokemons.map(name => ({
      params: { name }
    })),
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { name } = params as { name: string }

  const pokemon = await getPokemonInfo(name)
  if (!pokemon) return {redirect:{destination:"/", permanent:false}}


  return {
    props: {
      pokemon
    },
    revalidate:10
  }
}


export default PokemonBYName