import { Box, IconButton } from '@mui/material';
import React from 'react';

import PublicIcon from '@mui/icons-material/Public';

import LinkIcon from '@mui/icons-material/Link';

import FigmaSVG from '@assets/figma_logo.svg';
import GithubSVG from '@assets/github-mark.svg';
import { WeblinkData } from 'feature/dashboard/interfaces';
import { ProjectCardProps } from '../interfaces';

type WebLinkProps = {
  link: WeblinkData;
};

const weblinkStyle = {
  display: 'block', // This ensures the icon takes up all available space
  width: '100%',
  height: '100%',
  transition: 'transform 0.3s',
  ':hover': {
    transform: 'scale(1.1)'
  }
};

const svgStyle = {
  height: '100%',
  width: 'auto',
  transition: 'transform 0.3s',
  ':hover': {
    transform: 'scale(1.1)'
  }
};

export const Weblink = ({ link }: WebLinkProps) => {
  const handleClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url.startsWith('http') ? url : `http://${url}`, '_blank');
  };

  switch (link.type.title) {
    case 'Website':
      return (
        <Box sx={{ width: '100%', height: '100%' }}>
          <PublicIcon
            onClick={(e: React.MouseEvent<Element, MouseEvent>) =>
              handleClick(e, link.url)
            }
            sx={weblinkStyle}
          />
        </Box>
      );

    case 'Figma':
      return (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            transition: 'transform 0.3s',
            ':hover': {
              transform: 'scale(1.1)'
            }
          }}
        >
          <FigmaSVG
            style={svgStyle}
            preserveAspectRatio="xMidYMid meet"
            onClick={(e: React.MouseEvent<Element, MouseEvent>) =>
              handleClick(e, link.url)
            }
          />
        </Box>
      );
    case 'Github':
      return (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            transition: 'transform 0.3s',
            ':hover': {
              transform: 'scale(1.1)'
            }
          }}
        >
          <GithubSVG
            style={svgStyle}
            preserveAspectRatio="xMidYMid meet"
            onClick={(e: React.MouseEvent<Element, MouseEvent>) =>
              handleClick(e, link.url)
            }
          />
        </Box>
      );
    default:
      return (
        <IconButton>
          <LinkIcon sx={weblinkStyle} />
        </IconButton>
      );
  }
};

export const Weblinks = ({ data }: ProjectCardProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem'
      }}
    >
      {data.weblinks &&
        data.weblinks.map((link, index) => (
          <Box key={`${link.url}_${index}`} sx={{ height: '5rem' }}>
            <Weblink link={link} />
          </Box>
        ))}
    </Box>
  );
};
