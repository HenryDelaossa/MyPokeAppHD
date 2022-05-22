import { useEffect, useState } from 'react';
import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import Link from 'next/link';

import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import confetti from "canvas-confetti"

import { Layouts } from '../../components/layouts';
import { Pokemons } from '../../interfaces';
import { localStorFavorites } from '../../utils';
import { getPokemonInfo } from '../../utils';
import PokemonBYName from '../name/[name]';

interface Props {
  pokemon: Pokemons
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

  const [isInFavorits, setIsInFavorits] = useState(false);

  /* A hook that is called when the component is mounted. */
  // solucion para error hydration
  useEffect(() => {
    setIsInFavorits(localStorFavorites.ifExistPokeInFavorits(pokemon.id))
  }, [])

  const favoriteToggle = () => {

    localStorFavorites.ifExistPokeInFavorits(pokemon.id);
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
      <PokemonBYName pokemon={pokemon} />
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



  return {
    props: {
      pokemon: await getPokemonInfo(id)
    }
  }
}


export default PokemonPage
