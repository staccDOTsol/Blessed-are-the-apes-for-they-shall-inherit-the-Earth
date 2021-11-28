import './App.css';
import { useMemo } from 'react';

import Home from './Home';
import * as anchor from '@project-serum/anchor';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
} from '@solana/wallet-adapter-wallets';

import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';

import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui';
import { ThemeProvider, createTheme } from '@material-ui/core';
import { ConfettiProvider } from './confetti';

const theme = createTheme({
  palette: {
    type: 'dark',
  },
});

const candyMachineId = process.env.REACT_APP_CANDY_MACHINE_ID
  ? new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID)
  : undefined;

const fairLaunchId = new anchor.web3.PublicKey(
  process.env.REACT_APP_FAIR_LAUNCH_ID!,
);

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [getPhantomWallet(), getSolflareWallet(), getSolletWallet()],
    [],
  );

  return (
    <ThemeProvider theme={theme}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletDialogProvider>
            <ConfettiProvider>
            <div>
            Handle With Care && Blessed are the apes: for they shall inherit the Earth.
            </div>
            <div>
              Read this for DYOR: https://bit.ly/jare_flp
            </div>

            <div>
              TL;DR: This #FairLaunchProtocol grants each winner 138600 https://solscan.io/token/ELVRweR9SQECBiwXAJLQsFkXW9ME4hKwDD2nRg6QmoBV#holders
            </div>

            <div>
              a href is soooo hard on React, I do nawt UI well.
            </div>
            <div>
              DYOR2: https://linktr.ee/STACCart
            </div>
            <div>
              DYOR3: https://linktr.ee/p33p
            </div>
              <Home
                candyMachineId={candyMachineId}
                fairLaunchId={fairLaunchId}
                connection={connection}
                startDate={startDateSeed}
                txTimeout={txTimeout}
              />
            </ConfettiProvider>
          </WalletDialogProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
  );
};

export default App;
