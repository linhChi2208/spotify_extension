import './TrackList.css';
import Track from '../Track/Track'


export default function TrackList(props) {
  return (
    <div className="TrackList">
      {props.data.map((track) => {
        return <Track track={track} id={track.id} name={track.name} artist={track.artist} album={track.album} isRemoval={props.isRemoval} onAdd={props.onAdd} onRemove={props.onRemove} />
      })}
    </div>
  )
} 