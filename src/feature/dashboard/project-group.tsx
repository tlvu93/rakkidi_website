import { Box } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ProjectCard from 'feature/dashboard/project-card/project-card';
import { CardGroupProps } from './project-card/interfaces';
import { ProjectGroupProps } from './interfaces';
import Slider from 'react-slick';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const CustomNextArrow: React.FC<any> = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        color: 'black'
      }}
      onClick={onClick}
    >
      <ArrowForward />
    </div>
  );
};

const CustomPrevArrow: React.FC<any> = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        color: 'black'
      }}
      onClick={onClick}
    >
      <ArrowBack />
    </div>
  );
};

const ProjectCardRow = ({ projects }: CardGroupProps) => {
  console.log(projects);
  const sliderSettings = {
    infinite: false,
    slidesToShow: Math.min(projects.length, 4),
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    arrows: projects.length > 4,
    centerMode: false,
    swipe: projects.length > 4
  };
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

const ProjectGroup = ({ projects }: ProjectGroupProps) => {
  return (
    <Box pl={10}>
      {Object.entries(projects).map(([category, projects]) => (
        <div key={category}>
          <h1>{category}</h1>
          <ProjectCardRow projects={projects} />
        </div>
      ))}
    </Box>
  );
};
export default ProjectGroup;
