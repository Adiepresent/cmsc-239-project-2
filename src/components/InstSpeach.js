
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

export default class InstSpeach extends Component {
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

    // const decades = groupBy(data, 'year_bin');
    // const mappedDecadess = Object.keys(decades);
    // const genders = groupBy(decades[keyOfInterest], 'cluster');
    // const preppedData = Object.keys(genders).map(key => ({key, size: genders[key].length}));

    // proff that having buttons for poetics will work
         const clusters = groupBy(data, 'cluster');

         const buttons = ['instrumentalness', 'speechiness'];

          const avginst = oneDecade(clusters['Poetic'], keyOfInterest);
          const avginst2 = oneDecade(clusters['String Lover'], keyOfInterest);

          const preppedDataOne = ([{x: 'Poetic', y: avginst}]);
          const preppedDataTwo = ([{x: 'String Lover', y: avginst2}]);

          // const avgpo = oneDecade(clusters['Poetic'], 'speechiness');
          // const avgpo2 = oneDecade(clusters['String Lover'], 'speechiness');

          //
          //
          // const inst = oneDecade(clusters[keyOfInterest], 'instrumentalness');
          // const speech = oneDecade(clusters[keyOfInterest], 'speechiness');

    // const decades = groupBy(data, 'year_bin');
    // const mappedDecadess = Object.keys(decades);
    // const genders = groupBy(decades[keyOfInterest], 'main_genre');
    // const preppedDataa = Object.entries(genders).map(([key, values]) => ({x: key, y: genders[key].length}));



    // const labelData = greenData.map((d, idx) => ({
    //   x: d.x,
    //   y: Math.max(greenData[idx].y, blueData[idx].y)
    // }));
  //  const content = useCanvas ? 'TOGGLE TO SVG' : 'TOGGLE TO CANVAS';
    const BarSeries = value ? VerticalBarSeriesCanvas : VerticalBarSeries;
    // const content = value ? 'TOGGLE TO SVG' : 'TOGGLE TO CANVAS';
    return (
      <div>
      {(buttons).map(key => {
        return (<button
        key={key}
        onClick={() => this.setState({keyOfInterest: key})}
        >{key} </button>);
      })}
        <XYPlot xType="ordinal" width={900} height={300} xDistance={100}>
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
