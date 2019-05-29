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

const greenData = [{x: 'A', y: 10}, {x: 'B', y: 5}, {x: 'C', y: 15}];

const blueData = [{x: 'A', y: 12}, {x: 'B', y: 2}, {x: 'C', y: 11}];

const labelData = greenData.map((d, idx) => ({
  x: d.x,
  y: Math.max(greenData[idx].y, blueData[idx].y)
}));

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
    const decades = groupBy(data, 'year_bin');
    const mappedDecadess = Object.keys(decades);
    const genders = groupBy(decades[keyOfInterest], 'Gender');
    const preppedData = Object.keys(genders).map(key => ({key, size: genders[key].length}));

  //  const content = useCanvas ? 'TOGGLE TO SVG' : 'TOGGLE TO CANVAS';
    const BarSeries = value ? VerticalBarSeriesCanvas : VerticalBarSeries;
    return (
      <div>
      {(mappedDecadess).map(key => {
        return (<button
        key={key}
        onClick={() => this.setState({keyOfInterest: key})}
        >{key} </button>);
      })}
        <XYPlot xType="ordinal" width={300} height={300} xDistance={100}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <BarSeries className="vertical-bar-series-example" data={greenData} />
          <BarSeries data={blueData} />
          <LabelSeries data={labelData} getLabel={d => d.x} />
        </XYPlot>
      </div>
    );
  }
}
