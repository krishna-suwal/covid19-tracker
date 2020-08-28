import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MapView from './Widgets/MapView';
import TableView from './Widgets/TableView';
import Graph from './Widgets/Graph';

if ( document.getElementById('c19t-map-container') ) {
  ReactDOM.render(
    <React.StrictMode>
      <MapView />
    </React.StrictMode>,
    document.getElementById('c19t-map-container')
  );
}

if ( document.getElementById('c19t-table-container') ) {
  ReactDOM.render(
    <React.StrictMode>
      <TableView />
    </React.StrictMode>,
    document.getElementById('c19t-table-container')
  );
}

if ( document.getElementById('c19t-graph-container') ) {
  ReactDOM.render(
    <React.StrictMode>
      <Graph casesType="cases" title="WorldWide New Cases" />
      <Graph casesType="recovered" title="WorldWide New Recovered" />
      <Graph casesType="deaths" title="WorldWide New Deaths" />
      <Graph casesType="cases" title="WorldWide Cases" isIncremental />
      <Graph casesType="recovered" title="WorldWide Recovered" isIncremental />
      <Graph casesType="deaths" title="WorldWide Deaths" isIncremental />
    </React.StrictMode>,
    document.getElementById('c19t-graph-container')
  );
}
