import React from 'react'
import { makeStyles } from '@mui/material/styles';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';

const Header = () => {
    return (
        <AppBar position="static" color='transparent'>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography>
                        Crypto Hunter
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header


//Container helps make our component responsive