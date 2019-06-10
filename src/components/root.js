import React from 'react';
import {csv, json} from 'd3-fetch';
import DecadeGender from './DecadeGender';
import AllGender from './AllGender';
import DecadeGenre from './DecadeGenre';
import ClusterDecade from './ClusterDecade';
import Example from './barGraph';
import InstSpeach from './InstSpeach';
import BarTwo from './DanceLoudDecade';
import HipHopRockPlot from './rockHipHop.js'

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
Moving away from artist gender, we want to look at other changes in popular song characteristics. In particular,
instrumentalness and speechiness undergo notable shifts over the years that we want to analyze closer here. 
These attributes appear to correlate to two main clusters or groupings of artists: String Lovers and Poetics. 
These two main clusters reflect the opposing ends of the instrumentalness vs. speechiness spectrum. Instrumentalness 
is the measure of how much of a particular track contains no vocals, while speechiness measures the presence of 
spoken words in a track. Evidently, over the last number of decades, Americans have gravitated towards becoming
Poetics who predominantly listen to music with a higher volume of lyrics from previously being String Lovers. You
can observe this stark shift by toggling between the "speechiness" and "instrumentalness" buttons on this visual, 
which reflects this change from the 1950s to 2010s. 
`;

const fourpoint5Block = `
String Lovers score high on Instrumentalness but low on Speechiness. Therefore in this cluster, artists tend to 
favor instruments over pure vocals. Poetics, on the other hand, are the opposite. Once again considering time as 
a variable, we see that most String Lovers appeared on Billboard before the 1990s while the majority of Poetics 
appeared on Billboard's Top 100 after the 1990s.
`;

const fifthdBlock = `
So what happened in the 1990s that might explain this? Specifically, are there any other changes in the music industry during this time? Let's take a look. `;

const sixthdBlock = `
Evidently there were many changes in genres distribution in popular songs over the past seven decades. This information, coupled with our knowledge from earlier about the decline in String Lovers, leads us 
to an interesting observation. From the 2000s to present day, the number of rock bands in the Top 100 dropped 
significantly, making way for a new brand of bands -- Pop bands -- that were generally comprised of a group of 
singers who relied primarily on vocals as opposed to the instrument-heavy genre of rock. Mix in the sharp rise
in Hip Hop during this time, a genre that also incorporates a high volume of vocals and lyrics over a typically
steady beat rather than a collection of instruments like guitars, drumsets and piano, and this dramatic shift
in the 1990s makes far more sense. 
`;

const seventhBlock = `
Through these interactive line graphs we can observe the aforementioned plummeting of Rock music in the Top 100 and
simultaneous rise in Hip Hop. Just by observing the slope of these lines, and furthermore, the area enclosed by the lines
and the the X and Y axes, we can process the sheer magnitude of these shifts (Try hovering over the graphs to highlight
the two genres' respective trends)!
`;

const eighthBlock = `
Finally, we want to see if there is any correlation between mood and decade. As an approximated metric for the mood of
the average American, we chose to trace a combination of Top 100 songs' danceability, energy, and valence, and its evolution
from the 1950s to the 2010.
`;

const finalBlock = `Songs with high valence generally sound more positive (i.e. happy, cheerful, euphoric), whereas 
songs with low valence sound more negative (i.e. sad, depressed, angry). Danceability is defined by how suitable a song is for 
dancing based on a combination of tempo, rhythm stability, and beat strength, with 0.0 being the least danceable and 1.0 the most.
And as for the energy of a song, the higher the value, the more energetic it is. We decided that a combination of these three 
musical elements would be an appropriate metric for measuring mood in general. As evident in this interactive bar chart, 
in which you can toggle between decades to observe changes in Danceability, Energy, and Valence, Americans seem to overall 
listen to songs that correspond to being in a good mood than ever before. 
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
        <h1 style={{fontSize:50}}> An Analysis of Billboard's Top 100 Songs From 1951 - 2015</h1>
        <h3>{`By: Adie Present, Alessa Cross, Shira Eisenberg`}</h3>
          <div>{firstBlock}</div>
        <table className="table">
          <tr>
            <td> {secondBlock} </td>
            <td className="td">
              <AllGender data={data}/>
            </td>
          </tr>
          <tr>
            <td className="td">
              <DecadeGender data={data}/>
            </td>
            <td>{thirdBlock}
            </td>
          </tr> 
          <tr>
            <td>{fourthBlock}
            </td>
            <td className="td">
              <InstSpeach data={data}/>
            </td>
          </tr>
          <tr>
            <td className="td">
              <ClusterDecade data={data}/>
            </td>
            <td>
              {fourpoint5Block}
            </td>
          </tr>
        </table>
          <h2 style={{color:'#404040'}}>{fifthdBlock}</h2>
          <Example data={data}/>
          <div>{sixthdBlock}</div>
          <h1 style={{ color: 'blue', float: 'center'}}> </h1>
          <h1 style={{ color: '#193177', display: 'inline', float: 'center', fontSize: 40}}>Hip Hop </h1>
          <h1 style={{ color: '#404040', display: 'inline', fontSize: 40}}>/</h1>
          <h1 style={{ color: '#79C7E3', display: 'inline', fontSize: 40}}> Rock</h1>
          <h1 style={{ color: '#404040', display: 'inline', fontSize: 40}}> </h1>
        <table>
          <tr>
            <td className="td">{seventhBlock}
            </td>
              <HipHopRockPlot/>
          </tr>
        </table>
        <h1 style={{ fontSize: 50}}> </h1>
        <div><h2 style={{ color: '#404040', float: 'center'}}>{eighthBlock}</h2></div>
        <h1 style={{ fontSize: 50}}> </h1>
        <table>
        <tr>
        <BarTwo data={data}/>
        <td>{finalBlock}</td>
        </tr>
        </table>
      </div>
    );
  }
}
RootComponent.displayName = 'RootComponent';
export default RootComponent;
