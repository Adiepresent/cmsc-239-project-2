import React from 'react';
import {csv, json} from 'd3-fetch';
import DecadeGender from './DecadeGender';
import AllGender from './AllGender';
import DecadeGenre from './DecadeGenre';
import ClusterDecade from './ClusterDecade';
import Example from './barGraph';
// import InstSpeach from './InstSpeach';

const longBlock = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

class RootComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      loading: true
    };
  }

  componentWillMount() {
    json('./data/cleanedgenredata.json')
      .then(data => {
        this.setState({
          data,
          loading: false
        });
      });
  }

  render() {
    const {loading, data} = this.state;
    if (loading) {
      return <h1>LOADING</h1>;
    }
    return (
      <div className="relative">
        <h1> Hello Explainable!</h1>
        <div>{`The example data was loaded! There are ${data.length} rows`}</div>
        <AllGender data={data}/>
        <div>{longBlock}</div>
        <DecadeGender data={data}/>
        <div>{longBlock}</div>
        <DecadeGenre data={data}/>
        <ClusterDecade data={data}/>
        <Example data={data}/>

      </div>
    );
  }
}
RootComponent.displayName = 'RootComponent';
export default RootComponent;
