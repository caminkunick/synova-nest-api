import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import {
  createContext,
  useContext,
  useState,
  type ComponentType,
  type Dispatch,
  type SetStateAction,
} from "react";
import { defaultTheme } from "./default.theme";
import { AnimatePresence } from "motion/react";

export class CoreState {
  en: boolean = true;

  constructor(init?: Partial<CoreState>) {
    Object.assign(this, init);
  }

  Set<T extends keyof CoreState>(key: T, value: CoreState[T]): CoreState {
    return new CoreState({ ...this, [key]: value });
  }
}

const Context = createContext<{
  mobile: boolean;
  state: CoreState;
  setState: Dispatch<SetStateAction<CoreState>>;
}>({
  mobile: false,
  state: new CoreState(),
  setState: () => {},
});

export const connectCore =
  <T extends {}>() =>
  (Comp: ComponentType<T>) =>
  (props: T) => {
    const [state, setState] = useState(new CoreState());
    const mobile = useMediaQuery(defaultTheme().breakpoints.down("sm"));

    return (
      <AnimatePresence>
        <Context.Provider value={{ mobile, state, setState }}>
          <ThemeProvider theme={defaultTheme()}>
            <CssBaseline />
            <Comp {...props} />
          </ThemeProvider>
        </Context.Provider>
      </AnimatePresence>
    );
  };

export const useCore = () => useContext(Context);
