import { useMemo, useState } from 'react';
import SwitchIdContext from './SwitchIdContext.jsx';

const SwitchIdProvider = ({ children }) => {
  const [channelNewId, switchChannelNewId] = useState(false);

  const doSwitchChannelNewId = () => switchChannelNewId(true);
  const dontSwitchChannelNewId = () => switchChannelNewId(false);
  const switchNewChannelIdState = useMemo(() => ({
    channelNewId,
    doSwitchChannelNewId,
    dontSwitchChannelNewId,
  }), [channelNewId]);

  return (
    <SwitchIdContext.Provider value={switchNewChannelIdState}>
      {children}
    </SwitchIdContext.Provider>
  );
};

export default SwitchIdProvider;
