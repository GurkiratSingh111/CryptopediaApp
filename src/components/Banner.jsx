import { Container, Typography } from '@mui/material'
import React from 'react'
import Carousel from './Carousel'

const Banner = () => {
    const styles = {
        backgroundImage: "url(./banner2.jpg)",
        height: "400px",
        width: "100%"
    }
    return (
        <div style={styles}>
            <Container sx={{ height: "400", display: "flex", flexDirection: "column", paddingTop: "25", justifyContent: "space-around" }}>
                <div style={{
                    display: "flex",
                    height: "40%",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                }}>
                    <Typography
                        variant='h2'
                        style={{
                            fontWeight: "bold",
                            marginBottom: 15,
                            fontFamily: "Montserrat",
                        }}
                    >Cryptopedia</Typography>
                    <Typography
                        variant='subtitle2'
                        style={{
                            color: "darkgrey",
                            textTransform: "capitalize",
                            fontFamily: 'Montserrat'
                        }}
                    >Get All The Info Regarding Your Favorite Crypto Currency
                    </Typography>
                </div>
                <Carousel />
            </Container >
        </div >
    )
}

export default Banner
