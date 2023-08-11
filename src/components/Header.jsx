import React from 'react'
import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CryptoState } from '../CryptoContext';

const Header = (props) => {
    const navigate = useNavigate();
    const { currency, setCurrency } = CryptoState();
    console.log(currency)
    //const [theme, setTheme] = useState(true)
    //const icon = !theme ? <Brightness7Icon /> : <Brightness3Icon />
    // const light = {
    //     palette: {
    //         type: "dark",
    //         primary: {
    //             main: "#ffffff"
    //         }
    //     }
    // };

    // const dark = {
    //     palette: {
    //         type: "light",
    //         primary: {
    //             main: "#000000"
    //         }
    //     }
    // };
    // const changeTheme = () => {
    //     setTheme(!theme);
    // };
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
            <AppBar position="static" color="transparent">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography onClick={() => navigate('/')} variant='h6'
                            sx={{
                                flex: 1,
                                color: "gold",
                                fontFamily: "Montserrat",
                                fontWeight: "bold",
                                cursor: "pointer"
                            }}>Cryptopedia</Typography>
                        <Select
                            sx={{
                                color: 'white',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white'
                                },
                                '& .MuiSvgIcon-root': {
                                    color: 'white'
                                }
                            }}

                            variant="outlined" style={{
                                width: 100,
                                height: 40,
                                marginLeft: 15,
                                border: "1px solid white",
                                color: '#fff',
                            }}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"INR"}>INR</MenuItem>
                            <MenuItem value={"CAD"}>CAD</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header


//Container helps make our component responsive