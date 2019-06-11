import React from 'react';

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries
} from 'react-vis';

function getDataNum(data,decade,key2) {
  if(key2 == 'danceability'){
    return(Number(data[decade][0].danceability));
  }
  else if(key2 == 'energy') {
    return (Number(data[decade][0].energy));
  }
  else if(key2 == 'valence'){
  return (Number(data[decade][0].valence));
}
}

function groupBy(data, key) {
  return data.reduce((acc, row) => {
    if (!acc[row[key]]) {
      acc[row[key]] = [];
    }
    acc[row[key]].push(row);
    return acc;
  }, {});
}


export default function AxisOn0({
  xDomain = [0, 1],
  yDomain = [-5, 15],
  xAxisOn0 = true,
  yAxisOn0 = true,
  verticalTickValues = [],
  horizontalTickValues = [0]
}) {
  return (
    <XYPlot width={300} height={300} {...{xDomain, yDomain}}>
      {!verticalTickValues || verticalTickValues.length ? (
        <VerticalGridLines tickValues={verticalTickValues} />
      ) : null}
      {!horizontalTickValues || horizontalTickValues.length ? (
        <HorizontalGridLines tickValues={horizontalTickValues} />
      ) : null}
      <XAxis on0={xAxisOn0} />
      <YAxis on0={yAxisOn0} />
      <LineSeries
        data={[
          {x: -1, y: 10},
          {x: 0, y: 5},
          {x: 1, y: 3},
          {x: 2, y: -5},
          {x: 3, y: 15}
        ]}
      />
    </XYPlot>
  );
}
