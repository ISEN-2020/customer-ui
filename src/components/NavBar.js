import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import classnames from 'classnames'
import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab';
import { useHistory } from "react-router-dom";

const NavBar = () => {
    const history = useHistory();

  const routeChange = () =>{ 
    let path = `/`; 
    history.push(path);
  }

    return(
        <div>
            <AppBar position="static">
                <Grid container spacing={24} style={{padding: 10, margin: 0, width: '100%'}}>
                    <Grid item xs={10}>
                        <Toolbar>
                            <Typography variant="title" color="inherit">
                            Lending Service
                            </Typography>
                        </Toolbar>
                    </Grid>
                    <Grid item xs={1}>
                        <Button onClick={routeChange}>
                        Log out
                        </Button>
                    </Grid>
                    <Grid item xs={0}>
                        <Fab > 
                            <Avatar />
                        </Fab>
                    </Grid>
                </Grid>
            </AppBar>
        </div>
    )
}

export default NavBar;