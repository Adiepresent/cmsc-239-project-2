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

export default class Example extends Component {
  constructor() {
    super();
    this.state = {
      value: false,
      keyOfInterest: '1950s'
    };
  }

  render() {
    const {value, keyOfInterest} = this.state;
    const {data} = this.props;

    const decades = groupBy(data[0], 'year_bin');
    const mappedDecadess = Object.keys(decades);
    const genres = groupBy(decades[keyOfInterest], 'main_genre');
    const preppedDataa = Object.entries(genres).map(([key, values]) => ({x: key, y: decades[keyOfInterest]}));
    const BarSeries = value ? VerticalBarSeriesCanvas : VerticalBarSeries;

    return (
      <div>
      {(mappedDecadess).map(key => {
        return (<button className="button"
        key={key}
        onClick={() => this.setState({keyOfInterest: key})}
        >{key} </button>);
      })}
        <XYPlot xType="ordinal" width={900} height={300} xDistance={100}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <BarSeries className="vertical-bar-series-example" data={preppedDataa} />
        </XYPlot>
      </div>
    );
  }
}
