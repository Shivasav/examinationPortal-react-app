import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import imgShivasav from '../../assets/images/imgShivasav.jpeg';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © EXAMine"}{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const cards = [
  { id: 1, name: "Shivasav Bhasin", image: imgShivasav },
  { id: 2, name: "Gourvi", image: ""},
];

const theme = createTheme();

export default function AboutUs() {
  return (
    <ThemeProvider theme={theme} style={{ margin: -24 }}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              About Us
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              EXAMine is an online examination to help universities set up
              examination and students take up those examinations. The system
              was developed as part of the final year project for BCA.
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={card.image}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" style={{color: "black"}}>
                      {card.name}
                    </Typography>
                  </CardContent>
                  {/* <CardActions>
                    <Button
                      size="small"
                      href="https://www.facebook.com/shivasav.bhasin/"
                    >
                      Facebook
                    </Button>
                    <Button
                      size="small"
                      href="https://twitter.com/shivasavbhasin"
                    >
                      Twitter
                    </Button>
                  </CardActions> */}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Final Year Project for BCA!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
