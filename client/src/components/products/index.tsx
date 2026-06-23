// prettier-ignore
import { alpha, Avatar, Box, Container, Fab, Grid, IconButton, Stack, styled, Typography } from "@mui/material";
import { Category, Media, type Block, type Product } from "../../dto/response";
import {
  useCallback,
  useEffect,
  useState,
  type ButtonHTMLAttributes,
} from "react";
import { motion } from "motion/react";
import { GPX } from "./gpx";
import { useCore } from "../core";

const Root = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  maxWidth: 480,
  aspectRatio: "1/1",
  borderRadius: 36,
  margin: "0 auto",
  padding: 16,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  boxShadow: `0px 4px 12px ${alpha(theme.palette.common.black, 0.125)}`,
  transition: "background-color 0.3s ease",
  background: "currentColor",
  overflow: "hidden",
  "> svg": {
    position: "absolute",
    top: "-30%",
    right: "-30%",
    width: "100%",
    height: "100%",
    fill: "currentColor",
    filter: "brightness(0.9)",
    zIndex: 1,
  },
}));

const MainBlock = styled(motion.div)(({ theme }) => ({
  position: "relative",
  width: "100%",
  aspectRatio: "6 / 5",
  backgroundImage: `linear-gradient(to bottom, ${alpha(theme.palette.common.white, 0.25)}, ${alpha(theme.palette.common.white, 1)})`,
  borderRadius: 24,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
  backdropFilter: "blur(8px)",
  "> img": {
    height: "75%",
    aspectRatio: "1 / 1",
  },
  ".product-info": {
    position: "absolute",
    bottom: 16,
    left: 16,
    color: theme.palette.primary.contrastText,
    display: "flex",
    flexDirection: "column",
    gap: 2,
    "> *": {
      lineHeight: 0.9,
    },
  },
}));

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color: string;
};
const Button = styled("button", {
  shouldForwardProp: (prop) => prop !== "color",
})<ButtonProps>(({ theme, color }) => ({
  all: "unset",
  color: color,
  position: "relative",
  backgroundColor: "currentColor",
  borderRadius: 8,
  flexGrow: 1,
  aspectRatio: "1 / 1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: `2px solid ${theme.palette.common.white}`,
  cursor: "pointer",
  boxSizing: "border-box",
}));

const ActiveBg = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  border: `3px solid ${theme.palette.primary.main}`,
  borderRadius: 8,
  zIndex: 0,
}));

// export const ProductsBlock = ({ block }: { block: Block }) => {
//   const [enlarge, setEnlarge] = useState(0);
//   const [hovered, setHovered] = useState(false);
//   const color = block.products?.[enlarge]?.bgColor;

//   const nextSlide = useCallback(() => {
//     setEnlarge((prev) => (prev + 1) % (block.products?.length || 1));
//   }, [block.products?.length]);

//   useEffect(() => {
//     if (!hovered) {
//       const interval = setInterval(nextSlide, 3000);
//       return () => clearInterval(interval);
//     }
//   }, [hovered, nextSlide]);

//   return (
//     <Box sx={{ width: "100%", px: 2 }}>
//       <Root
//         style={{ color }}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//       >
//         <GPX />
//         <MainBlock
//           initial={{ opacity: 0, y: 100 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: 100 }}
//           key={enlarge}
//           viewport={{ once: false }}
//         >
//           {((data?: Product) => {
//             if (!data) return null;
//             return (
//               <>
//                 <motion.img
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.75, delay: 0.3 }}
//                   src={data.thumbnail.url}
//                   key={data.id}
//                 />
//                 <div className="product-info">
//                   <Typography
//                     variant="h5"
//                     fontWeight="bold"
//                     textTransform="uppercase"
//                     component="div"
//                   >
//                     {data.title}
//                   </Typography>
//                 </div>
//                 <Fab
//                   children={<i className="fas fa-shopping-cart fa-lg" />}
//                   sx={{ position: "absolute", top: 24, right: 24 }}
//                   color="primary"
//                 />
//               </>
//             );
//           })(block.products?.[enlarge])}
//         </MainBlock>
//         <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
//           {block.products?.map((product, index) => (
//             <Button
//               key={index}
//               onClick={() => setEnlarge(index)}
//               color={product.bgColor}
//             >
//               {enlarge === index && (
//                 <ActiveBg
//                   layoutId="active-bg"
//                   transition={{ type: "spring", stiffness: 500, damping: 30 }}
//                 />
//               )}
//               <Avatar
//                 variant="rounded"
//                 src={product.thumbnail.url}
//                 children={<i className="fas fa-image-slash" />}
//               />
//             </Button>
//           ))}
//         </Stack>
//       </Root>
//     </Box>
//   );
// };

const Item = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  aspectRatio: "1 / 1",
  border: `solid 1px ${theme.palette.divider}`,
  borderRadius: Number(theme.shape.borderRadius) * 4,
  overflow: "hidden",
  boxShadow: theme.shadows[1],
  boxSizing: "border-box",
  ".img-button": {
    all: "unset",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    cursor: "pointer",
    transition: "all 0.3s ease",
    padding: 24,
    boxSizing: "border-box",
    background: theme.palette.primary.light + "33",
    "&:hover": {
      boxShadow: theme.shadows[2],
      "> img": {
        transform: "scale(1.1)",
      },
    },
    "&:active": {
      boxShadow: theme.shadows[3],
      transform: "scale(0.95)",
    },
    "> img": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      transition: "all 0.3s ease",
    },
    "> .content": {
      position: "absolute",
      lineHeight: 1,
      backgroundColor: alpha(theme.palette.common.black, 0.25),
      bottom: theme.spacing(1.5),
      left: theme.spacing(1.5),
      width: `calc(100% - ${theme.spacing(3)})`,
      borderRadius: theme.spacing(1),
      backdropFilter: "blur(4px)",
      padding: theme.spacing(1),
      boxSizing: "border-box",
      color: theme.palette.common.white,
      textAlign: "center",
      "> *": {
        lineHeight: 0.8,
        textTransform: "uppercase",
      },
    },
  },
  "> .actions": {
    position: "absolute",
    top: theme.spacing(1.5),
    right: theme.spacing(1.5),
    display: "flex",
    gap: theme.spacing(1),
    color: theme.palette.common.white,
  },
}));

export const ProductsBlock = ({ block }: { block: Block }) => {
  const {
    state: { en },
  } = useCore();
  const data = new Category(block);

  return (
    <Container maxWidth="md">
      {Boolean(block.title?.trim()) && (
        <Typography
          variant="h4"
          textTransform="uppercase"
          component="div"
          fontWeight="bold"
          textAlign="center"
          children={en ? block.title : block.title_th}
          sx={{ mb: 4 }}
        />
      )}
      <Grid container justifyContent="center" spacing={2}>
        {data.products?.map((product, index) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={index}>
            <Item>
              <a
                className="img-button"
                href={product.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                {product.thumbnail?.firebaseURL && (
                  <img src={new Media(product.thumbnail).Get().url(true)} />
                )}
                <div className="content">
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    textAlign="center"
                    component="div"
                  >
                    {en ? product.title : product.title_th}
                  </Typography>
                </div>
              </a>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
