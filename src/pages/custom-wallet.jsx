import "@suiet/wallet-kit/style.css";
// import { useWallet } from "@suiet/wallet-kit";

<button className="wkit-button">
  <div className="col-span-3 flex justify-center items-center">
    <ConnectButton
      style={{
        background: "linear-gradient(to bottom, #21C1FF 30%, #1B7CE6 70%)",
        alignSelf: "center",
      }}
      className=""
      connectText={
        <div className="wkit-button">
          <img src="logo" alt="" />
          <p>{walletAddress ? walletAddress : "Login"}connect wallet</p>
        </div>
      }
    />
  </div>
</button>;
