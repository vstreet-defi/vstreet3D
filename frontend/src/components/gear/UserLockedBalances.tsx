import { ProgramMetadata, decodeAddress, encodeAddress } from "@gear-js/api";
// import { Button } from "@gear-js/ui";
import { useState, useEffect } from "react";
import { useApi, useAlert, useAccount } from "@gear-js/react-hooks";
import { AnyJson } from "@polkadot/types/types";
import { Heading, Text, Button, Box } from "@chakra-ui/react";
import { state } from "@polkadot/types/interfaces/definitions";
import styles from "../layout/cards/Card.module.scss";

function UserLockedBalances() {
  const { api } = useApi();

  const alert = useAlert();

  const [fullState, setFullState] = useState<any | undefined>({});

  const [walletDecoded, setWalletDecoded] = useState("");
  const lenders = fullState.lenders || [];
  const borrowers = fullState.borrowers || [];
  const { account } = useAccount();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [collateralLocked, setCollateralLocked] = useState();
  const [syntheticLocked, setSyntheticLocked] = useState();

  useEffect(() => {
    if (account && account.address) {
      setWalletAddress(account.address);
      setWalletDecoded(decodeAddress(account.address));
    }
  }, [account]);

  // Add your programID
  const programIDFT =
    "0xe996768dde1010e993d21871214fd6a420063d9dba0ad7a1b6ddc8dcfe56a0de";

  // Add your metadata.txt
  const meta =
    "0001000100000000000104000000010600000000000000010700000079147c000808696f18496e69744654000008016073796e74686574696361737365745f70726f6772616d696404011c4163746f724964000150737461626c65636f696e5f70726f6772616d696404011c4163746f72496400000410106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004000801205b75383b2033325d000008000003200000000c000c0000050300100808696f18416374696f6e000114304465706f73697446756e647304001401107531323800000034576974686472617746756e647304001401107531323800010018426f72726f77040014011075313238000200145265706179040014011075313238000300244c697175696461746504001401107531323800040000140000050700180808696f144576656e740001143846756e64734465706f73697465640000003846756e647357697468647261776e000100304c6f616e426f72726f776564000200284c6f616e526570616964000300384c6f616e4c697175696461746564000400001c0808696f34496f476c6f62616c53746174650000200160746f74616c5f73796e74657469635f6465706f736974656414011075313238000168746f74616c5f737461626c65636f696e5f6465706f736974656414011075313238000124626f72726f776572732001705665633c284163746f7249642c2055736572426f72726f776572293e00011c6c656e646572734001685665633c284163746f7249642c20557365724c656e646572293e0001146c6f616e735c01545665633c284163746f7249642c204c6f616e73293e00012c6c6f616e5f7374617475736401685665633c284163746f7249642c204c6f616e537461747573293e0001406c69717569646974795f7374617475736c017c5665633c284163746f7249642c204c6971756964697479537461747573293e00012c757365725f7374617475737401685665633c284163746f7249642c2055736572537461747573293e00002000000224002400000408042800280808696f3055736572426f72726f77657200001001187374617475732c01284c6f616e5374617475730001286c6f616e616d6f756e74140110753132380001206c7476726174696f30010c753634000124686973746f7269616c3401485665633c28753132382c204c6f616e73293e00002c0808696f284c6f616e5374617475730001081841637469766500000020496e616374697665000100003000000506003400000238003800000408143c003c0808696f144c6f616e730000140108696414011075313238000118616d6f756e7414011075313238000144636f6c6c61746572616c5f616d6f756e74140110753132380001246c74765f726174696f30010c75363400011c636c6f73696e672c01284c6f616e53746174757300004000000244004400000408044800480808696f28557365724c656e64657200000c01187374617475734c0128557365725374617475730001246c69717569646974791401107531323800012c6c6f616e735f676976656e5001705665633c28753132382c204c6971756964697479537461747573293e00004c0808696f28557365725374617475730001081841637469766500000020496e616374697665000100005000000254005400000408145800580808696f3c4c69717569646974795374617475730001081841637469766500000020496e616374697665000100005c00000260006000000408043c006400000268006800000408042c006c000002700070000004080458007400000278007800000408044c00";

  const metadata = ProgramMetadata.from(meta);

  const getState = () => {
    api.programState
      .read({ programId: programIDFT, payload: "" }, metadata)
      .then((result) => {
        setFullState(result.toJSON());
        // alert.success("Successful state");
      })
      .catch(({ message }: Error) => alert.error(message));
  };

  // const getBalance = () => {
  //   const findAccount = (address: string) =>
  //     lenders.find((array: string | any[]) => array.includes(address));

  //   const userData = findAccount(walletDecoded);
  //   setUserStatus(userData[1].liquidity);
  // };
  const getCollateralLocked = () => {
    const findAccount = (address: string) =>
      lenders.find((array: string | any[]) => array.includes(address));

    const userData = findAccount(walletDecoded);

    // Check if userData is defined and has the expected structure
    if (
      userData &&
      userData.length > 1 &&
      userData[1] &&
      userData[1].liquidity !== undefined
    ) {
      setCollateralLocked(userData[1].liquidity);
    } else {
      // Handle the case where userData is not as expected
      setCollateralLocked(undefined); // or any other default value or error handling you prefer
    }
  };

  const getSyntheticlLocked = () => {
    const findAccount = (address: string) =>
      borrowers.find((array: string | any[]) => array.includes(address));

    const userData = findAccount(walletDecoded);

    // Check if userData is defined and has the expected structure
    if (
      userData &&
      userData.length > 1 &&
      userData[1] &&
      userData[1].loanamount !== undefined
    ) {
      setSyntheticLocked(userData[1].loanamount);
    } else {
      // Handle the case where userData is not as expected
      setSyntheticLocked(undefined); // or any other default value or error handling you prefer
    }
  };

  useEffect(() => {
    getState();
    getCollateralLocked();
    getSyntheticlLocked();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullState]);

  return (
    <Box className={styles.Moduleborderwrap}>
      <Box className={styles.modulePositions}>
        <Heading
          bgGradient="linear(to-l, #4FFF4B, #00FFC4 )"
          bgClip="text"
          fontSize="2rem"
          mb="3rem"
        >
          My Positions
        </Heading>
        <Heading fontSize="1rem" color="white">
          {" "}
          USDT LOCKED
        </Heading>
        <Heading fontSize="2rem" color="#00FFC4">
          {collateralLocked}
        </Heading>

        <Heading fontSize="1rem" color="white">
          {" "}
          USDT Available to Borrow
        </Heading>
        <Heading fontSize="2rem" color="#00FFC4">
          {syntheticLocked}
        </Heading>
      </Box>
    </Box>
  );
}

export { UserLockedBalances };
