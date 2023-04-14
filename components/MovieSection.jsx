import movieSectionStyle from "../styles/MovieSection.module.css";
import { Roboto_Flex } from "@next/font/google";

const roboto_flex = Roboto_Flex({
  subsets: ["latin"],
  weight: ["300", "500", "700", "800"],
});

const MovieSection = () => {
  return (
    <div
      className={`${movieSectionStyle.movieSection} ${roboto_flex.className}`}
    >
      <h2>Popular Now</h2>
      <div className={movieSectionStyle.movies}>
        <div className={movieSectionStyle.movieCard}>
          <img
            src="https://image.tmdb.org/t/p/original/A4YKFspXozgw8Kk43QitG1o7dg9.jpg"
            alt=""
          />
          <h3>name</h3>
          <div className={movieSectionStyle.lower}>
            <span>2002</span>
            <span>2.4</span>
          </div>
        </div>

        <div className={movieSectionStyle.movieCard}>
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.l7-4TgL7BV9JopVf-_4jFQHaFJ%26pid%3DApi&f=1&ipt=b9aad4b614b490c6b1f82bb2cab8f25000fa428c50550136b08f0f122905523d&ipo=images"
            alt=""
          />
          <h3>name</h3>
          <div className="lower">
            <span>2002</span>
            <span>2.4</span>
          </div>
        </div>

        <div className={movieSectionStyle.movieCard}>
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.OgviVnhDy5O9mIZA4Jjo2QHaK-%26pid%3DApi&f=1&ipt=4dc33f863858f2e3fa4109ff6d59915f8300e8d1e9b0c2c1a560d3d41aaf9466&ipo=images"
            alt=""
          />
          <h3>name</h3>
          <div className="lower">
            <span>2002</span>
            <span>2.4</span>
          </div>
        </div>

        <div className={movieSectionStyle.movieCard}>
          <img
            src="https://image.tmdb.org/t/p/original/A4YKFspXozgw8Kk43QitG1o7dg9.jpg"
            alt=""
          />
          <h3>name</h3>
          <div className="lower">
            <span>2002</span>
            <span>2.4</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieSection;
