import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import Link from "next/link";
import { nanoid } from "nanoid";

import Repeat from "../components/Repeat";

export interface Interaction {
  __count: number;
  id: number;
  name: string;
  timestamp: number;
}

interface TestCompRendererProps extends React.PropsWithChildren {
  iterationNumber: number;
}

interface TestProcessorProps extends React.PropsWithChildren {
  testId: string;
  numberOfTest: number;
}

interface TesetRunnerProps extends React.PropsWithChildren {
  numberOfTest: number;
  iterationNumber: number;
}

function TestCompRenderer({ iterationNumber, children: TestComponent }: TestCompRendererProps) {
  const { query } = useRouter();
  const iterationResults: Array<number> = [];

  React.useEffect(() => {
    if (iterationResults.length === iterationNumber) {
    }
  });

  function handleRender(
    id: string,
    phase: "mount" | "update",
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number,
    interactions: Set<Interaction>
  ) {
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

function TestProcessor({ testId, numberOfTest, children }: TestProcessorProps) {
  React.useEffect(() => {}, [testId]);

  return <>{children}</>;
}

function TestRunner({ numberOfTest, iterationNumber, children: TestComponent, ...props }: TesetRunnerProps) {
  const { query, pathname } = useRouter();
  const { testId } = query;

  if (typeof TestComponent === "undefined") throw new Error("Pass at least single child into <TestRunner />");
  if (Array.isArray(testId)) throw new Error("You can't run a test with multiple test ids.");

  return typeof testId === "undefined" ? (
    <Link href={{ pathname: pathname, query: { testId: nanoid() } }}>start test</Link>
  ) : (
    <TestProcessor testId={testId} numberOfTest={numberOfTest}>
      <TestCompRenderer iterationNumber={iterationNumber}>{TestComponent}</TestCompRenderer>
    </TestProcessor>
  );
}

export default TestRunner;
