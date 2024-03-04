import MainPage from '../../pages/main-page/main-page';

type AppProps = {
  offersNumber: number;
};

function App({offersNumber}: AppProps){
  return(
    <MainPage offersNumber={offersNumber}/>
  );
}

export default App;
