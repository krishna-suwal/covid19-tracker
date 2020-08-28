import React from 'react';
import {
  Card,
  CardContent,
} from "@material-ui/core";
import Table from "../Components/Table";
import { sortData } from '../Utils';

const TableView = ({title = 'Cases by Country'}) => {
    const [tableData, setTableData] = React.useState([]);
    
    React.useEffect(() => {
        const getCountriesData = async () => {
            fetch("https://disease.sh/v3/covid-19/countries")
                .then((response) => response.json())
                .then((data) => {
                    let sortedData = sortData(data);
                    setTableData(sortedData);
                });
        };
        getCountriesData();
    }, []);

    return (
        <Card>
          <CardContent>
            <div>
              <h3>{title}</h3>
              <Table countries={tableData} />
            </div>
          </CardContent>
        </Card>
    );
};

export default TableView;