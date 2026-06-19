import { useEffect, useState, useCallback } from 'react';
import { pwaService } from '@services/pwa.service';

export function usePWA() {
  const [state, setState] = useState({
    isStandalone: pwaService.isStandalone,
    isInstallable: pwaService.isInstallable,
    isInstalled: pwaService.isInstalled,
  });

  useEffect(() => {
    const unsub = pwaService.subscribe(() => {
      setState({
        isStandalone: pwaService.isStandalone,
        isInstallable: pwaService.isInstallable,
        isInstalled: pwaService.isInstalled,
      });
    });
    return unsub;
  }, []);

  const install = useCallback(async () => {
    return pwaService.install();
  }, []);

  return { ...state, install };
}

export default usePWA;
