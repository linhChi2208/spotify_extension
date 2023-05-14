import './Track.css';

export default function Track(props) {
  /*
  Create a method called renderAction that displays a <button> element with - as its contnent if the isRemoval property is true, and a + <button> element if the isRemoval property is false. Set the class name to Track-action.
  */
  const renderAction = () => {
    if (props.isRemoval) {
      return <button className="Track-action" onClick={removeTrack}> - </button>
    } else {
      return <button className="Track-action" onClick={addTrack}> + </button>
    }
  }
  /*Create .addTrack() method in the Track component. Use it to add track to the Track play list */
  const addTrack = () => {
    props.onAdd(props.track)
  }

  const removeTrack = () => {
    props.onRemove(props.track)
  }
  return (
    <div className='Track'>
      <div className="Track-information">
        <h3>{props.name}</h3>
        <p>{props.artist}  | {props.album}</p>
      </div>
      {renderAction()}
    </div>

  )
}