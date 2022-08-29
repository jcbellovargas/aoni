import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesContainer(params){

  const particlesInit = async (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  return(
    <>
      <Particles id="tsparticles" init={particlesInit} options={{
        "fullScreen": {
            "enable": false,
            "zIndex": 1
        },
        "particles": {
            "number": {
                "value": 25,
                "density": {
                    "enable": true,
                    "value_area": 600
                }
            },
            "color": {
                "value": "#DA0463"
            },
            "shape": {
                "type": "dot",

            },
            "rotate": {
                "value": 0,
                "random": true,
                "direction": "clockwise",
                "animation": {
                    "enable": true,
                    "speed": 5,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 600,
                "color": "#DEDEDE",
                "opacity": 0.4,
                "width": 2
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "retina_detect": true,
        "background": {
            "color": "#FFFFFF",
            "opacity": 0,
            "position": "center",
            "repeat": "no-repeat",
            "size": "cover"
        }
    }}
      />
    </>
  )
}