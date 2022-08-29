import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Card from "../components/index/Card"
import Hero from "../components/index/Hero"
import ParticlesContainer from '../components/index/ParticlesContainer'

export default function Home() {

  return (
    <div class={styles.container}>
      <Head>
        <title>AONI</title>
        <meta name="description" content="Aoni crowfunding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main class={styles.main} >
        {/* Hero section */}
        <Hero/>

        {/* Cards section */}
        <section class="p-20 bg-gray-50">
          <div class="grid grid-cols-3 gap-10 place-content-center">
            <Card title="Decentralizado" body="El manejo de fondos se delega a la blockchain de Ethereum, con registros publicos para cualquier usuario" img="eth-svgrepo-com.svg"></Card>
            <Card title="Seguro" body="Los fondos se manejan con un smart contract publico, que aseguran la devolucion de los fondos automaticamente en caso de no cumplir los objetivos" img="lock-svgrepo-com.svg"></Card>
            <Card title="Anonimo" body="No necesitas crear ninguna cuenta ni aportar ningun dato personal para realizar aportes" img="visibility-hide-svgrepo-com.svg"></Card>
          </div>
        </section>
        {/* Example section */}
        <section>
        <div class="mockup-window border bg-base-300">
          <div class="flex justify-center px-4 py-16 bg-base-200">
            <div class="card w-96 bg-base-100 shadow-xl">
              <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
              <div class="card-body">
                <h2 class="card-title">
                  Shoes!
                  <div class="badge badge-secondary">NEW</div>
                </h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                  <div class="badge badge-outline">Fashion</div> 
                  <div class="badge badge-outline">Products</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>

        <ul class="steps steps-vertical">
          <li class="step step-primary">Register asdasdasdasdfsferdgdfgdfgdsfgsdfgdfgdsgfdsgdsgdsfgdsfgdsfgdsfgsdfgdsgdsfgdsfgdsfgdfgdsgfdsgf</li>
          <li class="step step-primary">Choose plan</li>
          <li class="step">Purchase</li>
          <li class="step">Receive Product</li>
        </ul>

      </main>
    </div>
  )
}
