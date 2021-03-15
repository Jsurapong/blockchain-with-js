const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = "";
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2021", "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let index = 1; index < this.chain.length; index++) {
      const currentBlock = this.chain[index];
      const previousBlock = this.chain[index - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}
let jCoin = new Blockchain();
jCoin.addBlock(new Block(1, "02/01/2021", { amount: 4 }));
jCoin.addBlock(new Block(1, "03/01/2021", { amount: 10 }));
jCoin.addBlock(new Block(1, "04/01/2021", { amount: 11 }));
jCoin.addBlock(new Block(1, "05/01/2021", { amount: 11 }));

jCoin.chain[1].data = { amount: 1000 };

console.log(JSON.stringify(jCoin, null, 4));

console.log("is blockchain valid?" + jCoin.isChainValid());
