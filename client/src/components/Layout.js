import React from "react";
import {Search} from 'carbon-components-react';
import styled from "./styled-components/StyledComponent";
import Fetch from './Fetch';
import AlbumList from './AlbumList';
import MessageModal from './MessageModal';

const SearchContainer = styled('div')`
  margin-top: 1rem;
  display: flex;  
  justify-content: center;  
  height: 120px;
`
const SearchContainer2 = styled('div')`
  max-width: 90vw;
  width: 600px;  
`
const SearchHeading = styled('div')`
  font-size: 2rem;
`
const ArtistSearch = styled('div')` 
  margin-top: 1rem;
`
const Scroll = styled('div')`
  height: calc(100vh - 100px);
  overflow: auto;  
`


export default class Layout extends React.Component {
  state = {
    albums: [],
    message: ''
  };

  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  render() {
    return (
      <div>
        <SearchContainer>
          <SearchContainer2>
            <SearchHeading>
              Search for albums by artist name
            </SearchHeading>         
            <ArtistSearch>
              <Search onKeyDown={this.handleKeyDown} 
                      placeHolderText="Type artist name and press enter"
                      labelText=""/>
            </ArtistSearch>
          </SearchContainer2>
        </SearchContainer>  
        <Scroll>
          <AlbumList albums={this.state.albums}>
          </AlbumList>  
        </Scroll> 
        <MessageModal
              message={this.state.message}
              modalClosed={() => this.setState({message: ''})}
        />  
      </div>
    );
  }

  handleKeyDown(e) {
    // Enter key pressed?
    if(e.keyCode === 13) {
      if(e.target.value.length > 0) {
        this.searchMusic(e.target.value);
      }
    }
  }

  searchMusic(artist) {
    Fetch.GET('search', {
      term: artist,
      media: 'music',
      limit: 50
    })
    .then(json => {
      const words = artist.split(' ');
      this.setState({albums: json.results.filter(album => {
        const name = album.artistName.toLowerCase();
        for(let i = 0; i < words.length; ++i) {
          if(name.indexOf(words[i].toLowerCase()) === -1) return false;
        }
        return true;
      })}, error => {
        console.log(error);
      })
    })
    .catch(error => {
      this.setState({message:'Server temporarily unavailable'});
    })
  }
}