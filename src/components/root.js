import React from 'react';
import {csv, json} from 'd3-fetch';
import DecadeGender from './DecadeGender';
import AllGender from './AllGender';
import DecadeGenre from './DecadeGenre';
import ClusterDecade from './ClusterDecade';
import Example from './barGraph';
// import InstSpeach from './InstSpeach';

const firstBlock = `
There’s a clear difference between modern popular music and older music.
Using billboard’s Hot 100 charts from 1950–2015 and Spotify’s API,
we want to take a closer look at how much popular music has changed since the 1950s and find out what
really distinguishes the music of today from the rest. We want to offer new insights into the components
that make a song great or popular, as well as the evolution of our communities’ taste in music.
In particular, we were interested in dissecting the most popular music in the United States from the 1950s
to present day, for which we were able to find robust, detailed datasets for. Specifically, we want to depict
the dynamic, constantly changing relationship between song popularity and  properties. Our objective
was to answer the following questions: How does the prevalence of these aforementioned components
change throughout the decades? How does genre popularity change over time? What is the relationship
between artist gender and genre?
`;

const secondBlock = `
In recent times, a lot of studies have looked into gender diversity. People want to know the gender makeup of all
the popular songs to understnad if there is corelation between artist's gender and sond popularit, or even
just to see if there is enough diversity in the industy. Recently, a lot of studies have noted that the representatio
of women in "popular" music has been very low. This first visualization gives a snapshot of the
gender divide among artists from every song in the Billboard's top 100 since 1951. We can see that
females occupy the smallest percentage, followed by group and then males.
`;


const thirdBlock = `
Next, we want to breakdown each deace to better understnad if this trend has been consistent
over time. The 1950's are visably the worst for gender diversity in the industry. A Very
large proportion of artists were male. Over time, while the the number of female artists have grown
slightly, the biggest offset to the male dominace has been the growth of groups.
`;

const fourthBlock = `
Moving away from gender, we want to look at other changes to the industry. There have been two
significant changes to the atributes of songs - instrumentalness and speechiness.
With those atributes in mind, there seem to be only two main clusters of songs. The String Lovers
and the Poetics. These are the two main clusters because they represent oppostie ends of the
instrumentalness and speechiness spectrums. Instrumentalness predicts whether a track contains no vocals
Speechiness detects the presence of spoken words in a track.
The String Lovers score high on Instrumentalness but low Speechiness.
This means that artistes in this period tend to favor instruments as opposed to speech.
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
        <h1> An Analysis of Billboard's Top 100 Songs From 1951 - 2015</h1>
        <div className="title">{`By`} </div>
        <div>{firstBlock}</div>
        <AllGender data={data}/>
        <div>{secondBlock}</div>
        <DecadeGender data={data}/>
        <div>{thirdBlock}</div>
        <ClusterDecade data={data}/>
        <div>{fourthBlock}</div>
        <div>{fifthdBlock}</div>

        <Example data={data}/>
        <div>{sixthdBlock}</div>

      </div>
    );
  }
}
RootComponent.displayName = 'RootComponent';
export default RootComponent;
