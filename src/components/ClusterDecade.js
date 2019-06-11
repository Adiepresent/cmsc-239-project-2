import React, {Component} from 'react';

import {RadialChart, Hint} from 'react-vis';

function groupBy(data, key) {
  return data.reduce((acc, row) => {
    if (!acc[row[key]]) {
      acc[row[key]] = [];
    }
    acc[row[key]].push(row);
    return acc;
  }, {});
}

export default class ClusterDecade extends Component {
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
    const genders = groupBy(decades[keyOfInterest], 'cluster');
    const preppedData = Object.keys(genders).map(key => ({key, size: genders[key].length}));

    return (
      <div>
        {(mappedDecadess).map(key => {
          return (<button className="button"
          key={key}
          onClick={() => this.setState({keyOfInterest: key})}
          >{key} </button>);
        })}
        <RadialChart
          animation
          getAngle={d => d.size}
          //labelsStyle={{fontSize: 16, fill: '#222'}}
          getLabel={d => d.key}
          showLabels={true}
          data={preppedData}
          colorType="literal"
          getColor={(d, idx) => {
            let color = '#000000';
            if (d.key === 'String Lover') {
              color = '#FF9D40';
            }
            if (d.key === 'Poetic') {
              color = '#37B6CE';
            }
            return color;
           }}
          labelsRadiusMultiplier={1.1}
          onValueMouseOver={v => this.setState({value: v})}
          onSeriesMouseOut={v => this.setState({value: false})}
          width={300}
          height={300}
          //padAngle={0.04}
        >
          {value !== false && <Hint value={value} />}
        </RadialChart>
      </div>
    );
  }
}
