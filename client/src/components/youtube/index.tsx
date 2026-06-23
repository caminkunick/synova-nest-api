import { Box, styled, Typography } from '@mui/material';
import type { Block } from '../../dto/response';
import { SecGpx02, SecGpxUrl } from './sec.gpx';

const getYoutubeId = (url: string) => {
  const youtubeParseRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(youtubeParseRegex);
  return match ? match[1] : null;
};

const Root = styled(Box)(({ theme }) => ({
  position: 'relative',
  background: theme.palette.primary.light,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(4),
  overflow: 'hidden',
  iframe: {
    position: 'relative',
    border: 'none',
    width: '100%',
    maxWidth: theme.breakpoints.values.md,
    aspectRatio: '16 / 9',
    borderRadius: theme.spacing(2),
    overflow: 'hidden',
    zIndex: 10,
  },
  '> img.gpx': {
    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'translate(25%, -25%)',
    width: '50dvmin',
    zIndex: 1,
  },
}));

export const YoutubeBlock = ({ block }: { block: Block }) => {
  const youtubeId = getYoutubeId(block.youtubeUrl || '');

  return (
    <Root>
      {block.title && (
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'white' }}>
          {block.title}
        </Typography>
      )}
      {youtubeId && (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title="YouTube Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}
    </Root>
  );
};
