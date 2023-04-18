import CreateState from "@/context/CreateState";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <CreateState>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </CreateState>
  );
}
