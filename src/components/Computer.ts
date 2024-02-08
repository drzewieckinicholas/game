import { defineComponent, Types } from 'bitecs';

export const Computer = defineComponent({
  accumulatedTime: Types.ui32,
  timeBetweenActions: Types.ui32,
});
