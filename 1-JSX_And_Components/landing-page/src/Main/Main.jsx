import Article from "./Article";
import Hero from "./Hero";
import Features from "./Features/Features";

function Main() {
  return (
    <main>
      <Article id='hero'>
        <Hero />
      </Article>
      <Article id='features'>
        <Features />
      </Article>
    </main>
  );
}

export default Main;
