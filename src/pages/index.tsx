import {
  ConnectButton,
  useCurrentAccount,
  useCurrentWallet,
  useSignPersonalMessage,
} from "@mysten/dapp-kit";
import { useEffect } from "react";

export default function Home() {
  const currentAccount = useCurrentAccount();
  const { connectionStatus } = useCurrentWallet();
  const { mutate: signPersonalMessage } = useSignPersonalMessage();

  // After user connects, trigger a message to sign (used for creating JWT on TradePort)
  useEffect(() => {
    (async () => {
      if (currentAccount?.address && connectionStatus === "connected") {
        const msgBytes = new TextEncoder().encode("Hello, world!");
        signPersonalMessage(
          {
            message: msgBytes,
          },
          {
            onSuccess: (signedMessage) => {
              console.log("signedMessage", signedMessage);
              alert("Sign Message Success");
            },
            onError: (error) => {
              console.error("Sign Message Error", error);
            },
          }
        );
      }
    })();
  }, [currentAccount?.address, connectionStatus, signPersonalMessage]);

  return (
    <div>
      <ConnectButton />
    </div>
  );
}
