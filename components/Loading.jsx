import loadingStyle from '@/styles/loading.module.css';
import { Dna } from "react-loader-spinner";
const Loading = () => {
    return (
      <div className={loadingStyle.loadingPage}>
        <Dna
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
                wrapperClass="dna-wrapper"
                className={loadingStyle.loader}
        />
      </div>
    );
}
 
export default Loading;