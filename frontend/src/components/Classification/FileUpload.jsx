import './FileUpload.css';
import addicon from '../../assets/addicon.svg';

export default function FileUpload(props) {

  return (
    <>
    <label htmlFor="file-upload" className="file-upload__label">
      <span>Upload Image</span>
      <img src={addicon}></img>
    </label>
    <input
      id="file-upload"
      className="file-upload__input"
      type="file"
      accept="image/*"
      onChange={props.onImageUpload}
    />
    </>
  )
}