import { config } from "@onflow/fcl";

config()
  .put("accessNode.api", "https://rest-testnet.onflow.org") // Use appropriate network
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")
  .put("app.detail.title", "Hydroponic NFT Quiz")
  .put("app.detail.icon", "https://placekitten.com/g/200/200")
  .put("0xHydroponicPiece", "0x631e88ae7f1d7c20"); // Replace with your contract address