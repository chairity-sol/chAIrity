use anchor_lang::prelude::*;

declare_id!("BPFLoaderUpgradeab1e11111111111111111111111"); // Replace with your actual program ID

#[program]
pub mod donation_contract {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Donation contract initialized");
        Ok(())
    }

    // Example: a simple "donate" function
    pub fn donate(ctx: Context<Donate>, amount: u64) -> Result<()> {
        let donation_account = &mut ctx.accounts.donation_account;
        donation_account.total_donations += amount;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct Donate<'info> {
    #[account(mut)]
    pub donation_account: Account<'info, DonationAccount>,
}

#[account]
pub struct DonationAccount {
    pub total_donations: u64,
}
