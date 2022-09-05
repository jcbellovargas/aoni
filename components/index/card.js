export default function Card(props) {
  return(
    <div class="card w-full bg-base-100 shadow-xl transition duration-400 hover:scale-105 hover:bg-white-600">
      <div class="card-body grid grid-rows-3">
        <div>
          <img src={props.img} class="absolute left-8 w-11" alt="Facebook logo"/>
        </div>
        <div>
          <h2 class="card-title">{props.title}</h2>
        </div>
        <div class="text-gray-500">
          <p>{props.body}</p>
        </div>
      </div>
    </div>
  )
}