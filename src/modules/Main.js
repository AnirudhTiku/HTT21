import React from 'react'
import { Button, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export default function Main(props) {
    const history = useHistory();


    return (
        <div 
            style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',   
            height: '100vh', 
            backgroundImage: `url('/keyboard_cartoon.png')`,
            backgroundPosition: 'center',
            backgroundSize:'cover' }}
        >
            <Grid 
                container 
                spacing={24}
                style={{display:'flex', justifyContent:'center'}}
            >
                <Grid item xs={12} style={{display: 'flex', justifyContent:'center', color: 'white', fontFamily: "Comic Sans MS, Comic Sans, cursive"}}>
                    <h1>KEYBored</h1>
                </Grid>

                <Grid item xs={2} style={{display:'flex',justifyContent:'center'}}>
                    <Button 
                        variant="contained" color='primary' 
                        onClick={()=>history.push('/float')}
                        style={{borderRadius: '10%', width:'50%'}}
                    >

                        Float
                    </Button>
                </Grid>

                <Grid item xs={2} style={{display:'flex', justifyContent:'center'}}>
                    <Button 
                        variant="contained" color='primary' size="Large" 
                        onClick={()=>history.push('/gravity')}
                        style={{borderRadius: '10%', width:'50%'}}
                    >

                        Gravity
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}