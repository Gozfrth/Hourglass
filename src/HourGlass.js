import { useEffect, useRef, useState } from 'react'
import { Bodies, Composite, Engine, Render, Runner, Vector, Vertices, World } from 'matter-js';
import { GUI } from 'dat.gui';

function Comp(props){
  const scene = useRef()
  const engine = useRef(Engine.create({gravity: {y:0.5}}));
  var composite = Composite.create();
  var angle = Math.PI / 360;
  var inc = Math.PI / 360;
  const [numParticles, setNumParticles] = useState(200);
  const [isCircle, setIsCircle] = useState(true);
  const [isWireframe, setisWireframe] = useState(false);
  const [separation, setSeparation] = useState(11);
  const [rotateTime, setRotateTime] = useState(20);
  const [showDebug, setShowDebug] = useState(true);
  const guiRef = useRef();
  const eng = engine.current;

  useEffect(() => {
    // mount
    const cw = 700
    const ch = 750
  
    const render = Render.create({
      element: scene.current,
      engine: eng,
      isFixed:true,
      options: {
        showDebug: showDebug,
        width: cw,
        height: ch,
        wireframes: isWireframe,
        background: 'transparent',
      }
    })

    if (!guiRef.current) {
      guiRef.current = new GUI();
      guiRef.current.add({ numParticles }, 'numParticles', 1, 500).step(1).onChange((value) => {
        setNumParticles(value);
      });
      guiRef.current.add({ isCircle }, 'isCircle').onChange((value) => {
        setIsCircle(value);
      });
      guiRef.current.add({ isWireframe }, 'isWireframe').onChange((value) => {
        setisWireframe(value);
      });
      guiRef.current.add({ separation }, 'separation', 0, 30).step(1).onChange((value) => {
        setSeparation(value);
      });
      guiRef.current.add({ rotateTime }, 'rotateTime', 3, 30).step(0.5).onChange((value) => {
        setRotateTime(value);
      });
      guiRef.current.add({ showDebug }, 'showDebug').onChange((value) => {
        setShowDebug(value);
      });
    }
    
  const generateParticles = () => {
    Composite.clear(composite, true);

    if(isCircle){
      for(let i = 0; i < numParticles; i++){
        const particle = Bodies.circle(
          240 + (i%50)*5,
          140 + Math.floor(i/50)*5,
          6,
          {
            mass: 0,
            restitution: 0,
            friction: 0.1,
            render: {
              fillStyle: '#aa7777',
            }
          })
          Composite.add(composite, [particle])
        }
    }else{
      for(let i = 0; i < numParticles; i++){
        const particle = Bodies.rectangle(
          240 + (i%50)*5,
          140 + Math.floor(i/50)*5,
          8,
          8,
          {
            mass: 0.002,
            restitution: 0,
            friction: 0.1,
            render: {
              fillStyle: '#aa7777',
            }
          })
          Composite.add(composite, [particle])
    }

    }
  };


  generateParticles();
    var boundaries = [
    Bodies.rectangle(338 - separation, 360, 30, 15, {isStatic: true, angle: Math.PI/2.5}),
    Bodies.rectangle(360 + separation, 360, 30, 15, {isStatic: true, angle: -Math.PI/2.5}),
    Bodies.rectangle(338 - separation, 384, 30, 15, {isStatic: true, angle: -Math.PI/2.5}),
    Bodies.rectangle(360 + separation, 384, 30, 15, {isStatic: true, angle: Math.PI/2.5}),

      Bodies.rectangle(241 - separation , 230, 300, 15, {isStatic: true, angle: Math.PI/3.5}),
      Bodies.rectangle(457 + separation, 230, 300, 15, {isStatic: true, angle: -Math.PI/3.5}),
      Bodies.rectangle(241 - separation, 513, 300, 15, {isStatic: true, angle: -Math.PI/3.5}),
      Bodies.rectangle(457 + separation, 513, 300, 15, {isStatic: true, angle: Math.PI/3.5}),
          

      Bodies.rectangle(349, 105, 500, 40, {isStatic: true}),
      Bodies.rectangle(349, 636, 500, 40, {isStatic: true}),
    ]

    Composite.add(composite,boundaries);

    World.add(eng.world, composite);
      
    Render.run(render);
    var runner = Runner.create({
      isFixed: true,
      delta: 1000/60,
    })
    Runner.run(runner, eng);
  
    // unmount
    return () => {
      // destroy Matter
      Render.stop(render)
      World.clear(eng.world)
      Engine.clear(eng)
      Composite.clear(composite, true, true)
      Runner.stop(runner)
      render.canvas.remove()
      render.canvas = null
      render.context = null
      render.textures = {}
    }
  }, [numParticles, isCircle, separation, isWireframe, rotateTime, showDebug])

  
  const handleClick = () => {
    inc = 0;
    handleRotate();
  }

  const handleRotate = () => {
    inc += angle;
  
    Composite.rotate(composite, angle, {x:349, y:371.5})
  
    if(inc <= Math.PI - angle){
      requestAnimationFrame(handleRotate);
    }
  }

  setInterval(handleClick, rotateTime*1000);  
  
  return (
     
  <div>
  <div ref={scene} />
</div>
  )
}

export default Comp