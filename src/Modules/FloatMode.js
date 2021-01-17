import React from 'react';
import Matter from 'matter-js';
import { Button } from '@material-ui/core';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import BounceSfx from "../sounds/Sans speak.wav"
import './FloatMode.css'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid }from '@material-ui/core'
import serverUrl from './constants.js'


const worldHeight = window.innerHeight - 42;
const worldWidth = window.innerWidth - 50;
var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Runner = Matter.Runner,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint,
  Vector = Matter.Vector;
var engine = Engine.create();
var runner = Runner.create();
let render = null;


class FloatMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balls: [],
      open: false
    };
  }

  handleClickOpen = () => {
    this.setState({ balls: this.state.balls, open: true });
  };

  handleClose = () => {
    this.setState({ balls: this.state.balls, open: false });
  };


  deleteBalls(event) {
    this.state.balls.forEach((ball) => { World.remove(engine.world, ball) })
    this.setState({ balls: [] })
  }


  componentWillUnmount() {
    World.clear(engine.world);
    Engine.clear(engine);
    Render.stop(render);
    render.canvas.remove();
    Runner.stop(runner);
    render.canvas = null;
    render.context = null;
    render.textures = {};
  }


  dataInfo() {
    if (this.state.userData) {
      let data = this.state.userData;
      let componentList = []
      let list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
        'j', 'l', 'k', 'm', 'n', 'o', 'p', 'q', 'r',
        's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0',
        '1', '2', '3', '4', '5', '6', '7', '8', '9',
        '10', 'max', 'min', 'total']

      list.forEach((obj) => {
        componentList.push(
          <Grid item xs={4}>
            {obj}: {data[obj]}
          </Grid>
        )
      })

      return (
        <Grid container>
          {componentList}
        </Grid>
      )
    }
  }
  getStats() {
    let data = {};
    let xhttp = new XMLHttpRequest();
    xhttp.addEventListener('load', () => {
      data = JSON.parse(xhttp.responseText)
      this.setState({ userData: data })
      console.log(data)
    })
    xhttp.open('POST', `${serverUrl}get/all`, true)
    xhttp.send(JSON.stringify({ 'user_id': localStorage.getItem('user_id') }))
  }

  setStats() {
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', `${serverUrl}add`, true)
    xhttp.send(JSON.stringify({ 'user_id': localStorage.getItem('user_id'), 'keystrokes': this.state.keystrokes }))
  }



  componentDidMount() {

    engine.world.gravity.y = 0;

    render = Render.create({
      element: this.refs.scene,
      engine: engine,
      options: {
        width: worldWidth,
        height: worldHeight,
        wireframes: false,
        background: 'rgb(0,0,0)'
      }
    });

    World.add(engine.world, [
      // walls
      Bodies.rectangle(worldWidth / 2, 0, worldWidth, 10, { isStatic: true, restitution: 1, friction: 0 }),
      Bodies.rectangle(worldWidth / 2, worldHeight, worldWidth, 10, { isStatic: true, restitution: 1, friction: 0 }),
      Bodies.rectangle(0, worldHeight / 2, 10, worldHeight, { isStatic: true, restitution: 1, friction: 0 }),
      Bodies.rectangle(worldWidth, worldHeight / 2, 10, worldHeight, { isStatic: true, restitution: 1, friction: 0 })
    ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      });

    World.add(engine.world, mouseConstraint);

    // Matter.Events.on(mouseConstraint, "mousedown", function(event) {
    //   World.add(engine.world, Bodies.circle(150, 50, 30, { restitution: 0.7 }));
    // });

    document.addEventListener('keydown', event => {
      var shape = Math.floor(Math.random() * 7 + 1)
      if (shape === 2) {
        shape -= 1
      }
      var ball = Bodies.polygon(Math.random() * 1800, Math.random() * 860, shape, 30, {
        restitution: 1, frictionAir: 0, friction: 0,
        render: {
          strokeStyle: "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")",
          fillStyle: "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")",
          lineWidth: 5
        }
      })
      var velocity = Vector.create(Math.random() * 50 - 25, Math.random() * 50 - 25)
      var scale = Math.random() + 0.5
      Body.scale(ball, scale, scale)
      Body.setDensity(ball, scale)
      Body.setVelocity(ball, velocity)
      this.state.balls.push(ball);
      World.add(engine.world, ball);
      if (this.state.balls.length > 50) {
        World.remove(engine.world, this.state.balls[this.state.balls.length - 50])
        this.state.balls.splice(1, 0)
      }

      this.state.keystrokes.push(event.keyCode)
      if (this.state.keystrokes.length > 50) {
        this.setStats();
        this.setState({ keystrokes: [] })
      }

    });


    Matter.Events.on(engine, 'collisionStart', function (event) {
      var audio = new Audio(BounceSfx)
      audio.play()
    });


    Render.run(render);
    Runner.run(runner, engine);
  }

  render() {
    return (
      <div ref="scene" style={{ backgroundColor: 'black', width: '100wh', height: '100vh' }}>
        <Button variant="contained" color="secondary" onClick={() => {
          console.log('data')
          this.handleClickOpen()
        }}>
          Show Data
          </Button>
        <Dialog
          open={this.state.open}
          onClose={() => this.handleClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Statistics"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.dataInfo()}
              </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary" autoFocus>
              Back
              </Button>
          </DialogActions>
        </Dialog>
        <DeleteSweepIcon style={{ fill: 'orange', cursor: 'pointer' }} onClick={() => { this.deleteBalls() }} />
      </div>
    );
  }
}

export default FloatMode;