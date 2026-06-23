import { Box, styled } from "@mui/material";
import { MobileApp, type Block } from "../../dto/response";
import { useCore } from "../core";
import clsx from "clsx";

const Root = styled("a", {
  shouldForwardProp: (prop) => prop !== "mobile",
})(() => ({
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "100%",
  aspectRatio: "3 / 1",
  display: "flex",
  "&.mobile": {
    aspectRatio: "1 / 3",
    flexDirection: "column",
    "> .img-container": {
      height: "unset",
      width: "100%",
      aspectRatio: "1 / 1",
      overflow: "hidden",
    },
  },
  "> .img-container": {
    height: "100%",
    aspectRatio: "1 / 1",
    overflow: "hidden",
    position: "relative",
    "> img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.3s ease",
    },
  },
  "&.dense": {
    marginTop: 0,
  },
}));

export const MobileAppBlock = ({ block }: { block: Block }) => {
  const {
    state: { en },
    mobile,
  } = useCore();
  const data = new MobileApp(block);

  return (
    <Root
      className={clsx({ mobile, dense: data.dense })}
      sx={{ backgroundImage: `url(${data.bg?.firebaseURL ?? "none"})` }}
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {(en ? data.images : data.images_th)?.map((img, idx) => (
        <Box className="img-container" key={idx} sx={{ flex: 1 }}>
          <img src={img.image?.firebaseURL ?? "none"} alt={img.id} />
        </Box>
      ))}
    </Root>
  );
};
