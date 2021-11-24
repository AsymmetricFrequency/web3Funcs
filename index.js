	//librerias
	const web3 = require("@solana/web3.js")
	const bip39 = require("bip39")
	const nacl = require("tweetnacl")
	const fs = require("fs")


	//funcion crear conexion
	function createConnection(url = "https://api.devnet.solana.com"){
        	return new web3.Connection(url)
        	console.log("conexion creada")
	}


	//funcion generar cuenta
	async function generateAccount(){
		//creando 12 palabaras
		const mnemonic = bip39.generateMnemonic()
		//12 palabras a semilla
		const seed = await bip39.mnemonicToSeed(mnemonic)
		//generando par de llaves
		const keyPair = nacl.sign.keyPair(seed.slice(0, 32))
		//creando cuenta web3
		const account = new web3.Account(keyPair.secretKey)
		//guardar llave en archivo
		saveAccount(keyPair.secretKey.toString())

		//consolasos
		console.log("llave publica:")
		console.log(keyPair.publicKey.toString())
		return account
	}


	//funcion guardar llave de apareamiento
	function saveAccount(privateKey){
		
		console.log("llave privada:")
		console.log(privateKey)
		//guardar llave
		fs.writeFile('solkey.key', privateKey, function (err,data) {
		 if (err) {return console.log(err);}
  			console.log(data);
		});

	}


	async function findAssociatedTokenAddress(pub,tokenMintAddress) {
		return (
		  await solanaWeb3.PublicKey.findProgramAddress(
			[
			  pub.toBuffer(),
			  TOKEN_PROGRAM_ID.toBuffer(),
			  tokenMintAddress.toBuffer(),
			],
			SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
		  )
		)[0];
	  }

	async function getToken(publicKey,splToken){

	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////
	generateAccount()

