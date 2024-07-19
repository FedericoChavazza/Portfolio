import { ClippyProvider } from "@react95/clippy";
import { AGENTS } from "@react95/clippy";

import Home from "../Home";

const HomeWrapper = () => {
  return (
    <ClippyProvider agentName={AGENTS.CLIPPY}>
      <Home />
    </ClippyProvider>
  );
};

export default HomeWrapper;
