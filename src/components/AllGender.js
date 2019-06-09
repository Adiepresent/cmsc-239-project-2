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

export default class AllGender extends Component {
  constructor() {
    super();
    this.state = {
      value: false, //tooltip position
      keyOfInterest: 'Gender'//button
    };
  }

  render() {
    const {value} = this.state;
    const {data} = this.props;
    const genders = groupBy(data[0], 'Gender');
    const preppedData = Object.keys(genders).map(key => ({key, size: genders[key].length}));

    return (
      <div>
        <RadialChart
          animation
          innerRadius={100}
          radius={140}
          getAngle={d => d.size}
          //colorType="literal"
        //  getColor={(d, idx) => {
          //  return 'red';
        //  }}
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
