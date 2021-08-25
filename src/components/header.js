import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper'
import Grid from "@material-ui/core/Grid"

export default function ButtonAppBar() {

  return (

    <AppBar>
        <Toolbar>
        <Grid container>
<Grid item xs={3} style={{display: 'flex', alignItems:'center'}}>
          <Typography variant="h6" >
            Cowichan Dressage Club
          </Typography>
</Grid>


<Grid item xs={9}  style={{display: 'flex' , justifyContent: 'flex-end', alignContent:'center'}}>

        <MenuList style={{ display: 'flex', flexDirection: 'row'}}>
            <MenuItem className="menu-item">Events and Entries </MenuItem>
            <MenuItem className="menu-item">Membership </MenuItem>
            <MenuItem className="menu-item">Downloads </MenuItem>
            <MenuItem className="menu-item">About</MenuItem>
          </MenuList>

          {/* <IconButton edge="end" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>  */}
          </Grid>
      </Grid>
        </Toolbar>
      </AppBar>
    
  );
}