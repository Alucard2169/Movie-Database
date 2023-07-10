import Image from "next/image";

const LazyBanner = ({ data }) => {
    const { src, alt, width,height } = data;
    return ( 
        <Image src={src} width={width} height={height} alt={alt} />
     );
}
 
export default LazyBanner;