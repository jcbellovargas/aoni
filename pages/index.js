import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Card from "../components/index/card"
import Hero from "../components/index/hero"

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>AONI</title>
        <meta name="description" content="Aoni crowfunding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main} >
        {/* Hero section */}
        <Hero />

        {/* Cards section */}
        <section className="p-20 bg-gray-50">
          <div className="grid grid-cols-3 gap-10 place-content-center">
            <Card title="Decentralizado" body="El manejo de fondos se delega a la blockchain de Ethereum, con registros publicos para cualquier usuario" img="eth-svgrepo-com.svg"></Card>
            <Card title="Seguro" body="Los fondos se manejan con un smart contract publico, que aseguran la devolucion de los fondos automaticamente en caso de no cumplir los objetivos" img="lock-svgrepo-com.svg"></Card>
            <Card title="Anonimo" body="No necesitas crear ninguna cuenta ni aportar ningun dato personal para realizar aportes" img="visibility-hide-svgrepo-com.svg"></Card>
          </div>
        </section>
        {/* Example section */}
        <section>
          <div className="grid grid-cols-2 gap-5">
            <ul className="steps steps-vertical">
              <li className="step step-primary">Idea tu proyecto</li>
              <li className="step step-primary">Registrate en nuestra plataforma</li>
              <li className="step">Agrega tu billetera y objetivos de recaudacion</li>
              <li className="step">Publica tu proyecto y empeza a recibir fondos!</li>
            </ul>
            <div className="mockup-window border bg-base-300">
              <div className="flex justify-right px-4 py-16 bg-base-200">
                <div className="card w-96 bg-base-100 shadow-xl">
                  <figure><img src="/newhero.webp" alt="eth" /></figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Tu proyecto!
                      <div className="badge badge-secondary">NUEVO</div>
                    </h2>
                    <p>Todos los detalles de tu proyecto revolucionario.</p>
                    <div className="flex justify-between">
                      <span className="text-lg font-medium text-success dark:text-white">559 USDT</span>
                      <span className="text-lg font-medium text-success dark:text-white">43%</span>
                    </div>

                    <progress className="progress progress-success w-full" value="43" max="100"></progress>
                    <div className="card-actions justify-end">
                      <div className="badge badge-outline">Tech</div>
                      <div className="badge badge-outline">Innovacion</div>
                    </div>
                    <button className="btn btn-secondary rounded-full normal-case mt-10 text-lg text-white">Participar</button>
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
