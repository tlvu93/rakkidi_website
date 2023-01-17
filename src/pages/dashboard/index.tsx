import AppLayout from '@shared/layouts/app-layout';
import type { NextPage } from 'next';
import { MOCK_CARDS } from '../../mock-data';
import ProjectGroup, { ProjectCategory } from './project-group';
import { useMemo } from 'react';

const Dashboard: NextPage = () => {
  const cards = MOCK_CARDS;

  const cardsSortedByCategory = useMemo(() => {
    return cards.reduce((acc, card) => {
      const category = card.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(card);
      return acc;
    }, {} as ProjectCategory);
  }, [cards]);

  return (
    <AppLayout>
      <ProjectGroup cardSortedByCategory={cardsSortedByCategory} />
    </AppLayout>
  );
};

export default Dashboard;
