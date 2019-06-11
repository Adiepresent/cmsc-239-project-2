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
    const preppedDataa = Object.entries(genres).map(([key, values]) => ({x: key, y: genres[key].length}));
    const BarSeries = value ? VerticalBarSeriesCanvas : VerticalBarSeries;

    return (
      <div>
      {(mappedDecadess).map(key => {
        return (<button className="button"
        key={key}
        onClick={() => this.setState({keyOfInterest: key})}
        >{key} </button>);
      })}
        <XYPlot xType="ordinal" width={900} height={300} xDistance={100} colorType="literal"
                  getColor={(d, idx) => {
                    let color = '#00000';
                    if (d.x === 'rock') {
                      color = '#EA0484';
                    }
                    if (d.x === 'multi-genre-artist') {
                      color = '#040404';
                    }
                    if (d.x === 'pop') {
                      color = '#EAEA84';
                    }
                    if (d.x === 'soul') {
                      color = '#8404EA';
                    }
                    if (d.x === 'country') {
                      color = '#EA8404';
                    }
                    if (d.x === 'jazz') {
                      color = '#0404EA';
                    }
                    if (d.x === 'electronic/dance') {
                      color = '#8484EA';
                    }
                    if (d.x === 'disco') {
                      color = '#EAEA04';
                    }
                    if (d.x === 'alternative/indie') {
                      color = '#8484EA';
                    }
                    if (d.x === 'blues') {
                      color = '#04EA04';
                    }
                    if (d.x === 'rnb') {
                      color = '#840484';
                    }
                    if (d.x === 'reggae') {
                      color = '#84EA84';
                    }
                    if (d.x === 'folk') {
                      color = '#EA84EA';
                    }
                    if (d.x === 'swing') {
                      color = '#FFB3FF';
                    }
                    if (d.x === 'hip-hop') {
                      color = '#67B3FF';
                    }
                    return color;
                  }}>
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
