import { Container } from "@mui/material";
import type { Block } from "../../dto/response";
import { useCore } from "../core";
import { RichText } from "@payloadcms/richtext-lexical/react";

export const TextBlock = ({ block }: { block: Block }) => {
  const { state } = useCore();
  const data = state.en ? block["Text English"] : block["Text Thai"];
  return (
    <Container maxWidth="md">{data && <RichText data={data} />}</Container>
  );
};
