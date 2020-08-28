import React from 'react';
import {
  Card,
  CardContent,
} from "@material-ui/core";
import LineGraph from "../Components/LineGraph";

/**
 * Case Types: cases, deaths, recovered
 */
const Graph = ({casesType = 'recovered'}) => {
    return (
        <Card className="app__right">
          <CardContent>
            <div className="app__information">
              <h3>Worldwide new {casesType}</h3>
              <LineGraph casesType={casesType} />
            </div>
          </CardContent>
        </Card>
    );
};

export default Graph;