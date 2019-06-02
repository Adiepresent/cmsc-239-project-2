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



    const decades = groupBy(data, 'year_bin');
    const mappedDecadess = Object.keys(decades);
    const genders = groupBy(decades[keyOfInterest], 'main_genre');
    const preppedDataa = Object.entries(genders).map(([key, values]) => ({x: key, y: genders[key].length}));


    // const labelData = greenData.map((d, idx) => ({
    //   x: d.x,
    //   y: Math.max(greenData[idx].y, blueData[idx].y)
    // }));
  //  const content = useCanvas ? 'TOGGLE TO SVG' : 'TOGGLE TO CANVAS';
    const BarSeries = value ? VerticalBarSeriesCanvas : VerticalBarSeries;
    // const content = value ? 'TOGGLE TO SVG' : 'TOGGLE TO CANVAS';
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
