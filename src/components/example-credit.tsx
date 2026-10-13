export function ExampleCredit() {
  return (
    <aside className="example-credit" aria-label="Website credit">
      <a className="example-credit-link" href="https://xavainf.com">
        Made with <span translate="no">XavaInf</span>
        <svg aria-hidden="true" width="12" height="12" viewBox="0 0 16 16" fill="none">
          <path d="M3 13 13 3M4 3h9v9" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </a>
      <p className="example-credit-note">Demo signup is temporary. No launch notifications are sent.</p>
    </aside>
  );
}
