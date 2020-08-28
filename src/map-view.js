import React from 'react';
import ReactDOM from 'react-dom';
import MapView from './Widgets/MapView';

const mapContainers = document.getElementsByClassName('c19t-map-container');

for ( let i = 0; i < mapContainers.length; i += 1 ) {
  const element = mapContainers[i];

  ReactDOM.render(
    <React.StrictMode>
      <MapView title={element.dataset?.title} />
    </React.StrictMode>,
    element
  );
}
