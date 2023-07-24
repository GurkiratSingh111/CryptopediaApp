import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import CoinInfo from '../components/CoinInfo';
import { Container, LinearProgress, Typography, useMediaQuery } from '@mui/material';
import { numberWithCommas } from '../components/Carousel';
import { useTheme } from '@mui/material/styles';

const Crypto = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();
    const { currency, symbol } = CryptoState();
    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));
        console.log(data);
        setCoin(data);
    }
    console.log(coin);

    useEffect(() => {
        fetchCoin();
    }, [])
    // const styles = (theme) => ({
    //     container: {
    //         display: 'flex',
    //         [theme.breakpoints.down("md")]: {
    //             flexDirection: "column",
    //             alignItems: "center",
    //         }
    //     },
    //     sidebar: {
    //         width: "30%",
    //         [theme.breakpoints.down("md")]: {
    //             width: "100%"
    //         },
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //         marginTop: 25,
    //         borderRight: "2px solid grey"
    //     }
    // })
    // const classes = styles();
    const theme = useTheme();
    const mdMatches = useMediaQuery(theme.breakpoints.down('md'));
    const smMatches = useMediaQuery(theme.breakpoints.down('sm'))
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const largeScreenStyles = {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        left: "0px",
    }
    const smallScreenStyles = {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        justifyContent: "center"
    }
    const marketData = {
        alignSelf: "start",
        padding: 25,
        paddingTop: 10,
        width: "100%",
    }
    const mdMarketData = {
        display: "flex",
        justifyContent: "space-around"
    }
    const smMarketData = {
        flexDirection: 'column',
        alignItems: "center",
    }
    const xsMarketData = {
        alignItems: "start"
    }
    const styles = mdMatches ? smallScreenStyles : largeScreenStyles;
    const marketStyles = mdMatches ? mdMarketData : smMatches ? smMarketData : xs ? xsMarketData : '';
    const marketDataStyles = `${marketStyles} ${marketData}`;

    if (!coin) {
        return <LinearProgress style={{ backgroundColor: "gold" }} />
    }
    return (
        <Container style={{ display: "flex", flexDirection: "column" }}>
            <Container
                style={styles}>
                <img
                    src={coin?.image?.large}
                    alt={coin?.name}
                    height="200"
                    width="200"
                    style={{ marginTop: 20 }} />
                <Typography variant="h3" style={{
                    fontWeight: "bold",
                    marginBottom: 20,
                    fontFamily: "Montserrat",
                }}>{coin?.name}</Typography>
                <Typography variant="subtitle1"
                    style={{
                        width: "100%",
                        fontFamily: "Montserrat",
                        padding: 25,
                        paddingBottom: 15,
                        paddingTop: 0,
                        textAlign: "justify",
                    }}>
                    {coin?.description.en.split(". ")[0]}
                </Typography>
                <div styles={marketDataStyles}>
                    <span style={{ display: "flex" }}>
                        <Typography variant="h5">Rank: </Typography>
                        &nbsp; &nbsp;
                        <Typography
                            variant="h5"
                            style={{ fontFamily: "Montserrat" }}
                        >{coin?.market_cap_rank}
                        </Typography>
                    </span>
                    <span style={{ display: "flex" }}>
                        <Typography variant="h5">Current Price: </Typography>
                        &nbsp; &nbsp;
                        <Typography
                            variant="h5"
                            style={{ fontFamily: "Montserrat" }}
                        >{symbol}{" "}
                            {numberWithCommas(coin?.market_data?.current_price[currency.toLowerCase()])}
                        </Typography>
                    </span>
                    <span style={{ display: "flex" }}>
                        <Typography variant="h5">Market Cap:  </Typography>
                        &nbsp; &nbsp;
                        <Typography
                            variant="h5"
                            style={{ fontFamily: "Montserrat" }}
                        >{symbol}{" "}
                            {numberWithCommas(coin?.market_data?.market_cap[currency.toLowerCase()])}
                        </Typography>
                    </span>
                </div>

            </Container>
            <CoinInfo coin={coin} />

        </Container >
    )
}

export default Crypto
