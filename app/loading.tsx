export default function Loading() {
  return (
    <div className="loading-page container" role="status" aria-label="Loading page">
      <span className="visually-hidden">Loading page</span>
      <div className="skeleton skeleton-heading" />
      <div className="skeleton skeleton-line" />
      <div className="skeleton skeleton-line skeleton-line-short" />
      <div className="skeleton skeleton-panel" />
    </div>
  );
}
