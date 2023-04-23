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
            <Card title="Decentralized" body="Funds management is delegated to the Ethereum blockchain, with public records for any user." img="eth-svgrepo-com.svg"></Card>
            <Card title="Secure" body="Funds are managed through a public smart contract that automatically ensures the return of funds if the objectives are not met." img="lock-svgrepo-com.svg"></Card>
            <Card title="Anonymous" body="You don't need to create any account or provide any personal information to make contributions." img="visibility-hide-svgrepo-com.svg"></Card>
          </div>
        </section>
        {/* Example section */}
        <section>
          <div className="grid grid-cols-2 gap-5">
            <ul className="steps steps-vertical">
              <li className="step step-primary">Come up with a new project idea</li>
              <li className="step step-primary">Sign up for our platform</li>
              <li className="step">Add your wallet and project goals</li>
              <li className="step">Publish your project and start receiving funds!</li>
            </ul>
            <div className="mockup-window border bg-base-300">
              <div className="flex justify-right px-4 py-16 bg-base-200">
                <div className="card w-96 bg-base-100 shadow-xl">
                  <figure><img src="/newhero.webp" alt="eth" /></figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Your Project!
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>All the details of your revolutionary project.</p>
                    <div className="flex justify-between">
                      <span className="text-lg font-medium text-success dark:text-white">559 USDT</span>
                      <span className="text-lg font-medium text-success dark:text-white">43%</span>
                    </div>

                    <progress className="progress progress-success w-full" value="43" max="100"></progress>
                    <div className="card-actions justify-end">
                      <div className="badge badge-outline">Tech</div>
                      <div className="badge badge-outline">Innovation</div>
                    </div>
                    <button className="btn btn-secondary rounded-full normal-case mt-10 text-lg text-white">Donate</button>
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
