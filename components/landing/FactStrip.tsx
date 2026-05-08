const FACTS = [
  ['Data engine', 'Vector · vector.dev'],
  ['Deployment', 'self-hosted · docker'],
  ['Pricing', '$0 · per host · per GB'],
  ['License', 'AGPL-3.0'],
] as const;

export function FactStrip() {
  return (
    <div className="strip">
      <div className="wrap">
        <div className="strip-inner">
          {FACTS.map(([label, value]) => (
            <div className="strip-cell" key={label}>
              <span className="label">{label}</span>
              <span className="val">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
