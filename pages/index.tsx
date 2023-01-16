import styled from "@emotion/styled";

import TestRunner from "../src/bench/TestRunner";

const View = styled.div<{ backgroundColor: string }>`
  widht: 150px;
  height: 150px;
  backgroundcolor: ${(props) => props.backgroundColor};
`;

const StyledHeading = styled.h1<{ color: string }>`
  font-size: 100px;
  color: ${(props) => props.color};
`;

function Home() {
  return (
    <TestRunner numberOfTest={3} iterationNumber={10000}>
      <View backgroundColor={"#".concat(Math.floor(Math.random() * Math.pow(16, 6)).toString(16))}>
        <StyledHeading color={"#".concat(Math.floor(Math.random() * Math.pow(16, 6)).toString(16))}>BOX</StyledHeading>
      </View>
    </TestRunner>
  );
}

export default Home;
