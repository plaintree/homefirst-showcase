import { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "../styles/nprogress.css";
import "../styles/globals.css";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", () => NProgress.done());
    router.events.on("routeChangeError", () => NProgress.done());

    return () => {
      router.events.off("routeChangeStart", () => NProgress.start());
      router.events.off("routeChangeComplete", () => NProgress.done());
      router.events.off("routeChangeError", () => NProgress.done());
    };
  }, []);
  return (
    <>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
