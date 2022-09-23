export default function Card(props) {
  return(
    <div className="card w-full bg-base-100 shadow-xl transition duration-400 hover:scale-105 hover:bg-white-600">
      <div className="card-body grid grid-rows-3">
        <div>
          <img src={props.img} className="absolute left-8 w-11" alt="logo"/>
        </div>
        <div>
          <h2 className="card-title">{props.title}</h2>
        </div>
        <div className="text-gray-500">
          <p>{props.body}</p>
        </div>
      </div>
    </div>
  )
}