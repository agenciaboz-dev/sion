export const useSign = () => {
  const signers = ["client", "seller", "sion"]
  const canSign = (signing, signatures) => {
    console.log(signatures)
    console.log(signing)
    if (!signing in signers) {
      console.log("not a valid signer")
      return
    }

    if (signatures.includes(signing)) {
      console.log("already signed by " + signing)
      return
    }

    if (signing == "client" && signatures.length == 0) {
      console.log("client signing")
      return true
    }

    if (signatures.includes(signers[signers.indexOf(signing) - 1])) {
      console.log("not client but signing")
      return true
    }
  }

  return { canSign }
}
