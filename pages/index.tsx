import { Profiler, ProfilerOnRenderCallback } from 'react';
import Node from '../src/components/Node';

function Home() {
  const handleRender: ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions,
  ) => {
    console.log({
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
      interactions,
    });
  };
  return (
    <div>
      <Profiler id="test" onRender={handleRender}>
        <Node label="test" />
      </Profiler>
    </div>
  );
}

export default Home;
