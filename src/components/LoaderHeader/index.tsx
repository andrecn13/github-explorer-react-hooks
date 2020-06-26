import React from 'react';
import ContentLoader from 'react-content-loader';

const LoaderHeader: React.FC = () => (
  <ContentLoader
    backgroundColor="#E8E8ED"
    width="500px"
    height="250px"
    style={{ marginTop: '100px' }}
  >
    <rect x="0" y="0" rx="50" ry="50" width="120" height="120" />
    <rect x="140" y="17" rx="4" ry="4" width="400" height="13" />
    <rect x="140" y="40" rx="3" ry="3" width="350" height="10" />

    <rect x="0" y="150" rx="3" ry="3" width="50" height="13" />
    <rect x="0" y="175" rx="3" ry="3" width="40" height="8" />
    <rect x="140" y="150" rx="3" ry="3" width="50" height="13" />
    <rect x="140" y="175" rx="3" ry="3" width="40" height="8" />
    <rect x="280" y="150" rx="3" ry="3" width="50" height="13" />
    <rect x="280" y="175" rx="3" ry="3" width="40" height="8" />
  </ContentLoader>
);

export default LoaderHeader;
