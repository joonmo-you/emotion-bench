import type { Event } from 'utils/bus';
import { ProfilerOnRenderCallback } from 'react';

export class ProfilerOnRenderEvent implements Event {
  public profilerData: Parameters<ProfilerOnRenderCallback>;

  constructor(profilerData: Parameters<ProfilerOnRenderCallback>) {
    this.profilerData = profilerData;
  }
}
