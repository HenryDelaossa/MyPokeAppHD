import { ChangeEvent, FC, useState } from 'react';

import { PokemonCards } from '../pokemon/PokemonCards';
import { Inputs } from './Input';
import { GridContainerNextUI } from '../layouts';
import { PokemonsSmall } from "../../interfaces"

import { Container, Tooltip, Button, Text, Grid } from '@nextui-org/react';

interface Props {

    dataArr: PokemonsSmall[]
    intervalo: number
    pagination?: boolean
}

export const ContentOptionPagination: FC<Props> = ({ dataArr, intervalo, pagination }) => {

    // paginacion 
    const [showOnPage, setshowOnPage] = useState(0);
    const [filtrar, setFiltrar] = useState("")/*filtro para busqueda */
    let numberOfPage = (showOnPage / intervalo) + 1;

    const pageFromPokemons = () => {
        if (filtrar.length === 0) return dataArr.slice(showOnPage, showOnPage + intervalo)

        const ifFilter = dataArr.filter((pok) => pok.name.includes(filtrar.toLowerCase()))
        return ifFilter.slice(showOnPage, showOnPage + intervalo)
    }

    const nextPage = () => {
        showOnPage < dataArr.length - intervalo &&  setshowOnPage(showOnPage + intervalo)
    }

    const prevPage = () => {
        showOnPage > 0 && setshowOnPage(showOnPage - intervalo)
    }

    // filtrar
    const onChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setshowOnPage(0)
        setFiltrar(e.target.value)
    }




    return (
        <>
            <GridContainerNextUI>
                {
                    pagination ? pageFromPokemons().map(poke => <PokemonCards key={poke.id} pokemons={poke} />) : dataArr.map(poke => <PokemonCards key={poke.id} pokemons={poke} />)

                }
            </GridContainerNextUI>

            <Inputs value={filtrar} onChange={onChangeFilter} />

            {pagination && showOnPage <= dataArr.length &&
                <Grid.Container>
                    <Grid xs={12} xl={12} sm={12} md={12} alignContent="center" justify='center' alignItems='center'>
                        <Container
                            display='flex'
                            justify='center'
                            alignItems='center'
                            css={{ pt: "50px", pl: 0, pr: 0 }}>

                            <Tooltip
                                color="secondary"
                                contentColor="invert"
                                content={showOnPage !== 0 ? "pagina anterior" : ""}>
                                <Button
                                    disabled={showOnPage === 0}
                                    css={{ margin: "0 30px" }}
                                    auto
                                    color="gradient"
                                    onClick={() => prevPage()}>{`<<`}</Button>
                            </Tooltip>

                            <Text css={{ margin: 0, textAlign: "center" }}>pagina<br />{numberOfPage}</Text>

                            <Tooltip
                                color="secondary"
                                contentColor="invert"
                                content={pageFromPokemons().some(el => el.id >= dataArr.length) ? "" : "siguiente pagina"}>
                                <Button
                                    disabled={pageFromPokemons().length < intervalo || pageFromPokemons().some(el => el.id === dataArr.length)}
                                    css={{ margin: "0 30px" }}
                                    auto
                                    color="gradient"
                                    onClick={() => nextPage()}>{`>>`}</Button>
                            </Tooltip>
                        </Container>
                    </Grid>
                </Grid.Container>
            }
        </>

    )
}
