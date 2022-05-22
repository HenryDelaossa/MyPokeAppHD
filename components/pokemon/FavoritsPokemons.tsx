import { FC } from 'react';

import { Grid } from '@nextui-org/react';

import { CardPokemonFavorit } from './';

interface Props {
    pokemonFavorito: number[]
}

export const FavoritsPokemons: FC<Props> = ({ pokemonFavorito }) => {
    return (
        <Grid.Container gap={2} direction="row" justify='flex-start'>
            {
                pokemonFavorito.map((id) => (
                    <CardPokemonFavorit key={id} pokemonId={id} />
                ))
            }
        </Grid.Container>
    )
}
