import { Swiper, SwiperSlide } from "swiper/react";
import type { Block } from "../../dto/response";
import {
  alpha,
  Box,
  Button,
  styled,
  Typography,
  type BoxProps,
} from "@mui/material";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { useCore } from "../core";

const Root = styled(Box)(({ theme }) => ({
  width: "100%",
  "--swiper-theme-color": theme.palette.secondary.main,
  "--swiper-navigation-color": theme.palette.secondary.main,
  "--swiper-pagination-color": theme.palette.secondary.main,
}));

type SlideItemProps = BoxProps & {
  mobile?: boolean;
  image?: string;
};
const SlideItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "mobile",
})<SlideItemProps>(({ theme, mobile, image }) => ({
  position: "relative",
  backgroundColor: theme.palette.primary.main,
  backgroundImage: image ? `url(${image})` : "none",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  color: theme.palette.primary.contrastText,
  width: "100%",
  aspectRatio: mobile ? "unset" : "21/9",
  height: mobile ? "100dvh" : "unset",
  "&:before": {
    content: '""',
    display: "block",
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "50%",
    backgroundImage: `linear-gradient(to top, ${alpha(theme.palette.common.black, 0.5)}, transparent)`,
    zIndex: 1,
  },
  "&:after": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `radial-gradient(circle at center, ${alpha(theme.palette.common.black, 0.75)}, transparent)`,
    zIndex: 1,
  },
  "& .slide-content": {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    width: 960,
    maxWidth: mobile ? "90%" : "60%",
    height: "100%",
    zIndex: 2,
    color: theme.palette.common.white,
    paddingInline: 32,
    boxSizing: "border-box",
  },
  p: {
    marginTop: 0,
    marginBottom: 0,
    lineHeight: 1.2,
    maxWidth: 480,
  },
}));

export const SlideBlock = ({ block }: { block: Block }) => {
  const { mobile } = useCore();

  return (
    <Root>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {block.Slide?.map((slide, index) => (
          <SwiperSlide key={index}>
            <SlideItem mobile={mobile} image={slide.Image?.firebaseURL}>
              <div className="slide-content">
                <Typography
                  variant="h4"
                  component="h2"
                  align="center"
                  children={slide.Title}
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                />
                <Typography
                  variant="body1"
                  component="div"
                  align="center"
                  children={
                    slide.Description ? (
                      <RichText data={slide.Description} />
                    ) : null
                  }
                />
                <Button
                  variant="outlined"
                  component="a"
                  href={slide.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {slide["Button Text"]}
                </Button>
              </div>
            </SlideItem>
          </SwiperSlide>
        ))}
      </Swiper>
    </Root>
  );
};
