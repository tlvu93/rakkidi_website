import { Box, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import ProjectCard from 'features/dashboard/project-card/project-card';

import { ProjectGroupProps } from './interfaces';
import { CardGroupProps } from './project-card/interfaces';
import { CustomArrow } from './slider/custom-arrows';

const MAX_VISIBLE_PROJECTS = 4; // Environment variable or constant

/** Category names are free text from Sanity, so they need cleaning up before
 *  they can be used in an id for aria-labelledby. */
const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const ProjectCardRow: React.FC<CardGroupProps> = ({ projects }) => {
  const sliderSettings = useMemo(
    () => ({
      infinite: false,
      slidesToShow: Math.min(projects.length, MAX_VISIBLE_PROJECTS),
      slidesToScroll: 1,
      nextArrow: <CustomArrow direction="next" />,
      prevArrow: <CustomArrow direction="prev" />,
      arrows: projects.length > MAX_VISIBLE_PROJECTS,
      centerMode: false,
      swipe: projects.length > MAX_VISIBLE_PROJECTS,
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: Math.min(projects.length, 3),
            slidesToScroll: 1,
            arrows: projects.length > 3
          }
        },
        {
          breakpoint: 960,
          settings: {
            slidesToShow: Math.min(projects.length, 2),
            slidesToScroll: 1,
            arrows: projects.length > 2
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: projects.length > 1
          }
        }
      ]
    }),
    [projects.length]
  );

  if (!projects || projects.length === 0) {
    return (
      <Box role="status" sx={{ py: 2, color: 'text.secondary' }}>
        No projects available.
      </Box>
    );
  }

  return (
    <Box
      sx={{
        pb: 4
      }}
    >
      <Slider {...sliderSettings}>
        {projects.map((project) => (
          <Box key={project._id} sx={{ display: 'flex' }}>
            <ProjectCard data={project} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

const ProjectGroup: React.FC<ProjectGroupProps> = ({ projects }) => {
  return (
    <Box
      sx={{
        pl: 10
      }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Projects
      </Typography>
      {/* One <h1> per category used to be emitted here, which flattened the
          whole page into N top-level headings. Each category is now a titled
          section under the single page heading. */}
      {Object.entries(projects).map(([category, categoryProjects]) => (
        <Box
          key={category}
          component="section"
          aria-labelledby={`project-category-${slugify(category)}`}
        >
          <Typography
            variant="h5"
            component="h2"
            id={`project-category-${slugify(category)}`}
            sx={{ mb: 1 }}
          >
            {category}
          </Typography>
          <ProjectCardRow projects={categoryProjects} />
        </Box>
      ))}
    </Box>
  );
};

export default ProjectGroup;
