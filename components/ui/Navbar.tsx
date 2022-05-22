import { Link, Spacer, Text, useTheme } from "@nextui-org/react"
import Image from "next/image"
import NextLink from "next/link"

export const Navbar = () => {
    const { theme } = useTheme()

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "start",
            width: "100%",
            padding: "0px 20px",
            backgroundColor: theme?.colors.gray100.value
        }}>
            <Image
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
                alt="icono pokemon app"
                width={70}
                height={70}
            />

            <NextLink href={"/"} passHref>
                <Link>
                    <Text color="white" h2>P</Text>
                    <Text color="white" h3>okemon</Text>
                </Link>
            </NextLink>


            <Spacer css={{ flex: 1 }} />

            <NextLink href={"/favorites"} passHref>
                <Link>
                    <Text color="white" >favoritos</Text>
                </Link>
            </NextLink>
        </div>
    )
}
