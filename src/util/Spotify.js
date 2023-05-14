let accessToken;
const clientID = process.env.REACT_APP_CLIENT_ID;
const redirectUri = 'http://localhost:3000/callback';
const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    // I direct the user to Spotify Accounts Service, to get access token in url as the result


    //  check for access token
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    // if the access token and expiration time are in the URL, implement the following steps:
    // Set the access token value
    // Set a variable for expiration time
    // Set the access token to expire at the value for expiration time
    // Clear the parameters from the URL, so the app doesn't try grabbing the access token after it has expired
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      // This clears the parameters, allowing us to grab a new access token when it expires.
      window.setTimeout(() => accessToken = "", expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    console.log(accessToken)
    console.log(term)
    return fetch(`https://api.spotify.com/v1/search?type=artist,track,album&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {

      if (response.ok) {

        return response.json()
      }

    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      console.log(jsonResponse.tracks)
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }))
    })
  },

  // savePlayList(playListName, uris) {
  //   // to save play list, I need: 
  //   // + create a Playlist => Need user_id, play list name
  //   // + add tracks to that Playlist

  //   // get user_id:
  //   fetch(`https://api.spotify.com/v1/me`, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`
  //     }
  //   }).then(response => {
  //     if (response.ok) {
  //       return response.json()
  //     }
  //   }).then(jsonResponse => {
  //     return jsonResponse.id
  //   }).then(user_id => {
  //     console.log(user_id)
  //     fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`
  //       },
  //       body: {
  //         "name": playListName,
  //         "public": false,
  //         "collaborative": true
  //       }
  //     })
  //   }).then(playListResponse => {
  //     console.log(playListResponse)
  //     // const jsonPlayListResponse = playListResponse.json()
  //     // const playlist_id = jsonPlayListResponse.id
  //     // fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
  //     //   method: "POST",
  //     //   headers: {
  //     //     Authorization: `Bearer ${accessToken}`
  //     //   },
  //     //   body: {
  //     //     "uris": uris,
  //     //     "positon": 0,
  //     //   }
  //     // })
  //   })


  // }

  savePlayList(name, trackUris) {
    if (!name || !trackUris.length) {
      return
    }
    // create 3 default variables:
    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    let userId;

    //  make a request that returns user_id
    return fetch(`https://api.spotify.com/v1/me`, { headers: headers })
      .then(response => response.json())
      .then(jsonResponse => {
        userId = jsonResponse.id;
        // create a playlist
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: "POST",
          body: JSON.stringify(
            { name: name }
          )
        }).then(response => response.json()).then(jsonResponse => {
          const playlistid = jsonResponse.id;
          // add tracks to the added playlist
          return fetch(`https://api.spotify.com/v1/playlists/${playlistid}/tracks`, {
            headers: headers,
            method: "POST",
            body: JSON.stringify(
              { uris: trackUris }
            )
          })
        })
      })
  }
}

export default Spotify; 