import './Sidebar.css'

export default function Sidebar(props) {
  return (
    <aside className="sidebar">
      {props.children}
    </aside>
  )
}