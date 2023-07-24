import React from 'react'

const SelectButton = ({ children, onClick, selected }) => {
    return (
        <span onClick={onClick} style={{
            border: "1px solid gold",
            borderRadius: 5,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            fontFamily: "Montserrat",
            cursor: "pointer",
            backgroundColor: selected ? "gold" : "transparent",
            color: selected ? "black" : "gold",
            fontWeight: selected ? "bold" : "normal",
            "&:hover": {
                backgroundColor: "gold",
                color: "black",
            },
            width: "22%",

        }}>{children}</span>
    )
}

export default SelectButton
