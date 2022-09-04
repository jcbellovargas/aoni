import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Card from "../components/index/card"
import Hero from "../components/index/hero"
import ParticlesContainer from '../components/index/particles-container'

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
        <div class="grid grid-cols-2 gap-5">
          <ul class="steps steps-vertical">
            <li class="step step-primary">Idea tu proyecto</li>
            <li class="step step-primary">Registrate en nuestra plataforma</li>
            <li class="step">Agrega tu billetera y objetivos de recaudacion</li>
            <li class="step">Publica tu proyecto y empeza a recibir fondos!</li>
          </ul>
          <div class="mockup-window border bg-base-300">
            <div class="flex justify-right px-4 py-16 bg-base-200">
              <div class="card w-96 bg-base-100 shadow-xl">
                <figure><img src="https://ethereum.org/static/28214bb68eb5445dcb063a72535bc90c/9019e/hero.webp" alt="Shoes" /></figure>
                <div class="card-body">
                  <h2 class="card-title">
                    Tu proyecto!
                    <div class="badge badge-secondary">NUEVO</div>
                  </h2>
                  <p>Todos los detalles de tu proyecto revolucionario.</p>
                  <div class="flex justify-between">
                    <span class="text-lg font-medium text-success dark:text-white">559 USDT</span>
                    <span class="text-lg font-medium text-success dark:text-white">43%</span>
                  </div>

                  <progress class="progress progress-success w-full" value="43" max="100"></progress>
                  <div class="card-actions justify-end">
                    <div class="badge badge-outline">Tech</div>
                    <div class="badge badge-outline">Innovacion</div>
                  </div>
                  <button class="btn btn-secondary rounded-full normal-case mt-10 text-lg text-white">Participar</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        </section>

      </main>
    </div>
  )
}
