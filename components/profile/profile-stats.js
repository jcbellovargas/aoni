export default function ProfileStats(props) {
  return(
    <div className="stats shadow">
  
      <div className="stat place-items-center">
        <div className="stat-title">Proyectos</div>
        <div className="stat-value">3</div>
      </div>
      
      <div className="stat place-items-center">
        <div className="stat-title">Total Recaudado</div>
        <div className="stat-value text-secondary">4,200 USDT</div>
      </div>
      
      <div className="stat place-items-center">
        <div className="stat-title">Donaciones totales</div>
        <div className="stat-value">27</div>
      </div>
    
    </div>
  )
}