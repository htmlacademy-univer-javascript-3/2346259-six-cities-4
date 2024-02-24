import MainPage from './mainPage';

type AppProps = {
  offersNumber: number;
};

function App({offersNumber}: AppProps){
  return(
    <MainPage offersNumber={offersNumber}/>
  );
}

export default App;
