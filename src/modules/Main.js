import React from 'react'
import { Button, Grid } from '@material-ui/core';

export default function Main(props) {

    return (

        <Grid container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Grid item xs={2} style={{display:'flex',justifyContent:'center'}}>
                <Button variant="contained" color='primary'>
                    Float
                </Button>
            </Grid>

            <Grid item xs={2} style={{display:'flex',justifyContent:'center'}}>
                <Button variant="contained" color='primary'>
                    Gravity
                </Button>
            </Grid>

            <Grid item xs={2} style={{ display:'flex', justifyContent:'center'}}>
                <Button variant="contained" color='primary'>
                    Destroy
                </Button>
            </Grid>
        </Grid>
    );
}