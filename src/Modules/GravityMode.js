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
          Body = Matter.Body,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint,
          Vector = Matter.Vector;
    
        var engine = Engine.create();
        
        engine.world.gravity.y = 2;

        var render = Render.create({
          element: this.refs.scene,
          engine: engine,
          options: {
            width: 1920,
            height: 965,
            wireframes: false,
          }
        });
  
        World.add(engine.world, [
          // walls
          Bodies.rectangle(960, 0, 1920, 100, { isStatic: true, restitution: 1, friction: 0 }),
          Bodies.rectangle(960, 965, 1920, 100, { isStatic: true, restitution: 1, friction: 0 }),
          Bodies.rectangle(0, 483, 100, 966, { isStatic: true, restitution: 1, friction: 0 }),
          Bodies.rectangle(1920, 483, 100, 966, { isStatic: true, restitution: 1, friction: 0 })
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
            var test = Bodies.circle(Math.random()*1800, Math.random()*860, 30, { restitution: 0.5, frictionAir: 0, friction: 0  })
            var velocity = Vector.create(Math.random()*50 - 25, Math.random()*50 - 25)
            var scale = Math.random()+0.5
            Body.scale(test, scale, scale)
            Body.setDensity(test, scale)
            Body.setVelocity(test, velocity)
            World.add(engine.world, test);
        });
    
        Engine.run(engine);
    
        Render.run(render);
      }
    
      render() {
        return <div ref="scene" />;
      }
    }

export default GravityMode;