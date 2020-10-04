import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchProvider from '../providers/SearchProvider';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../styles/globals.css';
import theme from '../styles/theme';
import 'tachyons/css/tachyons.min.css';

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <SearchProvider>
          <CssBaseline />
          <Head>
            <title>IMDB Test App</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Navbar />
          <div className="pb4">
            <Component {...pageProps} />
          </div>
          <Footer />
        </SearchProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
