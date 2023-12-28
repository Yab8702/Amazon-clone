import CardClient from "../components/CardClient";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import Section1 from "../components/Section1";
import { data } from "../data";

function Home() {
  return (
    <>
      <Carousel />
      <CardClient
        absolute="lg:absolute"
        top="lg:top-[35%]"
        items={data.card1}
      />
      <br />
      <br />
      <br />
      <CardClient relative="relative" items={data.card2} />
      <Section1
        title="Most wished for in Movies & TV"
        fetchUrl={"/movies.json"}
      />
      <Section1 title="Best Sellers in Books" fetchUrl={"/book.json"} />
      <CardClient relative="relative" items={data.card3} />
      <Section1 title="Top Sellers in Books for you" fetchUrl={"/book.json"} />
      <CardClient relative="relative" items={data.card4} />

      <CardClient relative="relative" items={data.card5} />
      <Footer />
    </>
  );
}

export default Home;
