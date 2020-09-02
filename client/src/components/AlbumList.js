import React from 'react';
import PropTypes from 'prop-types';
import styled from "./styled-components/StyledComponent";
import {StructuredListWrapper, StructuredListHead, StructuredListBody, StructuredListRow, StructuredListCell} from 'carbon-components-react';

const Container = styled(StructuredListWrapper)`
  overflow: auto;
`

export default class MusicList extends React.Component {
  static propTypes = {
    albums: PropTypes.array.isRequired
  }

  render() {
    return (
      <Container>        
        <StructuredListHead>
          <StructuredListRow head>
            <StructuredListCell head>Album Art</StructuredListCell> 
            <StructuredListCell head>Year Released</StructuredListCell> 
            <StructuredListCell head>Artist</StructuredListCell>
            <StructuredListCell head>Song</StructuredListCell>
            <StructuredListCell head>Album</StructuredListCell>             
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          {this.props.albums.map((album) => (
            <StructuredListRow key={album.trackId}>
              <StructuredListCell>
                <img src={album.artworkUrl60} alt="album art"/>
              </StructuredListCell>
              <StructuredListCell>{new Date(album.releaseDate).getFullYear()}</StructuredListCell>
              <StructuredListCell>{album.artistName}</StructuredListCell>
              <StructuredListCell>{album.trackName}</StructuredListCell>
              <StructuredListCell>{album.collectionName}</StructuredListCell>
            </StructuredListRow>
          ))}
        </StructuredListBody>        
      </Container>
    );
  }
}