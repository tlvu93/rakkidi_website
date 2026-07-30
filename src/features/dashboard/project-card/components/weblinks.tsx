import LinkIcon from '@mui/icons-material/Link';
import PublicIcon from '@mui/icons-material/Public';
import { Box, Link as MuiLink } from '@mui/material';
import React from 'react';

import FigmaSVG from '@assets/figma_logo.svg';
import GithubSVG from '@assets/github-mark.svg';
import { WeblinkData } from 'features/dashboard/interfaces';

import { ProjectCardProps } from '../interfaces';
import {
  iconContainerStyle,
  svgIconStyle,
  weblinksContainerStyle
} from '../style/style';

const WEBLINK_ICONS = {
  Website: PublicIcon,
  Figma: FigmaSVG,
  Github: GithubSVG,
  Default: LinkIcon
} as const;

const SVG_ICON_TITLES = ['Figma', 'Github'];

/** Normalises a Sanity-authored URL to an absolute https URL. */
const toAbsoluteUrl = (url: string): string =>
  /^https?:\/\//i.test(url) ? url : `https://${url}`;

type WebLinkProps = {
  link: WeblinkData;
};

export const Weblink: React.FC<WebLinkProps> = ({
  link
}): React.ReactElement => {
  const Icon =
    WEBLINK_ICONS[link.type.title as keyof typeof WEBLINK_ICONS] ??
    WEBLINK_ICONS.Default;
  const isSvgIcon = SVG_ICON_TITLES.includes(link.type.title);

  return (
    <MuiLink
      href={toAbsoluteUrl(link.url)}
      target="_blank"
      // noopener denies the opened tab access to window.opener; without it the
      // target page can navigate this one (reverse tabnabbing).
      rel="noopener noreferrer"
      aria-label={`${link.type.title} (opens in a new tab)`}
      // The card behind this is itself clickable (it flips); stop the click and
      // the keyboard activation from also flipping it.
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
      sx={{
        ...iconContainerStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'inherit',
        borderRadius: 1,
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: 2
        }
      }}
    >
      {isSvgIcon ? (
        <Icon
          style={svgIconStyle}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          focusable="false"
        />
      ) : (
        <Icon sx={iconContainerStyle} aria-hidden="true" />
      )}
    </MuiLink>
  );
};

export const Weblinks: React.FC<ProjectCardProps> = ({
  data
}): React.ReactElement | null => {
  if (!data.weblinks?.length) return null;

  return (
    <Box component="ul" sx={{ ...weblinksContainerStyle, m: 0, p: 0 }}>
      {data.weblinks.map((link, index) => (
        <Box
          component="li"
          key={`${link.url}_${index}`}
          sx={{ height: '5rem', listStyle: 'none' }}
        >
          <Weblink link={link} />
        </Box>
      ))}
    </Box>
  );
};
