import React, { useState, useCallback } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify'


function App() {
  // const data = [
  //   { id: 1, name: "Love story", artist: "Taylor Swift", album: "album1" },
  //   { id: 2, name: "Perfect", artist: "Ed Sheran", album: "album2" }
  // ]
  // const myPlayList = [
  //   { id: 3, name: "Love story play", artist: "Taylor Swift", album: "album1" },
  //   { id: 4, name: "Perfect play", artist: "Ed Sheran", album: "album2" }
  // ]

  const [searchResults, setSearchResults] = useState([]);
  const [playListName, setPlayListName] = useState("New PlayList");
  const [playList, setPlayList] = useState([]);
  // const [searchTerm, setSearchTerm] = useState('');
  const updatePlayListName = (newName) => {
    setPlayListName(newName);
  }

  const addTrack = (track) => {
    let tracks = playList;
    if (tracks.find(savedTrack => track.id === savedTrack.id)) {
      return;
    } else {
      setPlayList([...playList, track])
    }
  }

  const removeTrack = (removeTrack) => {
    let tracks = playList;
    const removeTrackIndex = tracks.findIndex(track => track.id === removeTrack.id);
    if (removeTrackIndex !== undefined) {
      tracks.splice(removeTrackIndex, 1);
      setPlayList([...tracks]);
    } else {
      return
    }
  }


  // Generates an array of uri values called trackURIs from them playlistTracks property.

  // const savePlaylist = () => {
  //   const trackURIs = playList.map(track => track.uri);
  //   Spotify.savePlayList(playListName, trackURIs).then(() => {
  //     setPlayListName("New Playlist");
  //     setPlayList([]);
  //   })
  // }

  const savePlaylist = useCallback(() => {
    const trackUris = playList.map((track) => track.uri);
    Spotify.savePlayList(playListName, trackUris).then(() => {
      setPlayListName("New Playlist");
      setPlayList([]);
    });
  }, [playListName, playList]);

  // const search = (searchTerm) => {
  //   Spotify.search(searchTerm).then(searchResults => {
  //     setSearchResults(searchResults);
  //   })
  // }

  const search = useCallback((searchTerm) => {
    console.log(searchTerm);
    Spotify.search(searchTerm).then(searchResults => {
      return setSearchResults(searchResults)
    });
  }, []);

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults data={searchResults} onAdd={addTrack} />
          <Playlist playListName={playListName} playList={playList} setPlayList={setPlayList} onRemove={removeTrack} onChangeName={updatePlayListName} onSave={savePlaylist} />
        </div>
      </div>
    </div >
  );
}

export default App;
