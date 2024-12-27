import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { DonationContract } from "../target/types/donation_contract";
import { expect } from "chai";

describe("donation_contract", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);

  const program = anchor.workspace.DonationContract as Program<DonationContract>;

  it("Can initialize the contract!", async () => {
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
