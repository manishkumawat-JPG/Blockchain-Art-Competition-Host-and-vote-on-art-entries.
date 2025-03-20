// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ArtCompetition {
    struct ArtEntry {
        address artist;
        string title;
        string description;
        string ipfsHash; // IPFS link to the artwork
        uint256 votes;
    }

    address public organizer;
    ArtEntry[] public artEntries;
    mapping(address => bool) public voters;
    mapping(address => uint256) public votesPerVoter;

    event ArtEntryAdded(uint256 artId, address artist, string title, string ipfsHash);
    event Voted(address indexed voter, uint256 artId, uint256 totalVotes);

    modifier onlyOrganizer() {
        require(msg.sender == organizer, "Only the organizer can perform this action.");
        _;
    }

    modifier hasNotVoted() {
        require(!voters[msg.sender], "You have already voted.");
        _;
    }

    constructor() {
        organizer = msg.sender;
    }

    // Add art entry to the competition
    function addArtEntry(string memory _title, string memory _description, string memory _ipfsHash) public {
        artEntries.push(ArtEntry({
            artist: msg.sender,
            title: _title,
            description: _description,
            ipfsHash: _ipfsHash,
            votes: 0
        }));
        emit ArtEntryAdded(artEntries.length - 1, msg.sender, _title, _ipfsHash);
    }

    // Vote for an art entry
    function vote(uint256 _artId) public hasNotVoted {
        require(_artId < artEntries.length, "Invalid art ID.");
        
        voters[msg.sender] = true;
        artEntries[_artId].votes += 1;
        votesPerVoter[msg.sender] = _artId;

        emit Voted(msg.sender, _artId, artEntries[_artId].votes);
    }

    // Get the total number of art entries
    function getArtEntriesCount() public view returns (uint256) {
        return artEntries.length;
    }

    // Get the details of a specific art entry
    function getArtEntry(uint256 _artId) public view returns (address artist, string memory title, string memory description, string memory ipfsHash, uint256 votes) {
        require(_artId < artEntries.length, "Invalid art ID.");
        ArtEntry storage entry = artEntries[_artId];
        return (entry.artist, entry.title, entry.description, entry.ipfsHash, entry.votes);
    }

    // Get the winner of the competition
    function getWinner() public view returns (uint256 winningArtId, uint256 maxVotes) {
        uint256 highestVotes = 0;
        uint256 winningId = 0;
        for (uint256 i = 0; i < artEntries.length; i++) {
            if (artEntries[i].votes > highestVotes) {
                highestVotes = artEntries[i].votes;
                winningId = i;
            }
        }
        return (winningId, highestVotes);
    }
}
