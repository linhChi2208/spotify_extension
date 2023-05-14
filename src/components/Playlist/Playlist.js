import './Playlist.css';
import TrackList from '../TrackList/TrackList';
export default function Playlist(props) {
  const handleNameChange = (event) => {
    let newName = event.target.value
    props.onChangeName(newName)
  }
  return (
    <div className="Playlist">
      <input type="text" value={props.playListName} className="Playlist-name" onChange={handleNameChange} />
      <TrackList data={props.playList} isRemoval={true} onRemove={props.onRemove} />
      <button className="Playlist-save" onClick={props.onSave}>SAVE TO SPOTIFY</button>
    </div>
  )
}

