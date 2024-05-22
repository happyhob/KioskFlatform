import { Box, Stack, Typography, styled } from "@mui/material";
import React from "react";
import { Facebook, Instagram, YouTube } from "@mui/icons-material/";

const SocialBox = styled(Box)({
  display: "flex",
  gap: 10,
  color: "black",
});

const Footer = () => {
  return (
    <Box sx={{ background: "white", height: "300px" }}>
      <Stack direction={{ xs: "row", md: "row" }} p={7}>
        <Box flex={1}>
          <Typography color={"black"} align={"center"}>
            Contact Us
          </Typography>
          <Typography color={"black"} align={"center"}>
            of squamate reptiles, with over 6,000 species,
          </Typography>
          <Typography color={"black"} align={"center"}>
            continents except Antarcti
          </Typography>
          <Typography color={"black"} align={"center"}>
            ranging across
          </Typography>
        </Box>
        <Box flex={1}>
          <Typography color={"black"} align={"center"}>
            Data policy
          </Typography>
          <Typography color={"black"} align={"center"}>
            cookies
          </Typography>
          <Typography color={"black"} align={"center"}>
            Data Safety
          </Typography>
        </Box>
        <Box flex={1}>
          <Typography color={"black"} align={"center"}>
            Categories
          </Typography>
          <Typography color={"black"} variant={"body2"} align={"center"}>
            Kids
          </Typography>
          <Typography color={"black"} variant={"body2"} align={"center"}>
            Women
          </Typography>
          <Typography color={"black"} variant={"body2"} align={"center"}>
            Men
          </Typography>
        </Box>
        <Box>
          <Typography color={"black"} align={"center"}>
            Follow Us
          </Typography>
          <SocialBox>
            <Facebook />
            <Instagram />
            <YouTube />
          </SocialBox>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
