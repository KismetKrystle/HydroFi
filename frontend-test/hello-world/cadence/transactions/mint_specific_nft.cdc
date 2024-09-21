import HydroponicPiece from 0xf8d6e0586b0a20c7 // Replace with your contract address

transaction(recipient: Address, pieceType: UInt8) {
    prepare(acct: AuthAccount) {
        let recipientAccount = getAccount(recipient)

        let collectionRef = recipientAccount.getCapability(/public/HydroponicPieceCollection)
            .borrow<&HydroponicPiece.Collection{NonFungibleToken.CollectionPublic}>()
            ?? panic("Could not get receiver reference to the NFT Collection")

        // Convert UInt8 to PieceType
        let piece = HydroponicPiece.PieceType(rawValue: pieceType) ?? panic("Invalid piece type")

        // Mint the specific NFT
        let nft <- HydroponicPiece.mintNFT(pieceType: piece)

        // Deposit it in the recipient's collection
        collectionRef.deposit(token: <-nft)
    }
}