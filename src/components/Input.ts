import { defineComponent, Types } from 'bitecs';

export enum Direction {
  Up,
  Right,
  Down,
  Left,
  None,
}

export const Input = defineComponent({
  direction: Types.ui8,
  speed: Types.ui8,
});
