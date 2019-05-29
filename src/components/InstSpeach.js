// import React, {Component} from 'react';
//
// import {Hint} from 'react-vis';
//
// import {
//   XYPlot,
//   XAxis,
//   YAxis,
//   VerticalGridLines,
//   HorizontalGridLines,
//   VerticalBarSeries,
//   VerticalBarSeriesCanvas,
//   LabelSeries
// } from 'react-vis';
//
// function groupBy(data, key) {
//   return data.reduce((acc, row) => {
//     if (!acc[row[key]]) {
//       acc[row[key]] = [];
//     }
//     acc[row[key]].push(row);
//     return acc;
//   }, {});
// }
//
// function oneDecade(oneDecades, accessorKey) {
//   let sumres = 0;
//   let countres = 0;
//   const array = [];
//   oneDecades.forEach(d => {
//     sumres = sumres + Number(d[accessorKey]);
//     array.push(Number(d[accessorKey]));
//     countres += 1;
//   });
//   const meanres = sumres / countres;
//   return meanres;
// }
//
//
// export default class InstSpeach extends Component {
//   constructor() {
//     super();
//     this.state = {
//       value: false,
//       keyOfInterest: 'Poetic'
//
//     };
//   }
//
//
//     render() {
//       const {value, keyOfInterest} = this.state;
//       const {data} = this.props;
//       const BarSeries = value ? VerticalBarSeriesCanvas : VerticalBarSeries;
//       const clusters = groupBy(data, 'cluster');
//       const mappedCluster = Object.keys(clusters).map(key => ({key, data: clusters[key]}))
//
// // proff that having buttons for poetics will work
//       const avginst = oneDecade(clusters['Poetic'], 'instrumentalness');
//       const avginst2 = oneDecade(clusters['String Lover'], 'instrumentalness');
//       const avgpo = oneDecade(clusters['Poetic'], 'speechiness');
//       const avgpo2 = oneDecade(clusters['String Lover'], 'speechiness');
//
//       const inst = oneDecade(clusters[keyOfInterest], 'instrumentalness');
//       const speech = oneDecade(clusters[keyOfInterest], 'speechiness');
//
//
//
//
//       return (
//         <div>
//           {(mappedCluster).map(key => {
//             return (<button
//             key={key}
//             onClick={() => this.setState({keyOfInterest: key})}
//             >{key} </button>);
//           })}
//           <XYPlot xType="ordinal" width={300} height={300} xDistance={100}>
//             <VerticalGridLines />
//             <HorizontalGridLines />
//             <XAxis />
//             <YAxis />
//             <BarSeries className="vertical-bar-series-example" data={greenData} />
//             <BarSeries data={blueData} />
//             <LabelSeries data={labelData} getLabel={d => d.x} />
//           </XYPlot>
//
//         </div>
//
//       );
//     }
//   }
