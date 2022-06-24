## limitless-token-faucet-api-ts

This is the ts-api for the [limitless-token-faucet](https://github.com/limitless-devs/limitless-token-faucet)

This api will let you create token faucets and mint tokens from them. The mint amount is fixed upon creating.

Note: This is still WIP but should work as is.

## Usage

```
import * as fs from 'fs';
import { Keypair } from '@solana/web3.js';
import * as anchor from '@project-serum/anchor';
import { createAssociatedTokenAccount } from '@solana/spl-token';
import {
    createProgramConnection as createProgramFaucet,
    initialize,
    getMintAddress,
    mintToken
} from 'token-faucet-api-ts';
import * as crypto from 'crypto';

async function run() {

    //setup keypair and connection
    var kpJson = JSON.parse(fs.readFileSync("/home/limitlessdev/.config/solana/id.json").toString());
    var kp = Keypair.fromSecretKey(new Uint8Array(kpJson));
    let rpcUrl = "https://api.devnet.solana.com";
    let anchorWallet = new anchor.Wallet(kp);
    let confirmOpts = { commitment: "confirmed" } as anchor.web3.ConfirmOptions;
    let faucetProgram = await createProgramFaucet(rpcUrl, anchorWallet, confirmOpts);

    //initialize token faucet - the signing wallet will become the creator
    //name, decimals, normalized mint amount
    console.log("Creating faucet..")
    let faucetId = crypto.randomBytes(20).toString('hex').slice(0, 5);
    let initRes = await initialize(faucetId, 6, 10_000_000, faucetProgram, confirmOpts);
    console.log("Txid:", initRes);

    //create token account for faucet mint
    let faucetCreator = faucetProgram.provider.publicKey as anchor.web3.PublicKey;
    console.log("Faucet Id:", faucetId)
    console.log("Faucet creator:", faucetCreator.toBase58())
    //in this case the user is the creator
    let faucetUser = faucetProgram.provider.publicKey as anchor.web3.PublicKey;
    let tokenFaucetMintAddress = await getMintAddress(faucetProgram, faucetCreator, faucetId);
    console.log("Faucet mint address:", tokenFaucetMintAddress.toBase58())
    let tokenAddress = await createAssociatedTokenAccount(
        faucetProgram.provider.connection,
        anchorWallet.payer,
        tokenFaucetMintAddress,
        faucetUser,
        confirmOpts
    );
    console.log("User token address:", tokenAddress.toBase58())

    //mint some faucet tokens
    let mintTx = await mintToken(faucetProgram, faucetCreator, faucetId, tokenAddress, confirmOpts);
    console.log("Mint tx", mintTx)
}
run()
```
