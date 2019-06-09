import React, {Component} from 'react';
// import ShowcaseButton from '../showcase-components/showcase-button';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  LabelSeries
} from 'react-vis';


function groupBy(data, key) {
  return data.reduce((acc, row) => {
    if (!acc[row[key]]) {
      acc[row[key]] = [];
    }
    acc[row[key]].push(row);
    return acc;
  }, {});
}

function oneDecade(oneDecades, accessorKey) {
  let sumres = 0;
  let countres = 0;
  const array = [];
  oneDecades.forEach(d => {
    sumres += Number(d[accessorKey]);
    array.push(Number(d[accessorKey]));
    countres += 1;
  });
  const meanres = sumres / countres;
  return meanres;
}

export default class BarTwo extends Component {
  constructor() {
    super();
    this.state = {
      value: false,
      keyOfInterest: 'instrumentalness'
    };
  }
  render() {
    const decades = groupBy(data, 'year_bin');
    const mappedDecadess = Object.keys(decades);
    const dance = groupBy(decades[keyOfInterest], 'danceability');
    const preppedDataa = Object.entries(dance).map(([key, values]) => ({x: key, y: avginst}));

    const {value, keyOfInterest} = this.state;
    const {data} = this.props;
    const buttons = ['danceability', 'loudness'];
    const avginst = oneDecade(decades[keyOfInterest], 'danceability');
    const avginst2 = oneDecade(decades[keyOfInterest], 'loudness');
    const preppedDataOne = ([{x: 'danceability', y: avginst}]);
    const preppedDataTwo = ([{x: 'loudness', y: avginst2}]);


    const BarSeries = value ? VerticalBarSeriesCanvas : VerticalBarSeries;

    return (
      <div>
      {(buttons).map(key => {
        return (<button className="button"
        key={key}
        onClick={() => this.setState({keyOfInterest: key})}
        >{key} </button>);
      })}
        <XYPlot xType="ordinal" width={500} height={300} xDistance={100}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <BarSeries className="vertical-bar-series-example" data={preppedDataa} />
          <BarSeries className="vertical-bar-series-example" data={preppedDataTwo} />
        </XYPlot>
      </div>
    );
  }
}



