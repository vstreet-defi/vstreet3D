import { Container, Flex, Box, Heading, Text, Stack } from "@chakra-ui/react";
import { CardFeatures } from "components/molecules/cards/CardFeatures";
import { Arrow } from "components/atoms/Arrow";
import bg from "../../../assets/images/backgrounds/Services BG 2x.svg";

function Features() {
  return (
    <Container p="0" maxW="100vw" bgGradient="linear(to-l, #121215 ,#284736)">
      <Box
        w="100%"
        bgImg={bg}
        bgRepeat="no-repeat"
        bgPos="center"
        bgSize="cover"
      >
        <Stack
          pl={{ base: "1rem", md: "3rem", xl: "8rem", "2xl": "15rem" }}
          pr={{ base: "1rem" }}
          align="center"
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: "column", md: "row" }}
        >
          <Flex
            flex={1}
            justify="center"
            align="center"
            position="relative"
            w="100%"
            flexDir="column"
          >
            <Heading
              bgGradient="linear(to-b, #00FFC4, #4FFF4B)"
              bgClip="text"
              fontSize={{ base: "3rem", sm: "5rem", lg: "48px" }}
              fontWeight="extrabold"
              fontFamily={"'Roboto Mono', monospace"}
            >
              Make your staked $VARA liquid
            </Heading>
            <Text
              color="#ffffff"
              mr={{ md: "2rem", lg: "8rem" }}
              mt="2rem"
              fontSize={{ md: "12px", lg: "16px" }}
              fontFamily={"'Roboto Mono', monospace"}
              fontWeight="thin"
              textAlign="justify"
            >
              Leverage your staked $VARA as collateral for stablecoin borrowing.
              <br /> <br></br>
              Our streamlined platform offers secure, transparent lending,
              giving you the flexibility to enhance your investment strategies
              effectively.
            </Text>
          </Flex>

          <Stack
            flex={1}
            spacing={{ base: 5, md: 10 }}
            mr={{ md: "0", lg: "8rem" }}
          >
            <Flex flexDir="column" alignItems="center">
              <CardFeatures title="Stake Vara" w="9rem" />
              <Arrow />
              <CardFeatures title="LST $Vara as Collateral" w="15rem" />
              <Arrow />
              <CardFeatures title="Borrow Stable Coins" w="13rem" />
              <Arrow />
              <CardFeatures title="DeFi Strategy Legos" w="12rem" />
            </Flex>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}

export { Features };
