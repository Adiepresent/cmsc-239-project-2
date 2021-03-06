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

export default class DecadeGender extends Component {
  constructor() {
    super();
    this.state = {
      value: false, // tooltip position
      keyOfInterest: '1950s'

    };
  }

  render() {
    const {value, keyOfInterest} = this.state;
    const {data} = this.props;
    const decades = groupBy(data[0], 'year_bin');
    const mappedDecadess = Object.keys(decades);
    const genders = groupBy(decades[keyOfInterest], 'main_genre');
    const preppedData = Object.keys(genders).map(key => ({key, size: genders[key].length}));

    return (
      <div>
        {(mappedDecadess).map(key => {
          return (<button
          key={key}
          onClick={() => this.setState({keyOfInterest: key})}
          >{key} </button>);
        })}
        <RadialChart
          animation
          innerRadius={100}
          radius={140}
          getAngle={d => d.size}
          colorType="literal"
          getColor={(d, idx) => {
            return 'red';
          }}
          getLabel={d => d.key}
          showLabels={true}
          data={preppedData}
          onValueMouseOver={v => this.setState({value: v})}
          onSeriesMouseOut={v => this.setState({value: false})}
          width={300}
          height={300}
          padAngle={0.04}
        >
          {value !== false && <Hint value={value} />}
        </RadialChart>
      </div>
    );
  }
}
