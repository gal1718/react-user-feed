import React, { Suspense } from "react";
import CardMedia from "@mui/material/CardMedia";


const LazyCardMedia = ({src, alt, sx}: {src: string | undefined, alt: string, sx: {}}) => {
  

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <CardMedia
              component="img"
              alt={alt}
              sx={sx}
              image={src}
            />
</Suspense>
  );
};

export default LazyCardMedia;
