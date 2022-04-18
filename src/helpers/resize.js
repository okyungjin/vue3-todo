const mobileWidth = 600;

const isMobile = () => window.innerWidth < mobileWidth;

const options = { passive: true };

const onResizeDetector = (f) => window.addEventListener('resize', f, options);

const offResizeDetector = (f) => window.removeEventListener('resize', f);

export {
  isMobile,
  onResizeDetector,
  offResizeDetector,
};
