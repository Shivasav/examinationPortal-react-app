import { React } from "react";
import { Card } from "@mui/material";
import Particles from "react-tsparticles";

export default function LoginHome() {
  const particlesInit = (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <>
      <div>
        <Card sx={{ maxWidth: "100%" }}>
          {/* <CardMedia component="img" height="820" src={Banner} alt="banner" /> */}
          <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}

            options={{
              background: {
                color: {
                  value: "#81878d",
                },
              },
              fpsLimit: 60,
              interactivity: {
                events: {
                  onHover: {
                    enable: true,
                    mode: "repulse",
                  },
                  resize: true,
                },
              },
              particles: {
                color: {
                  value: "#ffffff",
                },
                links: {
                  color: "#ffffff",
                  distance: 150,
                  enable: true,
                  opacity: 0.5,
                  width: 1,
                },
                move: {
                  direction: "none",
                  enable: true,
                  random: false,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    value_area: 800,
                  },
                  value: 80,
                },
                opacity: {
                  value: 0.5,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  random: true,
                  value: 5,
                },
              },
              detectRetina: true,
            }}
          />
        </Card>
      </div>
    </>
  );
}
