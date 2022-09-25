import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#ededed"
    foregroundColor="#cccccc"
  >
    <circle cx="130" cy="127" r="120" />
    <rect x="0" y="268" rx="10" ry="10" width="280" height="24" />
    <rect x="0" y="308" rx="10" ry="10" width="280" height="84" />
    <rect x="0" y="422" rx="10" ry="10" width="125" height="27" />
    <rect x="140" y="411" rx="10" ry="10" width="139" height="44" />
  </ContentLoader>
);
