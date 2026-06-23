import { Box, Grid, styled } from "@mui/material";
import type { Block } from "../../dto/response";

const ImageContainer = styled("div")({
  width: "100%",
  maxWidth: 120,
  aspectRatio: "1 / 1",
  "> img": {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
});

const CTN = styled(Box)({
  display: "flex",
});

export const StandardBlock = ({ block }: { block: Block }) => {
  return (
    <CTN>
      {block.images.map((image, index) => (
        <ImageContainer key={index}>
          <img src={image.image.url} />
        </ImageContainer>
      ))}
    </CTN>
  );
};
