import Head from 'next/head';
import BouteilleLookup from '../components/BouteilleLookup';

export default function Home() {
  return (
    <>
      <Head>
        <title>Cave de Gaël</title>
      </Head>
      <main>
        <BouteilleLookup />
      </main>
    </>
  );
}