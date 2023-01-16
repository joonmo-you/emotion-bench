import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { isUndefined } from "@fxts/core";
import { nanoid } from "nanoid";

import Repeat from "../utils/Repeat";

interface TestRendererProps extends React.PropsWithChildren {
  numberOfTest: number;
  iterationNumber: number;
}

interface TesetRunnerProps extends React.PropsWithChildren {
  numberOfTest: number;
  iterationNumber: number;
}

function TestRenderer({ iterationNumber, children: TestComponent }: TestRendererProps) {
  const router = useRouter();
  const { isReady, pathname, query } = router;
  const iterationResults: Array<number> = [];

  React.useEffect(() => {
    if (!isReady) {
      return;
    }

    if (iterationResults.length !== iterationNumber) {
      throw new Error(
        `Expect iteration results to have ${iterationNumber} length  (received: ${iterationResults.length})`
      );
    }

    (async () => {
      const testIndex = Number(router.query.testIndex);
      console.log(iterationResults);
      await router.replace({ pathname, query: { ...query, testIndex: testIndex + 1 } });
    })();
  });

  function handleRender(id: string, phase: "mount" | "update", actualDuration: number) {
    iterationResults.push(actualDuration);
  }

  return (
    <Repeat count={iterationNumber}>
      <React.Profiler id="" onRender={handleRender}>
        {TestComponent}
      </React.Profiler>
    </Repeat>
  );
}

function TestRunner({ numberOfTest, iterationNumber, children: TestComponent, ...props }: TesetRunnerProps) {
  const router = useRouter();
  const { query, pathname } = router;

  const testId = query.testId;
  const testIndex = Number(query.testIndex);

  if (typeof TestComponent === "undefined") throw new Error("Pass at least single child into <TestRunner />");
  if (Array.isArray(testId)) throw new Error("You can't run a test with multiple test ids.");

  if (isUndefined(testId)) {
    return <Link href={{ pathname: pathname, query: { testId: nanoid(), testIndex: 0 } }}>start test</Link>;
  }

  if (numberOfTest === testIndex + 1) {
    // show result
    // router.push("/result");
    return null;
  }

  return (
    <TestRenderer numberOfTest={numberOfTest} iterationNumber={iterationNumber}>
      {TestComponent}
    </TestRenderer>
  );
}

export default TestRunner;
