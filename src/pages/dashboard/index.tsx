import { Grid } from '@mui/material';
import AppLayout from '@shared/layouts/app-layout';
import type { NextPage } from 'next';
import { MOCK_CARDS } from '../../mock-data';
import ProjectGroup, { ProjectCategory } from './project-group';

const categoryArray = (cards = MOCK_CARDS) => {
  const cardSortedByCategory: ProjectCategory = {};
  cards.forEach((card) => {
    if (!Object.keys(cardSortedByCategory).includes(card.category)) {
      cardSortedByCategory[card.category] = [];
    }
    cardSortedByCategory[card.category].push(card);
  });

  return cardSortedByCategory;
};

const Dashboard: NextPage = () => {
  return (
    <AppLayout>
      <ProjectGroup cardSortedByCategory={categoryArray()} />
    </AppLayout>
  );
};

export default Dashboard;
