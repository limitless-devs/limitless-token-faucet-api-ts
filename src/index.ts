import * as anchor from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { TokenFaucet, IDL } from './token_faucet';
const PROGRAM_ID = "3jNRmXFcRMhgubd5mec267q8AwxSMhxLHumzrp1QNnpT"

export async function createProgramConnection(
    rpcUrl: string,
    anchorWallet: anchor.Wallet,
    confirmOpts: anchor.web3.ConfirmOptions
): Promise<anchor.Program<TokenFaucet>> {
    const solConnection = new anchor.web3.Connection(rpcUrl);
    const provider = new anchor.AnchorProvider(solConnection, anchorWallet, confirmOpts);
    const idl = IDL as TokenFaucet;
    const program = new anchor.Program<TokenFaucet>(idl, new anchor.web3.PublicKey(PROGRAM_ID), provider);
    return program as anchor.Program<TokenFaucet>
}

export async function initialize(
    faucetId: string,
    decimals: number,
    mintQuantityNormalized: number,
    program: anchor.Program<TokenFaucet>,
    confirmOpts: anchor.web3.ConfirmOptions
) : Promise<string> {
    if (program.provider.publicKey) {
        let [tokenFaucetAddress, tokenFaucetBump] = await anchor.web3.PublicKey.findProgramAddress(
            [program.provider.publicKey?.toBuffer(), Buffer.from(faucetId)],
            program.programId
        );
        let [tokenFaucetMintAddress, tokenFaucetMintBump] = await anchor.web3.PublicKey.findProgramAddress(
            [tokenFaucetAddress.toBuffer(), Buffer.from("faucet_mint")],
            program.programId
        );
        const tx = await program.methods
            .initializeTokenFaucet(faucetId, decimals, new anchor.BN(mintQuantityNormalized))
            .accounts({
                creator: program.provider.publicKey,
                tokenFaucet: tokenFaucetAddress,
                tokenMint: tokenFaucetMintAddress,
                tokenProgram: TOKEN_PROGRAM_ID,
                systemProgram: anchor.web3.SystemProgram.programId,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY
            })
            .rpc(confirmOpts);
        return tx;
    } else {
        throw { msg: "Must have a creator addresss!" }
    }
}

export async function getMintAddress(
    program: anchor.Program<TokenFaucet>,
    faucetCreator: anchor.web3.PublicKey,
    faucetId: string,
): Promise<anchor.web3.PublicKey> {
    let [tokenFaucetAddress, tokenFaucetBump] = await anchor.web3.PublicKey.findProgramAddress(
        [faucetCreator.toBuffer(), Buffer.from(faucetId)],
        program.programId
    );
    let [tokenFaucetMintAddress, tokenFaucetMintBump] = await anchor.web3.PublicKey.findProgramAddress(
        [tokenFaucetAddress.toBuffer(), Buffer.from("faucet_mint")],
        program.programId
    );
    return tokenFaucetMintAddress;
}

export async function mintToken(
    program: anchor.Program<TokenFaucet>,
    faucetCreator: anchor.web3.PublicKey,
    faucetId: string,
    userTokenAddress: anchor.web3.PublicKey,
    confirmOpts: anchor.web3.ConfirmOptions
): Promise<string> {
    let [tokenFaucetAddress, tokenFaucetBump] = await anchor.web3.PublicKey.findProgramAddress(
        [faucetCreator.toBuffer(), Buffer.from(faucetId)],
        program.programId
    );
    let [tokenFaucetMintAddress, tokenFaucetMintBump] = await anchor.web3.PublicKey.findProgramAddress(
        [tokenFaucetAddress.toBuffer(), Buffer.from("faucet_mint")],
        program.programId
    );
    const tx = await program.methods.tokenSip(faucetId)
        .accounts({
            user: program.provider.publicKey,
            creator: faucetCreator,
            tokenFaucet: tokenFaucetAddress,
            tokenMint: tokenFaucetMintAddress,
            userTokenAccount: userTokenAddress,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: anchor.web3.SystemProgram.programId,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            clock: anchor.web3.SYSVAR_CLOCK_PUBKEY
        }).rpc(confirmOpts);
    return tx;
}








