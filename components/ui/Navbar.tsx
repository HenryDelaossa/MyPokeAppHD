import { Spacer, Text, useTheme } from "@nextui-org/react"
import Image from "next/image"

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

            <Text color="white" h2>P</Text>
            <Text color="white" h3>okemon</Text>
            <Spacer css={{ flex: 1 }} />
            <Text color="white" >favoritos</Text>
        </div>
    )
}
