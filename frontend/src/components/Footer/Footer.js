import { React } from "react";
import { AppBar, Button, Box } from "@mui/material";

export default function Footer() {
  return (
    <AppBar position="static"  style={{zIndex: 1, position: "relative", bottom: 0}}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <div>
          <Button
            color="inherit"
            href="https://www.facebook.com/shivasav.bhasin/"
          >
            Facebook
          </Button>
          <Button color="inherit" href="https://twitter.com/shivasavbhasin">
            Twitter
          </Button>
          <p>© 2021 SG Solutions</p>
        </div>
      </Box>
    </AppBar>
  );
}
