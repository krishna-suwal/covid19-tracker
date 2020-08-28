import React from 'react';
import ReactDOM from 'react-dom';
import TableView from './Widgets/TableView';

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
