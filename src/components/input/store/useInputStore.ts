import {create} from "zustand";

type State = {
  name: string;
}

type Actions = {
  setName: (name: string) => void,
  resetInputStore: () => void
}

const initialState: State = {
  name: "",
}

const useInputStore = create<State & Actions>((set) => ({
  ...initialState,
  setName: (name: string) => { set({name: name})},
  resetInputStore: () => { set(initialState) }
}));

export default useInputStore;
