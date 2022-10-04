import Layout from "../components/Layout";
import "../styles/globals.css";
//neccessary imports for wallet connect and stuff
import "@rainbow-me/rainbowkit/styles.css";
import {getDefaultWallets, RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {chain, configureChains, createClient, WagmiConfig } from "wagmi";
import {infuraProvider} from "wagmi/providers/infura";
import {publicProvider} from "wagmi/providers/public";

//configure chains we would be connecting to
//get infura id
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;
//configure chains we would be connecting to
const { chains, provider } = configureChains(
  [chain.polygon],
  [infuraProvider({infuraId}), publicProvider()]
);
//used toconnect app
const { connectors } =  getDefaultWallets({
  appName: "web3rsvp-frontend",
  chains,
})  
//connect client
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

//wrap application with rainbow kit provider and wagmi config
export default function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
    
  );
}
