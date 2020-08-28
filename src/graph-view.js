import React from 'react';
import ReactDOM from 'react-dom';
import GraphView from './Widgets/GraphView';

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
