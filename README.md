# Blockchain Art Competition Smart Contract

## Table of Contents

- [Project Title](#project-title)
- [Project Description](#project-description)
- [Project Vision](#project-vision)
- [Future Scope](#future-scope)
- [Key Features](#key-features)

## Project Title

Blockchain Art Competition: Host and vote on art entries.

## Project Description

The Blockchain Art Competition is a decentralized platform where artists can submit their artwork and users can vote on their favorite art entries. Each artwork is represented as an on-chain entry with details such as title, description, and an IPFS hash link to the artwork. The competition allows users to vote once per art entry, and the artwork with the most votes will be declared the winner.

## Project Vision

The vision of this project is to provide a transparent, decentralized space where artists can showcase their work and engage with a community that actively supports their art. By leveraging blockchain technology, the competition ensures the integrity of the voting process and the ownership of artwork.

## Future Scope

The project can be extended by adding features such as:
- Rewards for winners (e.g., token payouts or NFTs).
- Enhanced voting system (e.g., weighted voting, multiple rounds).
- Integration with popular art platforms (like OpenSea).
- Smart contract upgrades for more functionalities (e.g., community-driven art curation).
- Ability for users to donate funds to the competition or to their favorite artist.

## Key Features

- **Submit Art**: Artists can submit their artwork by providing a title, description, and IPFS hash pointing to the artwork.
- **Vote on Art**: Users can vote once per art entry, helping to decide the competition's winner.
- **View Entries**: Anyone can view the list of art entries, along with their descriptions and the number of votes received.
- **Declare Winner**: The entry with the highest number of votes is automatically declared the winner.

## How to Deploy and Interact

1. **Deploy the contract**:
    - Use a platform like Remix IDE or Hardhat to deploy the contract to an Ethereum-based network.
    - Ensure you have enough ETH for gas fees.

2. **Interacting with the contract**:
    - Add new art entries using the `addArtEntry` function.
    - Users can vote for their favorite art by calling the `vote` function.

## License

This project is licensed under the MIT License.
