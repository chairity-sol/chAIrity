# chAIrity

A skeleton MVP for an AI-powered charity platform on Solana. This repository contains:
- A Solana "donation contract" using Anchor
- A basic Node.js server for the AI-based "need scoring"
- A minimal React frontend for donation flows

## Quick Start

### Prerequisites
- Node.js v16+ (for server and client)
- Yarn or npm
- Rust + Solana CLI + Anchor (for Solana contracts)

### Installation

1. **Solana Contract**
   ```bash
   cd solana-contract
   anchor build
   anchor test
