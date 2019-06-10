import React from 'react';
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

const BarTwo = (props) => {
        return (
            <XYPlot
                width={500}
                height={500}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <LineSeries
                    data={hipHopData}/>
                <LineSeries 
                  data={rockData}/>
            </XYPlot>
      );
}

export default BarTwo;
