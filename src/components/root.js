import React from 'react';
import {csv, json} from 'd3-fetch';
import DecadeGender from './DecadeGender';
import AllGender from './AllGender';
import DecadeGenre from './DecadeGenre';
import ClusterDecade from './ClusterDecade';
import Example from './barGraph';
import InstSpeach from './InstSpeach';
import BarTwo from './DanceLoudDecade';

const firstBlock = `
Americans' taste in music has evolved significantly over the past number of decades.
To investigate this evolution at a more granular level, we use a combination of Billboard's 
Hot 100 Charts from 1950 - 2015 and Spotify's API. Using these exhaustive datasets that
trace various attributes of songs throughout the years, we pick apart and isolate several of
them to help us better understand what distinguishes the music of today from the past, as well as
discover novel insights and correlations into the characteristics that make a song popular. 

We decided to dissect the most popular music in the United States from 1950 - 2015 because we 
were able to find the most robust, detailed datasets for this time frame. Our objective is to 
answer the following questions: How does the prevalence of song components -- valence, energy, 
danceability, instrumentalness, speechiness -- change throughout the decades? How does genre 
popularity evolve over time? What is, if any, the relationship between artist gender and genre?
Do we like upbeat music more or less than we ever did? In our quest to answer these questions, 
in this article we isolate and display these assortment musical elements using a variety of 
graphical means. 
`;

const secondBlock = `
First, we want to examine the artist gender breakdown of popular songs to reveal whether there 
is a correlation between artist gender and song popularity, and moreover, to observe gender
diversity trends throughout the years in the industry as a whole. The following visualization 
provides a snapshot of this breakdown based on a compilation of all Billboard Top 100 since 1951. 
Evidently, female artists comprise the smallest percentage, followed by group (a mix of genders)
and then, predominantly male artists.
`;


const thirdBlock = `
Now, we want to analyze this gender distribution amongst artists not only in more detail, but also with the
addition of time as a variable in evaluating how this distirbution interacts with decade. We can visualize
this using the following donut chart, in which you can toggle between decades. The 1950s are ostensibly the 
worst in terms of gender diversity in the industry. Moreover, while the the number of female artists have grown
slightly over time, the biggest offset to the male artist's dominance has not been the rise of female artists,
but rather, the rise of artist groups.
`;

const fourthBlock = `
Moving away from gender, we want to look at other changes to the industry. There have been two
significant changes to the atributes of songs - instrumentalness and speechiness.
With those atributes in mind, there seem to be only two main clusters of songs. The String Lovers
and the Poetics. These are the two main clusters because they represent oppostie ends of the
instrumentalness and speechiness spectrums. Instrumentalness predicts whether a track contains no vocals
Speechiness detects the presence of spoken words in a track.
`;

const fourpoint5Block = `
The String Lovers score high on Instrumentalness but low Speechiness.
This means that artistes in this cluster tend to favor instruments as opposed to speech.
The Poetics are the direct opposite.
They score pretty high in Speechiness but very low on Instrumentalness.

The other interesting thing about these clusters is when they appearon the Billboards Hot 100.
 Most String Lovers appeared on Billboard before the 1990s
 Most Poetics appeared on Billboard after the 1990s.
`;

const fifthdBlock = `
So what happened in 1990 that could explain this? Better yet, are there any other changes in
the music industry that explain why Most String Lovers appeared on Billboard before the 1990s
Most Poetics appeared on Billboard after the 1990s.
`;

const sixthdBlock = `
It seems that there have been many changes to the genres of
popularit over the past 6 decades.
Maybe, the use of instruments dropped mostly because rock bands became less popular.
From the 2000s to present day, the percentage of rock bands dropped significantly making
way for a new brand of bands which were generally made up of ALL singers: Pop bands.
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
    Promise.all([
    json('./data/cleanedgenredata.json'),
    json('./data/averages.json')
    ]).then(data => {
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
        <h1 > An Analysis of Billboard's Top 100 Songs From 1951 - 2015</h1>
        <div className="title">{`By`} </div>
          <div className="blockquote">{firstBlock}</div>
        <table className="table">
          <tr>
            <td className="td blockquote"> {secondBlock} </td>
            <td className="td">
              <AllGender data={data}/>
            </td>
          </tr>
          <tr>
            <td className="td">
              <DecadeGender data={data}/>
            </td>
            <td className="td blockquote">{thirdBlock}
            </td>
          </tr>

          <tr>
            <td className="td blockquote"> {fourthBlock}
            </td>
            <td className="td">
              <InstSpeach data={data}/>
            </td>
          </tr>
          <tr>
            <td className="td">
              <ClusterDecade data={data}/>
            </td>
            <td className="td blockquote">
              {fourpoint5Block}
            </td>
          </tr>
          <tr>
            <td className="td">
              <BarTwo data={data}/>
            </td>
          </tr>
          <tr>
            <td className="td">
              <HipHopRockPlot data={data}/>
          </td>
          </tr>
        </table>
        <div className="question">{fifthdBlock}</div>
        <Example data={data}/>
        <div className="blockquote">{sixthdBlock}</div>

      </div>
    );
  }
}
RootComponent.displayName = 'RootComponent';
export default RootComponent;
