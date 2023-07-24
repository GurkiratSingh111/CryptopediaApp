import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { Container, createTheme, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from './Carousel';

const CoinsTable = () => {
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const [search, setSearch] = useState("")
    const { currency, symbol } = CryptoState();
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    }
    console.log(coins);
    useEffect(() => {
        fetchCoins();

    }, [currency])

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
            type: "dark",
        },
    })
    const handleSearch = () => {
        return coins.filter((coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase()));
    }
    return (<ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center" }}>
            <Typography variant="h4"
                style={{ margin: 18, fontFamily: "Montserrat" }}
            >
                Cryptocurrency Prices By MarketCap
            </Typography>
            <TextField sx={{ input: { color: 'white' } }}
                onChange={(e) => setSearch(e.target.value)}
                InputLabelProps={{ style: { color: 'white' } }}
                label="Search for a Crypto Currency.."
                variant="outlined"
                style={{ marginBottom: 20, boxSizing: "border-box", width: "100%", border: "2px solid white", color: "white" }} />
            <TableContainer>
                {
                    loading ? (
                        <LinearProgress style={{ backgroundColor: "gold" }} />
                    ) : (<Table>
                        <TableHead style={{ backgroundColor: '#EEBC1D' }}>
                            <TableRow>
                                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => {
                                    return <TableCell
                                        style={{
                                            color: "black", fontWeight: "700", fontFamily: "Montserrat"
                                        }}
                                        key={head}
                                        align={head === "Coin" ? "" : "right"}
                                    >{head}</TableCell>
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>{handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map(row => {
                            const profit = row.price_change_percentage_24h > 0;
                            return (
                                <TableRow
                                    onClick={() => navigate(`/coins/${row.id}`)}
                                    key={row.name}
                                    style={{
                                        cursor: "pointer",
                                        backgroundColor: "#16171a",
                                        "&:hover": {
                                            backgroundColor: '#131111',
                                        },
                                        fontFamily: "Montserrat"
                                    }}
                                >
                                    <TableCell component="th" scope="row"
                                        style={{ display: "flex", gap: 15, fontFamily: "Montserrat" }}
                                    >
                                        <img src={row?.image} alt={row.name} height="50" style={{ marginBottom: 10 }} />
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{ textTransform: "uppercase", fontSize: 22, color: "white" }}>{row.symbol}</span>
                                            <span style={{ color: "darkgrey" }}>{row.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell style={{ color: "white" }}
                                        align="right" >
                                        {symbol} {" "}
                                        {numberWithCommas(row.current_price.toFixed(2))}
                                    </TableCell>
                                    <TableCell align="right"
                                        style={{ color: profit > 0 ? "rgb(14,203,129)" : "red", fontWeight: 500 }}
                                    >
                                        {profit && '+'}
                                        {row.price_change_percentage_24h?.toFixed(2)}%
                                    </TableCell>
                                    <TableCell align="right" style={{ color: "white" }}>
                                        {symbol}
                                        {numberWithCommas(row.market_cap.toString().slice(0, -6))}
                                        M
                                    </TableCell>
                                </TableRow>
                            )
                        })}</TableBody>
                    </Table>
                    )}
            </TableContainer>
            <Pagination color="primary"
                style={{
                    padding: 20,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    color: "white",
                    'selected': {
                        backgroundColor: 'gold',
                    },
                }}
                sx={{ button: { color: '#ffd700' } }}
                count={(handleSearch()?.length / 10).toFixed(0)}
                onChange={(_, value) => {
                    setPage(value);
                    window.scroll(0, 450);
                }}
            />
        </Container>
    </ThemeProvider >
    )
}

export default CoinsTable
