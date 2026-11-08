import type { BusinessProfile } from "@palawan-site-engine/schemas";

export function Navigation({
  profile,
  navItems
}: {
  profile: BusinessProfile;
  navItems: Array<{ label: string; href: string }>;
}) {
  const name = profile.name.value;
  return (
    <nav aria-label="Primary" className="pse-nav">
      <a className="pse-logo" href="/">
        {name}
      </a>
      <ul className="pse-navlist">
        {navItems.map((item) => (
          <li key={item.href}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
      <details className="pse-mobile">
        <summary>Menu</summary>
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </details>
    </nav>
  );
}
