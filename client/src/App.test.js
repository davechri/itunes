import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import AlbumList from './components/AlbumList';

test('Renders App', () => {
  const { container } = render(<App />);
  expect(container.innerHTML).toMatch('Search for albums by artist name'); 
});

test('Renders AlbumList', () => {
  const albums = {
    
  };
  const { container } = render(<AlbumList albums={albums} />);
  expect(container.innerHTML).toMatch('Search for albums by artist name'); 
});

