// import mySecretKey from './id.json';
import { decodeLoan } from '@frakters/nft-lending-v2';
// import { NodeWallet } from '@metaplex/js';
// import { Provider } from '@project-serum/anchor';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { concatMap } from 'rxjs';
import { accountSubscribe } from './account-subscribe';
import { RPC_ENDPOINT } from './constants';
// import { RPC_ENDPOINT } from "./constants";
import { createWebSocket } from './create-websocket';
import { onAccountChange } from './on-account-change';

const myKeypair = new PublicKey("")
const leakedKp = Keypair.fromSecretKey(
  Uint8Array.from([
    208, 175, 150, 242, 88, 34, 108, 88, 177, 16, 168, 75, 115, 181, 199, 242, 120, 4, 78, 75, 19, 227, 13, 215, 184,
    108, 226, 53, 111, 149, 179, 84, 137, 121, 79, 1, 160, 223, 124, 241, 202, 203, 220, 237, 50, 242, 57, 158, 226,
    207, 203, 188, 43, 28, 70, 110, 214, 234, 251, 15, 249, 157, 62, 80,
  ]),
);
// const provider = new Provider(new Connection(RPC_ENDPOINT, "confirmed"), new NodeWallet(leakedKp), Provider.defaultOptions());

// const program = returnAnchorProgram(new PublicKey(""), provider )
const webSocket$ = createWebSocket();



webSocket$
  .pipe(concatMap((ws) => onAccountChange(ws)))
  .subscribe((accountNotification) =>{
    // console.log('result: ', accountNotification.params.result.context)
    // console.log('value: ', accountNotification.params.result.value)
    // let buf = Buffer.from(accountNotification.params.result.value.data)
    // let buf = new Buffer( accountNotification.params.result.value.data[0],  accountNotification.params.result.value.data[1])
    // console.log(buf)
    // console.log(buf.slice(8))
    // const blop = program.coder.accounts.decode("loan", new Buffer( accountNotification.params.result.value.data[0],  accountNotification.params.result.value.data[1]))
    // console.log(blop)
    if (new Buffer(accountNotification.params.result.value.data[0], accountNotification.params.result.value.data[1]).length > 0){
      const blop = decodeLoan(new Buffer( accountNotification.params.result.value.data[0], 
        accountNotification.params.result.value.data[1]), 
        new Connection(RPC_ENDPOINT, "confirmed"), new PublicKey("ESuQdAjueJSARPYsUZnB7nxbWKEPU8ynkRWLrFrGZsLi"))
      console.log(blop) 
    }

  }
  );

webSocket$
  .pipe(concatMap((ws) => accountSubscribe(ws, myKeypair.toBase58())))
  .subscribe();

