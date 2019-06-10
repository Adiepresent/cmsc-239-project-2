// import React from 'react';
// import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';

// function removeCommas(str) {
//     return(str.replace(/,/g,''));
// }

// const hipHopData = [
//   {x: removeCommas("1950"), y: 0},
//   {x: removeCommas("1960"), y: 0}, 
//   {x: removeCommas("1970"), y: 1}, 
//   {x: removeCommas("1980"), y: 3}, 
//   {x: removeCommas("1990"), y: 87},
//   {x: removeCommas("2000"), y: 148}, 
//   {x: removeCommas("2010"), y: 41}
// ];

// const rockData = [
//   {x: removeCommas("1950"), y: 71},
//   {x: removeCommas("1960"), y: 285}, 
//   {x: removeCommas("1970"), y: 321}, 
//   {x: removeCommas("1980"), y: 422}, 
//   {x: removeCommas("1990"), y: 199},
//   {x: removeCommas("2000"), y: 60}, 
//   {x: removeCommas("2010"), y: 5}
// ];

// const BarTwo = (props) => {
//         return (
//             <XYPlot
//                 width={500}
//                 height={500}>
//                 <VerticalGridLines />
//                 <HorizontalGridLines />
//                 <XAxis />
//                 <YAxis />
//                 <LineSeries
//                     data={hipHopData}/>
//                 <LineSeries 
//                   data={rockData}/>
//             </XYPlot>
//       );
// }

// export default BarTwo;


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
    const decades = groupBy(data[1], 'year_bin');
    // const dance = Number(decades[keyOfInterest]['danceability']);
    const buttons = ['danceability', 'energy', 'valence'];
    // console.log(decades);
    const mappedDecadess = Object.keys(decades);
    // console.log(mappedDecadess);
  
    // const cats = groupBy(decades[keyOfInterest],)
    
    const dance = getDataNum(decades, keyOfInterest, 'danceability');
    console.log(dance);
    const energy = getDataNum(decades, keyOfInterest, 'energy');
    console.log(energy);
    const valence = getDataNum(decades, keyOfInterest, 'valence');
    console.log(valence);
    const preppedDataDance = ([{x: 'Danceability', y: dance}]);
    console.log(preppedDataDance);
    const preppedDataEnergy = ([{x: 'Energy', y: energy}]);
    console.log(preppedDataEnergy);
    const preppedDataValence = ([{x: 'Valence', y: valence}]);
    console.log(preppedDataValence);

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
        <BarSeries className="vertical-bar-series-example" data={preppedDataDance} />
        <BarSeries className="vertical-bar-series-example" data={preppedDataEnergy} />
        <BarSeries className="vertical-bar-series-example" data={preppedDataValence} />
      </XYPlot>
    </div>
    );
  }
}