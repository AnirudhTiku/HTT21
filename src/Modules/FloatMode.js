import React from 'react';
import Matter from 'matter-js';
import { Button } from '@material-ui/core';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import './FloatMode.css'

class FloatMode extends React.Component{
    constructor(props) {
        super(props);
        this.state = {balls: []};
      }
    
    componentDidMount() {
      
      const worldHeight = window.innerHeight-42;
      const worldWidth = window.innerWidth-50;
        var Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Body = Matter.Body,
        Mouse = Matter.Mouse,
        MouseConstraint = Matter.MouseConstraint,
        Vector = Matter.Vector;
  
      var engine = Engine.create();
      
      engine.world.gravity.y = 0;

      var render = Render.create({
        element: this.refs.scene,
        engine: engine,
        options: {
          width: worldWidth,
          height: worldHeight,
          wireframes: false,
          background:'rgb(0,0,0)'
        }
      });
  
      World.add(engine.world, [
        // walls
        Bodies.rectangle(worldWidth/2, 0, worldWidth, 10, { isStatic: true, restitution: 1, friction: 0 }),
        Bodies.rectangle(worldWidth/2, worldHeight, worldWidth, 10, { isStatic: true, restitution: 1, friction: 0 }),
        Bodies.rectangle(0, worldHeight/2, 10, worldHeight, { isStatic: true, restitution: 1, friction: 0 }),
        Bodies.rectangle(worldWidth, worldHeight/2, 10, worldHeight, { isStatic: true, restitution: 1, friction: 0 })
      ]);
  
      World.add(engine.world, [ballA, ballB]);
  
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
          var ball = Bodies.circle(Math.random()*1800, Math.random()*860, 30, { restitution: 1, frictionAir: 0, friction: 0  })
          var velocity = Vector.create(Math.random()*50 - 25, Math.random()*50 - 25)
          Body.setVelocity(ball, velocity)
          this.state.balls.push(ball);
          World.add(engine.world, ball);
          if(this.state.balls.length > 50){
            World.remove(engine.world, this.state.balls[this.state.balls.length-50])
            this.state.balls.splice(1,0)
          }
      });
  
      Engine.run(engine);
  
      Render.run(render);
    }
    
      render() {
        return (
        <div ref="scene" style={{backgroundColor:'black', width:'100wh', height:'100vh'}}>
          <Button variant="contained" color="secondary" onClick={()=>console.log('data')}>
            Show Data
          </Button>
          <DeleteSweepIcon style={{fill:'orange', cursor:'pointer'}}/>
        </div>
        );
      }
    }

export default FloatMode;