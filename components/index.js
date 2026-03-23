// 1. Unified Named Exports (Cleaner & better for IntelliSense)
export { default as MeditationTopDisplay } from "./MeditationTopDisplay/MeditationTopDisplay";
export { default as Tabs } from "./tabs/Tabs";
export { default as About } from "./about/About";
export { default as Footer } from "./footer/Footer";

/**
 * OPTIMIZATION FLAG: 
 * Using "export { default as ... }" directly is more efficient than 
 * importing then exporting separately. It reduces the number of 
 * local variables created during the build process.
 */