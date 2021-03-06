import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType, isIncremental) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint;
      
      if ( isIncremental ) {
        newDataPoint = {
          x: date,
          y: data[casesType][date],
        };
      } else {
        newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
      }
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

const colorMap = {
  cases: {
    backgroundColor: "#ff878791",
    borderColor: "#ef4d4d",
  },
  recovered: {
    backgroundColor: "#a7f5b3",
    borderColor: "green",
  },
  deaths: {
    backgroundColor: "rgba(204, 16, 52, 0.5)",
    borderColor: "#CC1034",
  },
};

function LineGraph({ casesType, isIncremental }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType, isIncremental);
          setData(chartData);
        });
    };

    fetchData();
  }, [casesType, isIncremental]);

  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                ...colorMap[casesType],
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
