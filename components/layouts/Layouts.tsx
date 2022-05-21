import Head from "next/head"
import {FC, PropsWithChildren } from "react"
import { Navbar } from '../ui/Navbar';
import { Grid } from '@nextui-org/react'


type Props = {
    title?: string
}
export const Layouts: FC<PropsWithChildren<Props>> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title || "pokemon-app"}</title>
                <meta name="author" content="Henry de la ossa" />
                <meta name="description" content={`Informacion de pokemones, ${title}`} />
                <meta name="keywords" content={`XXXXX, pokemon, pokedex ${title}`} />
            </Head>

            <Navbar />

            <main style={{
                padding:"0px 20px"
            }}>
                {children}
            </main>
        </>
    )
}




export const GridContainerNextUI: FC<PropsWithChildren<Props>> = ({children}) => {
    return (
        <Grid.Container gap={1.5} justify={"flex-start"} >
            {children}
        </Grid.Container>
    )
}
