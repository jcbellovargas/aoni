import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import ProfileButton from "./ProfileButton";

export default function Navbar(){
    return (
      <div class="navbar bg-100 gap-4 p-6">
        <div class="flex-1">
          <a class="btn btn-ghost rounded-full normal-case text-3xl text-primary">aoni</a>
        </div>
        <div class="flex-none">
          <a class="btn btn-primary rounded-full normal-case text-l text-white">explorar</a>
        </div>
        <div class="flex-none">
          <a class="btn btn-primary rounded-full normal-case text-l text-white">conectar wallet</a>
        </div>
        <div class="flex-none gap-2">
          <div class="dropdown dropdown-end">
            
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
              </div>
            </label>
            <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li><a>Ajustes</a></li>
              <li><a>Ver Perfil</a></li>
              <li><a>Cerrar Sesion</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
}