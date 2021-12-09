#! usr/bin/env node

require('dotenv').config();

const { BlobServiceClient } = require("@azure/storage-blob")
const storageAccountConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const blobServiceClient = BlobServiceClient.fromConnectionString(storageAccountConnectionString);


async function main(){
	const containerName = 'photos';
	const containerClient = blobServiceClient.getContainerClient(containerName);
	const createContainerResponse = await containerClient.createIfNotExists();
	console.log(`Create container ${containerName} successfully`, createContainerResponse.succeeded);
	
	const filename = 'docs-and-friends-selfie-stick.png';
	const blockBlobClient = containerClient.getBlockBlobClient(filename);
	blockBlobClient.uploadFile(filename);
	
}

main()

