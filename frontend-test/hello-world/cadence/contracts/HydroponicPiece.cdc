import NonFungibleToken from 0x631e88ae7f1d7c20

pub contract HydroponicPiece: NonFungibleToken {
    pub var totalSupply: UInt64

    pub event ContractInitialized()
    pub event Withdraw(id: UInt64, from: Address?)
    pub event Deposit(id: UInt64, to: Address?)

    pub enum PieceType: UInt8 {
        pub case pump
        pub case pvc
        pub case lights
        pub case netPot
    }

    pub resource NFT: NonFungibleToken.INFT {
        pub let id: UInt64
        pub let pieceType: PieceType

        init(pieceType: PieceType) {
            self.id = HydroponicPiece.totalSupply
            self.pieceType = pieceType
            HydroponicPiece.totalSupply = HydroponicPiece.totalSupply + 1
        }
    }

    pub resource Collection: NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic {
        pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

        pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
            let token <- self.ownedNFTs.remove(key: withdrawID) ?? panic("NFT not found")
            emit Withdraw(id: token.id, from: self.owner?.address)
            return <- token
        }

        pub fun deposit(token: @NonFungibleToken.NFT) {
            let token <- token as! @HydroponicPiece.NFT
            emit Deposit(id: token.id, to: self.owner?.address)
            self.ownedNFTs[token.id] <-! token
        }

        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
            return (&self.ownedNFTs[id] as &NonFungibleToken.NFT?)!
        }

        init () {
            self.ownedNFTs <- {}
        }

        destroy() {
            destroy self.ownedNFTs
        }
    }

    pub fun createEmptyCollection(): @Collection {
        return <- create Collection()
    }

    pub fun mintNFT(pieceType: PieceType): @NFT {
        return <- create NFT(pieceType: pieceType)
    }

    init() {
        self.totalSupply = 0
        emit ContractInitialized()
    }
}