import { FC, PropsWithChildren } from "react"
import Head from "next/head"
import { Navbar } from '../ui/Navbar';

import { Grid } from '@nextui-org/react'


type Props = {
    title?: string
}

const origin = typeof window === "undefined" ? "" : window.location.origin
export const Layouts: FC<PropsWithChildren<Props>> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title || "pokemon-app"}</title>
                <meta name="author" content="Henry de la ossa" />
                <meta name="description" content={`Informacion de pokemones, ${title}`} />
                <meta name="keywords" content={`XXXXX, pokemon, pokedex ${title}`} />
                <meta property="og:title" content={`informacion de pokemon ${title}`} />
                <meta property="og:description" content={`pagina sobre pokemon ${title}`} />
                <meta property="og:image" content={`${origin}/img/banner.png`} />
            </Head>
            <Navbar />
            <main style={{
                padding: "0px 20px",
                marginBottom:"2rem"
            }}>
                {children}
            </main>
        </>
    )
}




export const GridContainerNextUI: FC<PropsWithChildren<Props>> = ({ children }) => {
    return (
        <Grid.Container gap={1.5} justify={"flex-start"} >
            {children}
        </Grid.Container>
    )
}
