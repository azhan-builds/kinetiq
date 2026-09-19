import React from 'react';
import { Studio } from 'sanity';
import config from '../../sanity.config';

export const StudioPage: React.FC = () => {
  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', margin: 0, padding: 0 }}>
      <Studio config={config} />
    </div>
  );
};

export default StudioPage;
