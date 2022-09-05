export default function CategoriesTab(props){
  return(
    <>
      <div className="tabs tabs-boxed justify-center bg-base-100 pt-10 pb-20">
        <a className="tab  tab-lg">Salud</a>
        <a className="tab tab-lg">Tecnologia</a>
        <a className="tab tab-lg">Moda</a> 
        <a className="tab tab-lg tab-active">Negocios</a> 
        <a className="tab tab-lg">Juegos</a>
        <a className="tab tab-lg">Arte</a>
        <a className="tab tab-lg">Emergencia</a>
        <a className="tab tab-lg">Comida</a>
        <a className="tab tab-lg">Redes Sociales</a>
      </div>
    </>
  )
}