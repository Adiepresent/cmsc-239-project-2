import React, {Component} from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';

function removeCommas(str) {
    return(str.replace(/,/g,''));
}

const hipHopData = [
  {x: removeCommas("1950"), y: 0},
  {x: removeCommas("1960"), y: 0},
  {x: removeCommas("1970"), y: 1},
  {x: removeCommas("1980"), y: 3},
  {x: removeCommas("1990"), y: 87},
  {x: removeCommas("2000"), y: 148},
  {x: removeCommas("2010"), y: 41}
];

const rockData = [
  {x: removeCommas("1950"), y: 71},
  {x: removeCommas("1960"), y: 285},
  {x: removeCommas("1970"), y: 321},
  {x: removeCommas("1980"), y: 422},
  {x: removeCommas("1990"), y: 199},
  {x: removeCommas("2000"), y: 60},
  {x: removeCommas("2010"), y: 5}
];

export default class HipHopRockPlot extends Component {
  constructor() {
    super();
    this.state = {
      valueRock: 'gray',
      valueHipHop: 'gray',
      label: 'Rock',
      widthRock: 2,
      widthHipHop: 2
    };
  }

  render() {
    const {value} = this.state;

    return (
      <div>
        <XYPlot
          width={350}
          height={500}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis position="middle" title="YEAR"/>
          <YAxis position="middle" title="NUMBER OF SONGS IN TOP 100"/>
          <LineSeries
            onSeriesMouseOver={(event) => {
              this.setState({
                valueHipHop: '#67B3FF',
                widthHipHop: 10
              })
            }}
            onSeriesMouseOut={(event) => {
              this.setState({
                valueHipHop: 'gray',
                widthHipHop: 2
              })
            }}
            color={this.state.valueHipHop}
            strokeWidth={this.state.widthHipHop}
            data={hipHopData}/>
          <LineSeries
            onSeriesMouseOver={(event)=>{
              this.setState({
                valueRock: '#EA0484',
                widthRock: 10
              })
            }}
            onSeriesMouseOut={(event)=>{
              this.setState({
                valueRock: 'gray',
                widthRock: 2
              })
            }}
            color={this.state.valueRock}
            strokeWidth={this.state.widthRock}
            data={rockData}/>
      </XYPlot>
      </div>
    );
  }
}
