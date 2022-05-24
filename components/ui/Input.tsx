import React, { FC } from 'react'

interface Props {
    value?:string
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

export const Inputs: FC<Props> = ({value, onChange}) => {

    return (
        <>
            <input
                style={{
                    width: "300px",
                    height: "50px",
                    background: "#2b303b",
                    border: "none",
                    fontSize: "16px",
                    color: "white",
                    paddingLeft: "20px",
                    borderRadius: "20px",
                    transition: "all .55s ease",
                    position: "absolute",
                    top: "98px",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                }}
                placeholder="buscar"
                type="search"
                name="input" 
                value={value}
                onChange={onChange}
                />
        </>


    )
}
