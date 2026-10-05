import { Newsletter } from "@/components/common/Newsletter";
import lifestyleImg from "@/assets/lifestyle.jpg";
import deskImg from "@/assets/desk.jpg";

export function AboutPage() {
  const chapters = [
    ["01", "OUR PHILOSOPHY", "Own fewer, better things."],
    ["02", "DESIGN", "Every line has a reason."],
    ["03", "MATERIALS", "Chosen to age, not expire."],
    ["04", "EVERYDAY LIFE", "Made for use, not display."],
  ] as const;

  return (
    <div className="about-page">
      <section className="about-hero page-pad">
        <span>ABOUT / MORROW</span>
        <h1>
          Objects for people
          <br />
          <em>who notice things.</em>
        </h1>
      </section>

      <img
        className="about-image"
        src={lifestyleImg}
        alt="Morrow tote carried through modern architecture"
        width={1408}
        height={1808}
      />

      <section className="about-intro page-pad">
        <p>We believe the things closest to us should make the everyday feel considered.</p>
        <div>
          Morrow creates bags, paper goods, and desk objects that are useful without being ordinary—quiet companions for work, travel, and thought.
        </div>
      </section>

      {chapters.map(([n, title, line], i) => (
        <section className="about-chapter page-pad" key={title}>
          <span>{n}</span>
          <h2>{title}</h2>
          <p>{line}</p>
          {i === 1 && <img src={deskImg} alt="Objects in the Morrow design studio" />}
        </section>
      ))}

      <Newsletter />
    </div>
  );
}
