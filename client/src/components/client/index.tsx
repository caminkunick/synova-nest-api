import {
  Box,
  Container,
  Grid,
  styled,
  Typography,
  type BoxProps,
} from "@mui/material";
import { BlockClient, Media, type Block } from "../../dto/response";
import { useCore } from "../core";

const ClientBlock = styled(Box)(() => ({
  width: "100%",
  aspectRatio: "1 / 1",
  "> img": {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
}));

type ClientContainerProps = BoxProps & { mobile?: boolean };
const ClientContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "mobile",
})<ClientContainerProps>(({ mobile }) => ({
  display: "grid",
  gridTemplateColumns: `repeat(${mobile ? 4 : 8}, 1fr)`,
  gap: 16,
}));

export const ClientsBlock = ({ block }: { block: Block }) => {
  const { state, mobile } = useCore();
  const data = new BlockClient(block);

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        textTransform="uppercase"
        component="div"
        sx={{ mb: 2 }}
      >
        {state.en ? "Our Clients" : "ลูกค้าของเรา"}
      </Typography>
      <ClientContainer mobile={mobile}>
        {data.clients.map((client) => (
          <Grid key={client.id}>
            <ClientBlock>
              <img src={new Media(client.logo).Get().url(true)} />
            </ClientBlock>
          </Grid>
        ))}
      </ClientContainer>
    </Container>
  );
};
