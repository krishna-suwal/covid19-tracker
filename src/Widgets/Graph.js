import React from 'react';
import {
  Card,
  CardContent,
} from "@material-ui/core";
import LineGraph from "../Components/LineGraph";

/**
 * Case Types: cases, deaths, recovered
 */
const Graph = ({casesType = 'recovered', title = 'WorldWide New Records', isIncremental = false}) => {
    return (
        <Card>
          <CardContent>
            <div>
              <h3>{title}</h3>
              <LineGraph casesType={casesType} isIncremental={isIncremental} />
            </div>
          </CardContent>
        </Card>
    );
};

export default Graph;