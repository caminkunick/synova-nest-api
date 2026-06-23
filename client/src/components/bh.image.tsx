import { Box, styled, type BoxProps } from "@mui/material";
import { Media } from "../dto/response";
import { memo, useEffect, useRef } from "react";
import { decode } from "blurhash";

export type BlurHashImage = BoxProps & {
  image: Media | null;
  small?: boolean;
};
export const BlurHashImage = styled(
  memo((props: BlurHashImage) => {
    const { image, small, ...boxProps } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const data = image ? new Media(image) : null;

    useEffect(() => {
      if (image) {
        const decoded = decode(image.blurhash, 32, 32);
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            const imageData = ctx.createImageData(32, 32);
            imageData.data.set(decoded);
            ctx.putImageData(imageData, 0, 0);
          }
        }
      }
    }, [image]);

    return (
      <Box {...boxProps}>
        <canvas ref={canvasRef} width={32} height={32} />
        <img className="real-image" src={data?.Get().url(small)} />
      </Box>
    );
  }),
)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  "> canvas, > img.real-image": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
