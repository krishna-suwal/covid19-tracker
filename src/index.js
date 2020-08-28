import React from 'react';
import ReactDOM from 'react-dom';
import MapView from './Widgets/MapView';
import TableView from './Widgets/TableView';
import GraphView from './Widgets/GraphView';

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

const graphContainers = document.getElementsByClassName('c19t-graph-container');

for ( let i = 0; i < graphContainers.length; i += 1 ) {
  const element = graphContainers[i];

  ReactDOM.render(
    <React.StrictMode>
      <GraphView
        title={element.dataset?.title}
        casesType={element.dataset?.type}
        isIncremental={element.dataset?.isincremental === 'yes'}
      />
    </React.StrictMode>,
    element
  );
}

const tableContainers = document.getElementsByClassName('c19t-table-container');

for ( let i = 0; i < tableContainers.length; i += 1 ) {
  const element = tableContainers[i];

  ReactDOM.render(
    <React.StrictMode>
      <TableView
        title={element.dataset?.title}
      />
    </React.StrictMode>,
    element
  );
}
