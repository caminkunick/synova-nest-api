import { Box, Grid, styled, Typography } from "@mui/material";
import type { Block } from "../../dto/response";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { StandardBlock } from "../standard";
import { useCore } from "../core";

const Bg = btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 1000 1000">
  <!-- Generator: Adobe Illustrator 30.3.0, SVG Export Plug-In . SVG Version: 2.1.3 Build 182)  -->
  <defs>
    <style>
      .st0 {
        fill: none;
      }

      .st1 {
        fill: #f9e2b2;
      }

      .st2 {
        clip-path: url(#clippath);
      }
    </style>
    <clipPath id="clippath">
      <rect class="st0" width="1000" height="1000"/>
    </clipPath>
  </defs>
  <g id="Layer_1-2">
    <g class="st2">
      <path class="st1" d="M697.2,923.7H183.3c-46.6-1.7-86.4-9.7-109.7-31,23.3-21.3,63-29.3,109.7-31h513.9c171.7,0,257.6-207.5,136.2-328.9l-70-70c-75.2-75.2-197.3-75.2-272.5,0l-311.6,311.6h0c-26.5,26.5-91.6,85.4-134,72-13.4-42.4,45.4-107.5,72-134l311.6-311.6c75.2-75.2,75.2-197.3,0-272.5l-70-70C237.5-63.2,30,22.8,30,194.5v513.9c-1.7,46.6-9.7,86.4-31,109.7-21.3-23.3-29.3-63-31-109.7V194.5C-32,22.8-239.6-63.2-361,58.2l-70,70c-75.2,75.2-75.2,197.3,0,272.5L-119.4,712.3c26.5,26.5,85.4,91.6,72,134-42.4,13.4-107.5-45.5-134-72h0l-311.6-311.6c-75.2-75.2-197.3-75.2-272.5,0l-70,70c-121.4,121.4-35.4,329,136.3,329H-185.4c46.6,1.7,86.4,9.7,109.7,31-23.3,21.3-63,29.3-109.7,31h-513.9c-171.7,0-257.6,207.5-136.2,328.9l70,70c75.2,75.2,197.3,75.2,272.5,0l311.6-311.6c26.5-26.5,91.6-85.4,134-72,13.4,42.4-45.5,107.5-72,134l-311.6,311.6c-75.2,75.2-75.2,197.3,0,272.5l70,70c121.4,121.4,329,35.4,329-136.2v-513.9c1.7-46.6,9.7-86.4,31-109.7,21.3,23.3,29.3,63,31,109.7v513.9c0,171.7,207.5,257.6,328.9,136.2l70-70c75.2-75.2,75.2-197.3,0-272.5l-311.6-311.6c-26.5-26.5-85.4-91.6-72-134,42.4-13.4,107.5,45.5,134,72h0l311.6,311.6c75.2,75.2,197.3,75.2,272.5,0l70-70c121.4-121.4,35.4-329-136.2-329h0ZM-829.3,912.2c10.2-10.2,10.2-26.7,0-36.9l-44.7-44.7c-10.2-10.2-26.7-10.2-36.9,0l-44.7,44.7c-10.2,10.2-10.2,26.7,0,36.9l44.7,44.6c10.2,10.2,26.7,10.2,36.9,0l44.7-44.7h0ZM18.4,1721c-10.2-10.2-26.7-10.2-36.9,0l-44.7,44.7c-10.2,10.2-10.2,26.7,0,36.9l44.7,44.7c10.2,10.2,26.7,10.2,36.9,0l44.6-44.7c10.2-10.2,10.2-26.7,0-36.9l-44.7-44.7h0ZM953.4,873.2l-44.7-44.7c-10.2-10.2-26.7-10.2-36.9,0l-44.7,44.7c-10.2,10.2-10.2,26.7,0,36.9l44.7,44.6c10.2,10.2,26.7,10.2,36.9,0l44.7-44.7c10.2-10.2,10.2-26.7,0-36.9h0ZM-20.5,64.5c10.2,10.2,26.7,10.2,36.9,0L61,19.8c10.2-10.2,10.2-26.7,0-36.9L16.3-61.7c-10.2-10.2-26.7-10.2-36.9,0l-44.7,44.7c-10.2,10.2-10.2,26.7,0,36.9l44.7,44.7h0Z"/>
    </g>
  </g>
</svg>`);

const ImageContainer = styled(Box)(({ theme }) => ({
  width: "50dvw",
  height: "50dvh",
  display: "flex",
  backgroundImage: `url("data:image/svg+xml;base64,${Bg}")`,
  backgroundPosition: "left bottom",
  backgroundRepeat: "no-repeat",
  "> img": {
    objectFit: "cover",
    width: "100%",
    height: "100%",
    objectPosition: "center",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const Content = styled(Box)({
  paddingInline: 32,
  paddingBlock: 16,
  display: "flex",
  flexDirection: "column",
  gap: 16,
  p: {
    marginBlock: "0 !important",
    paddingBottom: "0 !important",
    lineHeight: 1.2,
  },
});

export const ProfileBlock = ({
  block,
  standard,
}: {
  block: Block;
  standard?: Block;
}) => {
  const {
    state: { en },
  } = useCore();
  return (
    <Grid
      container
      alignItems="center"
      style={{ marginTop: -16 }}
      sx={{ width: "100%" }}
    >
      <Grid size={{ sm: 12, md: 6 }}>
        <ImageContainer>
          <img
            src={block.image?.firebaseURL}
            alt={block.title}
            style={{ width: "100%", aspectRatio: "1/1", objectFit: "contain" }}
          />
        </ImageContainer>
      </Grid>
      <Grid size={{ sm: 12, md: 6 }}>
        <Content>
          <Typography
            variant="h4"
            fontWeight="bold"
            lineHeight={1.2}
            component="div"
          >
            {en ? block.title : block.title_th}
          </Typography>
          <Typography
            variant="h6"
            mt={2}
            color="text.secondary"
            component="div"
            lineHeight={1.2}
          >
            {en
              ? block.description && <RichText data={block.description} />
              : block.description_th && (
                  <RichText data={block.description_th} />
                )}
          </Typography>
          {standard && <StandardBlock block={standard} />}
        </Content>
      </Grid>
    </Grid>
  );
};
