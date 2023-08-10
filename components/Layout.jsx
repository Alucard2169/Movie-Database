import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Auth from "./Auth";
import Loading from "./Loading";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [formState, setFormState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <div>
      {isLoading && <Loading />}
      <Navbar data={{ formState, setFormState }} />
      <Auth data={{ formState, setFormState }} />
      {children}
    </div>
  );
};

export default Layout;
