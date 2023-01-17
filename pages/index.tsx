import { Profiler, ProfilerOnRenderCallback } from 'react';

import Node from 'components/Node';
import { Event, EventBus } from 'utils/bus';
import { ProfilerOnRenderEvent } from 'event/ProfilerOnRenderEvent';

EventBus.toObservable().subscribe((event: Event) => {
  console.log('receive');
  console.log(event);
});

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
    EventBus.post(
      new ProfilerOnRenderEvent([id, phase, actualDuration, baseDuration, startTime, commitTime, interactions]),
    );
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
