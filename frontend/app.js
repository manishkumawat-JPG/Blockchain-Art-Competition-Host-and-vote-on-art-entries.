// Set up Web3 connection and contract interaction
const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
let artCompetitionContract;
const contractAddress = '0xAe5E801b3243c92CB3851789Fc4FD0cF8C8B1C33 '; // Replace with your deployed contract address
const contractABI = [ [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "artId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "artist",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			}
		],
		"name": "ArtEntryAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "voter",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "artId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "totalVotes",
				"type": "uint256"
			}
		],
		"name": "Voted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ipfsHash",
				"type": "string"
			}
		],
		"name": "addArtEntry",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "artEntries",
		"outputs": [
			{
				"internalType": "address",
				"name": "artist",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "votes",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getArtEntriesCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_artId",
				"type": "uint256"
			}
		],
		"name": "getArtEntry",
		"outputs": [
			{
				"internalType": "address",
				"name": "artist",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "votes",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWinner",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "winningArtId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "maxVotes",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "organizer",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_artId",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "votesPerVoter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]/* Contract ABI goes here */ ]; // Replace with your contract's ABI

const organizerAddress = 'YOUR_ORGANIZER_ADDRESS'; // Replace with the organizer's address if needed
const account = web3.eth.accounts[0];

window.addEventListener('load', () => {
    // Initialize the contract
    artCompetitionContract = new web3.eth.Contract(contractABI, contractAddress);
    displayArtEntries();
    displayWinner();
    
    // Handle the add art form submission
    document.getElementById('addArtForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const title = document.getElementById('artTitle').value;
        const description = document.getElementById('artDescription').value;
        const ipfsHash = document.getElementById('ipfsHash').value;
        
        try {
            const tx = await artCompetitionContract.methods.addArtEntry(title, description, ipfsHash).send({ from: account });
            alert('Art entry added!');
            displayArtEntries();
        } catch (error) {
            console.error('Error adding art entry:', error);
        }
    });

    // Handle voting form submission
    document.getElementById('voteForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const artId = document.getElementById('artId').value;
        
        try {
            const tx = await artCompetitionContract.methods.vote(artId).send({ from: account });
            alert('Vote submitted!');
            displayArtEntries();
        } catch (error) {
            console.error('Error voting:', error);
        }
    });
});

// Fetch and display all art entries
async function displayArtEntries() {
    const artEntriesList = document.getElementById('artEntriesList');
    artEntriesList.innerHTML = ''; // Clear current entries
    
    const artEntriesCount = await artCompetitionContract.methods.getArtEntriesCount().call();
    
    for (let i = 0; i < artEntriesCount; i++) {
        const artEntry = await artCompetitionContract.methods.getArtEntry(i).call();
        const artElement = document.createElement('div');
        artElement.classList.add('artEntry');
        artElement.innerHTML = `
            <h3>${artEntry.title}</h3>
            <p>${artEntry.description}</p>
            <img src="https://ipfs.infura.io/ipfs/${artEntry.ipfsHash}" alt="Art Image">
            <p>Votes: ${artEntry.votes}</p>
        `;
        artEntriesList.appendChild(artElement);
    }
}

// Fetch and display the winner
async function displayWinner() {
    const winnerDetails = document.getElementById('winnerDetails');
    const [winningArtId, maxVotes] = await artCompetitionContract.methods.getWinner().call();
    const winner = await artCompetitionContract.methods.getArtEntry(winningArtId).call();
    winnerDetails.innerHTML = `
        <p>Winner: ${winner.title}</p>
        <p>Artist: ${winner.artist}</p>
        <p>Votes: ${maxVotes}</p>
    `;
}
