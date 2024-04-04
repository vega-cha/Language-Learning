

## Disclaimer

This is a test contract and should not be used in production.


## How to deploy canisters
- Install depedencies
    ```bash
   npm i
    ```

- Start the Local Internet Computer

    ```bash
    dfx start --background --clean
    ```

- Deploy the Ledger Canister

    ```bash
    npm run deploy-ledger
    ```

- Deploy the Internet Identity Canister

    ```bash
    npm run deploy-identity
    ```

- Deploy the DAO Backend Canister

    ```bash
	npm run deploy-backend

    ```

- Deploy the Frontend Canister

    ```bash
    npm run deploy-frontend
    ```

## Minting Tokens to your account

This next step shows how to mint icp tokens from the locally deployed Ledger canister.

- Copy your dfx address from the dao dapp frontend.
    ![mint](./assets/images/mint-image.png)
- Run the mint script.

    ```bash
    # npm run mint:tokens <amount in e8s> <amount> <dfx address>
   npm run mint:tokens 5_0000_0000 0a224323dad30bd7587e33534b54acd43496ff4b0318c4f89edaaa3d50ea7b07
    
    # N/B: This mints 5 ICP tokens from the locally deployed ledger to the address.
    ```
