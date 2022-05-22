import { FC } from "react";

import { useRouter } from "next/router";

import { Grid, Card } from "@nextui-org/react";

interface Props {
    pokemonId: number
}

export const CardPokemonFavorit: FC<Props>= ({pokemonId}) => {
    
    const router = useRouter()

    /**
     * When the user clicks on the favorite button, the user will be redirected to the page of the
     * pokemon that they clicked on.
     */
    const onFavoritePokemClicked = () => {
        router.push(`/pokemon/${pokemonId}`)
    }


  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={pokemonId} onClick={onFavoritePokemClicked}>
    <Card hoverable clickable css={{
      padding:10
    }}
    >
      <Card.Image
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
      width={"100%"}
      height={140}
      />

    </Card>
  </Grid>
  )
}
