import React, {Component} from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas
  // 
} from 'react-vis';

function oneDecade(oneDecades, accessorKey) {
  let sumres = 0;
  let countres = 0;
  const array = [];
  oneDecades.forEach(d => {
    sumres = sumres + Number(d[accessorKey]);
    array.push(Number(d[accessorKey]));
    countres += 1;
  });
  const meanres = sumres / countres;
  return meanres;
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

export default class BarTwo extends Component {
  constructor() {
    super();
    this.state = {
      value: false,
      keyOfInterest: 'instrumentalness'

    };
  }

  render() {
    const {value, keyOfInterest} = this.state;
    const {data} = this.props;
    const clusters = groupBy(data[0], 'cluster');
    const buttons = ['instrumentalness', 'speechiness'];
    const avginst = oneDecade(clusters['Poetic'], keyOfInterest);
    const avginst2 = oneDecade(clusters['String Lover'], keyOfInterest);
    const preppedDataOne = ([{x: 'Poetic', y: avginst}]);
    const preppedDataTwo = ([{x: 'String Lover', y: avginst2}]);

    const BarSeries = value ? VerticalBarSeriesCanvas : VerticalBarSeries;
    return (
      <div>
        {(buttons).map(key => {
          return (<button className="button"
          key={key}
          onClick={() => this.setState({keyOfInterest: key})}
          >{key} </button>);
        })}
        <XYPlot xType="ordinal" width={300} height={300} xDistance={100}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <BarSeries className="vertical-bar-series-example" data={preppedDataOne} />
          <BarSeries className="vertical-bar-series-example" data={preppedDataTwo} />

        </XYPlot>
      </div>
    );
  }
}
