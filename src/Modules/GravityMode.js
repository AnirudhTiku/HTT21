import React, { useEffect } from 'react';
import Matter from 'matter-js';
import { Button } from '@material-ui/core';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { useHistory } from 'react-router-dom'

const worldHeight = window.innerHeight - 42;
const worldWidth = window.innerWidth - 50;
var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint,
  Vector = Matter.Vector;
var engine = Engine.create();
let render = null;

class GravityMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      circles: [],
    };
  }

  goBack(){
    this.props.history.push("/")
  }

  removeBalls() {
    this.state.circles.forEach((circle) => {
      World.remove(engine.world, circle);
    })
    this.setState({ circles: [] })
  }

  componentWillUnmount(){
    render.canvas.remove();
    render.canvas= null;
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
      var ball = Bodies.circle(Math.random() * 1800, Math.random() * 860, 30, { restitution: 0.5, frictionAir: 0, friction: 0 })
      var velocity = Vector.create(Math.random() * 50 - 25, Math.random() * 50 - 25)
      var scale = Math.random() + 0.5
      Body.scale(ball, scale, scale)
      Body.setDensity(ball, scale)
      Body.setVelocity(ball, velocity)
      this.state.circles.push(ball)
      World.add(engine.world, ball);
      if (this.state.circles.length > 100) {
        World.remove(engine.world, this.state.circles[(this.state.circles.length) - 100]);
      }
      this.state.circles.splice(1, 0)

    });

    Engine.run(engine);

    Render.run(render);
  }

  render() {
    return (
      <div ref="scene" style={{ backgroundColor: 'black', width: '100wh', height: '100vh' }}>
        <div>

        <Button variant="contained" color="secondary" onClick={()=>this.goBack()} style={{marginRight: 20}}>
            Back
        </Button>

          <Button variant="contained" color="secondary" onClick={() => console.log('data')}>
            Show Data
          </Button>
          
          <DeleteSweepIcon style={{ fill: 'orange', cursor: 'pointer', width: 30, height: 30, position: 'absolute' }} onClick={() => { this.removeBalls() }} />
        </div>
      </div>
    );
  }
}

export default GravityMode;