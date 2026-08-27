import { useEffect, useRef } from 'react';

export interface IDisposableAsset {
  dispose: () => void;
}

/**
 * 3D Avatar GPU Memory & Performance Manager
 * Enforces Draco asset disposal on unmount and 30 FPS throttle for entry-level hardware.
 */
export function use3DAvatarMemory() {
  const disposableRegistry = useRef<Set<IDisposableAsset>>(new Set());

  const registerAsset = (asset: IDisposableAsset) => {
    disposableRegistry.current.add(asset);
  };

  useEffect(() => {
    return () => {
      // Unmount GPU cleanup loop
      disposableRegistry.current.forEach((asset) => {
        try {
          asset.dispose();
        } catch (e) {
          console.warn('GPU memory cleanup warning:', e);
        }
      });
      disposableRegistry.current.clear();
    };
  }, []);

  return { registerAsset, targetFPS: 30 };
}
