<div style="text-align: center">
    <img src="https://user-images.githubusercontent.com/12898752/216574956-fcf70588-fa75-4ea2-b255-9c908ae47473.png">
</div>

# Team Archive

Team Archive is a decentralized solution for hosting a company's archives on the Web3.
It leverages IPFS for file storage and FVM blockchain for smart contract logic to provide secure, 
decentralized, and immutable storage for sensitive company data.

## Key Features
* Decentralized file storage on IPFS
* Smart contract logic on the FVM blockchain
* Privacy-focused encryption for files using [lighthouse.storage network](https://www.lighthouse.storage/)
* Access control through ERC-721 tokens

## Benefits
* Increased security and privacy
* Immunity to data breaches and central point of failures
* Transparency and immutability through decentralized storage
* Fine-grained access control through token-gated access

## Getting Started

You can find a fully working and deployed solution at
https://master.d2zd2m35omgw0g.amplifyapp.com/

To start using Team Archive, you will need to have an FVM blockchain wallet, 
and an ERC-721 token that grants access to the archives. If you don't have an ERC-721
token on FVM, just click on "Get a Fake Team Token" and access the Team Archive Demo of this solution. 

We have also provided a script in the `contracts` folder to deploy one ERC-721 sample token to create your personal
Team Archive.

Follow the steps below to create and access your company's archives:
* Connect to the FVM blockchain using your wallet.
* Obtain the ERC-721 token that grants access to the archives, or insert the address of an ERC-721 you already own
* Search through the files or add a new one. Just remember: if you upload a document, all and only
the other members of the team can see it!

## Advanced

You can deploy your solution. Just follow the instruction inside `contracts` folder first,
and then inside `webapp` folder

## Conclusion
Team Archive provides a secure and decentralized solution for companies to store their archives on the Web3 platform. 
With its combination of IPFS for file storage and FVM blockchain for smart contract logic, 
it offers increased security and privacy, as well as transparency and immutability.
Give it a try and take the first step towards a more secure and decentralized future for your company's archives.

## Possible improvements
* enable the ability to delete files (already present in smart contract logic)
* enable the ability to update file name / metadata
* include a meeting platform, to allow also decentralized calls
* integrate in the UI the multi-file loading logic, already implemented in the smart contract. 
That logic allows for hundreds of thousands of documents stored per Archive, without loosing reading performance.
In this way there's no need to rely on central webservers to load old documents.

