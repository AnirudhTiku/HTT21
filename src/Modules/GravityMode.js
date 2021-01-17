import React, { useEffect } from 'react';
import Matter from 'matter-js';
import { Button } from '@material-ui/core';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

class GravityMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      circles: [],
      open: false
    };
  }

  handleEntitySpawn(){
    var shape = Math.floor(Math.random()*7 + 1)
    if(shape === 2){
      shape -= 1
    }
        var ball = Bodies.polygon(Math.random()*1800, Math.random()*860, shape, 30, { restitution: 0.5, frictionAir: 0, friction: 0,
        render:{
          strokeStyle: "black",
          lineWidth: 5
        } })
        var velocity = Vector.create(Math.random()*50 - 25, Math.random()*50 - 25)
        var scale = Math.random()+0.7
        Body.scale(ball, scale, scale)
        Body.setDensity(ball, scale)
        Body.setVelocity(ball, velocity)
          this.state.circles.push(ball);
          World.add(engine.world, ball);
          if(this.state.circles.length > 100){
            World.remove(engine.world, this.state.circles[this.state.circles.length-100])
            this.state.circles.splice(1,0)
          }
  }

  handleClickOpen = () => {
    this.setState({circles: this.state.circles, open: true});
  };

  handleClose = () => {
    this.setState({circles: this.state.circles, open: false});
  };

  removeBalls() {
    this.state.circles.forEach((circle) => {
      World.remove(engine.world, circle);
    })
    this.setState({ circles: [] })
  }

  componentWillUnmount(){
            World.clear(engine.world);
            Engine.clear(engine);
            Render.stop(render);
            render.canvas.remove();
            Runner.stop(runner);
            document.removeEventListener('keydown',  event => {
              this.handleEntitySpawn()
        })
            render.canvas = null;
            render.context = null;
            render.textures = {};
  }

  componentDidMount() {
    engine.world.gravity.y = 2;
    render = Render.create({
      element: this.refs.scene,
      engine: engine,
      options: {
        width: worldWidth,
        height: worldHeight,
        wireframes: false,
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
          this.handleEntitySpawn()
    });

    Render.run(render);
    Runner.run(runner, engine);
  }

  render() {
    return (
      <div ref="scene" style={{ backgroundColor: 'black', width: '100wh', height: '100vh' }}>
        <div>
          <Button variant="contained" color="secondary" onClick={()=>{
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
                Some stats go here I guess
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.handleClose()}  color="primary" autoFocus>
                Back
              </Button>
            </DialogActions>
          </Dialog>
          
          <DeleteSweepIcon style={{ fill: 'orange', cursor: 'pointer', width: 30, height: 30, position: 'absolute' }} onClick={() => { this.removeBalls() }} />
        </div>
      </div>
    );
  }
}

export default GravityMode;