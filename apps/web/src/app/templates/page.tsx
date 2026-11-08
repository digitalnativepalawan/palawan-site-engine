import Link from "next/link";
import { demoProfiles, resort01Template, buildResort01Manifest } from "@palawan-site-engine/templates";

const palettes = ["lagoon", "ember", "moss"] as const;
const fontPairs = ["editorial", "contemporary", "minimal"] as const;

export default function TemplatesPage() {
  const manifest = buildResort01Manifest("lagoon", "editorial");
  return (
    <main style={{ padding: "clamp(24px,5vh,80px) clamp(20px,4vw,56px)", maxWidth: 1200, margin: "0 auto" }}>
      <h1>Templates</h1>
      <p>
        One template ships in Phase 1: <strong>{resort01Template.id}</strong> — {resort01Template.name}.{" "}
        All demo data is FICTIONAL.
      </p>

      <section aria-label="Demo sites">
        <h2>Demo sites (2 profiles)</h2>
        <p>
          7 pages each: {manifest.pages.map((p) => p.slug).join(", ")}. Palette and font pair switch at runtime on the
          site page via the sticky dock.
        </p>
        <table>
          <thead>
            <tr>
              <th>Profile</th>
              <th>Rooms</th>
              <th>Gallery images</th>
              <th>Open</th>
            </tr>
          </thead>
          <tbody>
            {demoProfiles.map((profile) => (
              <tr key={profile.id}>
                <td>{profile.name.value}</td>
                <td>{profile.rooms.value.length}</td>
                <td>{profile.images.value["gallery"]?.length ?? 0}</td>
                <td>
                  <Link href={`/sites/${profile.id}/home`}>Open {profile.id} home</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section aria-label="Switch previews">
        <h2>Switch previews</h2>
        <ul>
          {demoProfiles.map((profile) => (
            <li key={profile.id}>
              <Link href={`/sites/${profile.id}/home`}>{profile.id} home</Link> — palettes:{" "}
              {palettes.map((p) => (
                <span key={p}>
                  {p}{" "}
                </span>
              ))}
              — font pairs:{" "}
              {fontPairs.map((f) => (
                <span key={f}>
                  {f}{" "}
                </span>
              ))}
            </li>
          ))}
        </ul>
        <p>
          Use the dock on each site page to switch palettes ({palettes.join(", ")}) and font pairs (
          {fontPairs.join(", ")}), and to switch between the two profiles.
        </p>
      </section>
    </main>
  );
}
