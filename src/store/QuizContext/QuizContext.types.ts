import type { Action, State } from "../store.types";

export type ContextProps = {
  state: State;
  dispatch: React.Dispatch<Action>;
};
