import {
  alpha,
  Box,
  Container,
  Grid,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import { Category, type Block } from "../../dto/response";
import { useEffect, useState } from "react";
import { useCore } from "../core";
import { BlurHashImage } from "../bh.image";

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
      objectFit: "cover",
      transition: "all 0.3s ease",
    },
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
  "> .actions": {
    position: "absolute",
    top: theme.spacing(1.5),
    right: theme.spacing(1.5),
    display: "flex",
    gap: theme.spacing(1),
    color: theme.palette.common.white,
  },
}));

export const CategoryBlock = ({ block }: { block: Block }) => {
  const {
    state: { en },
  } = useCore();
  const [fav, setFav] = useState<string[]>([]);
  const data = new Category(block);

  const toggleFav = (name: string) => {
    const newFav = fav.includes(name)
      ? fav.filter((f) => f !== name)
      : [...fav, name];
    setFav(newFav);
    localStorage.setItem("favoriteCategories", JSON.stringify(newFav));
  };

  useEffect(() => {
    const storedFav = localStorage.getItem("favoriteCategories");
    if (storedFav) {
      setFav(JSON.parse(storedFav));
    }
  }, []);

  return (
    <Container maxWidth="md">
      {data.title && (
        <Typography
          variant="h4"
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          children={(en ? data.title : data.title_th) || data.title}
          gutterBottom
        />
      )}
      {data.categories.length > 0 ? (
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          {data.categories
            .sort((a, b) => {
              if (fav.includes(a.id) && !fav.includes(b.id)) return -1;
              if (!fav.includes(a.id) && fav.includes(b.id)) return 1;
              return 0;
            })
            .map((category, index) => (
              <Grid size={{ xs: 6, sm: 6, md: 4 }} key={index}>
                <Item>
                  <a
                    className="img-button"
                    href={category.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BlurHashImage image={category.image} small />
                  </a>
                  <div className="content">
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      textAlign="center"
                      component="div"
                    >
                      {category.name}
                    </Typography>
                  </div>
                  <div className="actions">
                    <IconButton
                      size="small"
                      color={fav.includes(category.id) ? "error" : "inherit"}
                      onClick={() => toggleFav(category.id)}
                      sx={{ minWidth: "unset", height: "fit-content" }}
                    >
                      <i className="fas fa-heart" />
                    </IconButton>
                  </div>
                </Item>
              </Grid>
            ))}
        </Grid>
      ) : null}
    </Container>
  );
};
