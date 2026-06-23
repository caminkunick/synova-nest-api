import { Box, Stack } from "@mui/material";
import type { Doc } from "./dto/response";
import { SlideBlock } from "./components/slide";
import { connectCore, useCore } from "./components/core";
import { TextBlock } from "./components/text";
import { ProductsBlock } from "./components/products";
import { YoutubeBlock } from "./components/youtube";
import { ClientsBlock } from "./components/client";
import { CategoryBlock } from "./components/category";
import { ProfileBlock } from "./components/profile";
import { useEffect } from "react";
import { FacebookBlock } from "./components/facebook";
import { MobileAppBlock } from "./components/mobile";

export const App = connectCore<{ data: Doc; lang: string }>()(({
  data,
  lang = "en",
}) => {
  const { setState } = useCore();
  useEffect(() => {
    setState((s) => s.Set("en", lang === "en"));
  }, [lang]);

  return (
    <Stack alignItems="center" spacing={4} sx={{ pb: data.dense ? 0 : 6 }}>
      {data.blocks?.map((block) => {
        switch (block.blockType) {
          case "sliderBlock":
            return <SlideBlock block={block} key={block.id} />;
          case "text":
            return <TextBlock block={block} key={block.id} />;
          case "products":
            return <ProductsBlock block={block} key={block.id} />;
          case "standard":
            // return <StandardBlock block={block} key={block.id} />;
            return null;
          case "youtube":
            return <YoutubeBlock block={block} key={block.id} />;
          case "client":
            return <ClientsBlock block={block} key={block.id} />;
          case "category":
            return <CategoryBlock block={block} key={block.id} />;
          case "profile":
            // return <ProfileBlock block={block} key={block.id} />;
            return (
              <ProfileBlock
                block={block}
                key={block.id}
                standard={data.blocks?.find((b) => b.blockType === "standard")}
              />
            );
          case "mobileapp":
            return <MobileAppBlock block={block} key={block.id} />;
          default:
            return process.env.NODE_ENV === "development" ? (
              <Box key={block.id}>
                <pre
                  style={{
                    fontSize: 10,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {JSON.stringify(block, null, 2)}
                </pre>
              </Box>
            ) : null;
        }
      })}
      {process.env.NODE_ENV !== "development" && (
        <FacebookBlock pageUrl="http://facebook.com/SynovaLtd" />
      )}
    </Stack>
  );
});
