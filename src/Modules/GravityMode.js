import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import Matter from 'matter-js'

class GravityMode extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
      }
    
      componentDidMount() {
        var Engine = Matter.Engine,
          Render = Matter.Render,
          World = Matter.World,
          Bodies = Matter.Bodies,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint;
    
        var engine = Engine.create();
        
        engine.world.gravity.y = 0;

        var render = Render.create({
          element: this.refs.scene,
          engine: engine,
          options: {
            width: 1920,
            height: 965,
            wireframes: false,
          }
        });
    
        var ballA = Bodies.circle(210, 100, 30, { restitution: 1, frictionAir: 0, friction: 0 });
        var ballB = Bodies.circle(110, 50, 30, { restitution: 1, frictionAir: 0, friction: 0 });
        World.add(engine.world, [
          // walls
          Bodies.rectangle(960, 0, 1920, 100, { isStatic: true, restitution: 1, friction: 0 }),
          Bodies.rectangle(960, 965, 1920, 100, { isStatic: true, restitution: 1, friction: 0 }),
          Bodies.rectangle(0, 483, 100, 966, { isStatic: true, restitution: 1, friction: 0 }),
          Bodies.rectangle(1920, 483, 100, 966, { isStatic: true, restitution: 1, friction: 0 })
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
            World.add(engine.world, Bodies.circle(Math.random()*1800, Math.random()*860, 30, { restitution: 0.7, velocity: [Math.random()*20, Math.random()*20] }));
        });
    
        Engine.run(engine);
    
        Render.run(render);
      }
    
      render() {
        return <div ref="scene" />;
      }
    }

export default GravityMode;