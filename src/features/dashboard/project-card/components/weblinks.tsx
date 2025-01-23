import { Box } from '@mui/material';
import React from 'react';
import PublicIcon from '@mui/icons-material/Public';
import LinkIcon from '@mui/icons-material/Link';
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

type WebLinkProps = {
  link: WeblinkData;
};

export const Weblink = ({ link }: WebLinkProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(
      link.url.startsWith('http') ? link.url : `http://${link.url}`,
      '_blank'
    );
  };

  const Icon =
    WEBLINK_ICONS[link.type.title as keyof typeof WEBLINK_ICONS] ||
    WEBLINK_ICONS.Default;
  const isSvgIcon = link.type.title === 'Figma' || link.type.title === 'Github';

  return (
    <Box sx={iconContainerStyle}>
      {isSvgIcon ? (
        <Icon
          style={svgIconStyle}
          preserveAspectRatio="xMidYMid meet"
          onClick={handleClick}
        />
      ) : (
        <Icon onClick={handleClick} sx={iconContainerStyle} />
      )}
    </Box>
  );
};

export const Weblinks = ({ data }: ProjectCardProps) => {
  if (!data.weblinks?.length) return null;

  return (
    <div style={weblinksContainerStyle}>
      {data.weblinks.map((link, index) => (
        <Box key={`${link.url}_${index}`} sx={{ height: '5rem' }}>
          <Weblink link={link} />
        </Box>
      ))}
    </div>
  );
};
