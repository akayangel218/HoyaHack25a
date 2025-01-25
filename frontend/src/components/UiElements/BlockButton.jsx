import './BlockButton.css';

export default function BlockButton(props) {
  return (
    <button className="block-button" type={props.type} onClick={props.onClick} style={{backgroundColor: props.backgroundColor, color: props.color }}>{props.text}</button>
  )
}