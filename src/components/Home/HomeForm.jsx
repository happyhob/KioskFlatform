import React from "react";
import {Box, Typography} from "@mui/material";
import marketImage from '../../market.png';

const HomeForm =() => {
    return(
        <Box>
            <Typography align ="center" color = "black" variant = "h3" sx={{fontWeight: 900}}>
                QR<b style = {{color:"red"}}>ORDER</b>
            </Typography>
            <Typography align ="center" color = "black" variant = "body2" sx={{fontWeight: 100}}>
                We Make you look the better of you!
            </Typography>
            <Box sx={{
                backgroundImage: `url(${marketImage})`,
                backgroundRepeat: "no-repeat",
                backgroundColor:"black",
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundSize: "cover",
                height: 600,
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}>
                <Box sx={{width: {xs:"100%", sm: '50%', md:'40%'}, padding:{xs:3, sm:2, md:20},}}>
                    <Box sx={{background: 'white', opacity:'0.8'}}>
                        <Typography variant={"h6"} color='tomato' align="center" pt={8}>
                            Quick and Fast
                        </Typography>
                        <Typography variant="h4" color='black' align="center"pb={8}>
                            Training For Eating!
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default HomeForm;