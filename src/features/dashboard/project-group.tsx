import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import ProjectCard from 'features/dashboard/project-card/project-card';
import { CardGroupProps } from './project-card/interfaces';
import { ProjectGroupProps } from './interfaces';
import { CustomArrow } from './slider/custom-arrows';

const MAX_VISIBLE_PROJECTS = 4; // Environment variable or constant

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
      swipe: projects.length > MAX_VISIBLE_PROJECTS
    }),
    [projects.length]
  );

  if (!projects || projects.length === 0) {
    return <Box>No projects available.</Box>;
  }

  return (
    <Box pb={4}>
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
    <Box pl={10}>
      {Object.entries(projects).map(([category, categoryProjects]) => (
        <div key={category}>
          <h1>{category}</h1>
          <ProjectCardRow projects={categoryProjects} />
        </div>
      ))}
    </Box>
  );
};

export default ProjectGroup;
