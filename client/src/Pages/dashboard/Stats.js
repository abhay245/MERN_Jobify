import { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import { StatsContainer } from '../../Components/StatsContainer';
import { Loading } from '../../Components/Loading';

export const Stats = () => {
  const { showStats, isLoading } = useAppContext();
  useEffect(() => {
    showStats();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
    </>
  );
};

