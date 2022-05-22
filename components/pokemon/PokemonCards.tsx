import { FC } from 'react';
import { useRouter } from 'next/router';

import { Grid, Card, Col, Text, Row, Button } from '@nextui-org/react';
import { PokemonsSmall } from '../../interfaces';


interface Props {
    pokemons: PokemonsSmall
}

export const PokemonCards: FC<Props> = ({ pokemons }) => {

    const router = useRouter()
    const onClickRouter = () => {
        router.push(`/name/${pokemons.name}`)
    }


    return (
        <Grid xs={6} sm={3} md={2} xl={1} key={pokemons.id}>
            <Card css={{ w: "100%", p: 0, h: "300px" }} bordered hoverable >
                <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                    <Col>
                        <Text size={12} weight="bold" transform="uppercase" color="#9E9E9E">
                            pokemon id: {pokemons.id}
                        </Text>
                        <Text h3 color="white">
                            {pokemons.name}
                        </Text>
                    </Col>
                </Card.Header>
                <Card.Body>
                    <Card.Image
                        src={pokemons.img}
                        height="100%"
                        width="100%"
                        alt="Relaxing app background"
                    />
                </Card.Body>
                <Card.Footer
                    blur
                    css={{
                        position: "absolute",
                        bgBlur: "#0f1114",
                        borderTop: "$borderWeights$light solid $gray700",
                        bottom: 0,
                        zIndex: 1,
                    }}
                >
                    <Row>
                        <Col>
                            <Row justify="center">
                                <Button
                                    onClick={onClickRouter}
                                    flat
                                    auto
                                    rounded
                                    css={{ color: "#94f9f0", bg: "#94f9f026" }}
                                >
                                    <Text
                                        css={{ color: "inherit" }}
                                        size={12}
                                        weight="bold"
                                        transform="uppercase"
                                    >
                                        VER MAS
                                    </Text>
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </Grid>
    )
}
