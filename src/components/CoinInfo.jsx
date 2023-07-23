import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import { CircularProgress, createTheme, ThemeProvider, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CoinInfo = ({ coin }) => {
    const [historicalData, setHistoricData] = useState("");
    const [days, setDays] = useState(1);
    const { currency } = CryptoState();
    const fetchHistoricData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
        setHistoricData(data.prices);
    }
    const theme = useTheme();
    const mdScreen = useMediaQuery(theme.breakpoints.down('md'));
    const styles = {
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        padding: 40,
    }
    const mdScreenStyles = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
    }
    const style = mdScreen ? mdScreenStyles : styles;

    useEffect(() => {
        fetchHistoricData();
    }, [currency, days])

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
            type: "dark",
        },
    })
    return (
        <ThemeProvider theme={darkTheme}>
            <div style={style}>
                {!historicalData ? (
                    <CircularProgress
                        style={{ color: "gold" }}
                        size={250}
                        thickness={1}
                    />
                ) : (
                    <>

                    </>

                )
                }

            </div>
        </ThemeProvider>
    )
}

export default CoinInfo;
