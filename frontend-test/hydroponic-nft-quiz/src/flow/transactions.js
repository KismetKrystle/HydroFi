import * as fcl from "@onflow/fcl";

export async function mintNFT(pieceType) {
  const transactionId = await fcl.mutate({
    cadence: `
      import HydroponicPiece from 0x631e88ae7f1d7c20  // Replace with your contract address

      transaction(pieceType: UInt8) {
        prepare(acct: AuthAccount) {
          let collection = acct.borrow<&HydroponicPiece.Collection>(from: /storage/HydroponicPieceCollection)
              ?? panic("Could not borrow collection")

          let nft <- HydroponicPiece.mintNFT(pieceType: HydroponicPiece.PieceType(rawValue: pieceType)!)
          collection.deposit(token: <-nft)
        }
      }
    `,
    args: (arg, t) => [arg(pieceType, t.UInt8)],
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 999
  });

  return fcl.tx(transactionId).onceSealed();
}