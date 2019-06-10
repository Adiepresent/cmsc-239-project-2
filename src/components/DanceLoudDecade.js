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