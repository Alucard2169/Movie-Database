import { Roboto_Flex } from "@next/font/google";
import Image from "next/image";
import bannerStyle from "../styles/Banner.module.css";
import logo from "../assets/MDLogo.svg";

const roboto_flex = Roboto_Flex({
  subsets: ["latin"],
  weight: ["300", "500", "700", "800"],
});

const Banner = () => {
  return (
    <div className={bannerStyle.banner}>
      <div className={bannerStyle.text}>
        <h1 className={roboto_flex.className}>Movie & TV Database</h1>
        <span className={roboto_flex.className}>
          Find your Favourite TV Show and Movies
        </span>
      </div>
      <div className={bannerStyle.logo}>
        <p className={roboto_flex.className}>Made with</p>
        <a href="https://www.themoviedb.org/" target="_blank">
          <Image src={logo} alt="themoviedb logo" />
        </a>
      </div>
    </div>
  );
};

export default Banner;
