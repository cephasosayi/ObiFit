# SKILL: 3D Graphics Memory & GPU Garbage Collection

## Context & Objectives

Maintain 60 FPS performance for 3D demonstrator avatars while preventing GPU memory leaks on budget smartphones.

## Execution Rules

1. **Asset Compression Rules:**
   - All 3D avatar animations (GLTF/GLB) must be Draco-compressed and capped at **< 5 MB** per exercise file.

2. **Explicit Memory Cleanup on Unmount:**
   - In React component cleanup effects (`useEffect` unmount), explicitly dispose of Three.js / Skia assets:
     ```typescript
     geometry.dispose();
     material.dispose();
     texture.dispose();
     renderer.dispose();
     ```

3. **Frame-Rate Throttling:**
   - Limit animation frame loops to 30 FPS on devices identified as entry-level/low-spec hardware.
