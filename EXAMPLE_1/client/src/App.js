import React from 'react';

import { Hero, Container } from 'react-bulma-components';

import { Preloader, Placeholder } from 'react-preloading-screen';

import Routes from './settings/router.setting';

import Header from './components/Header';
import Footer from './components/Footer';

import 'react-bulma-components/dist/react-bulma-components.min.css';


const App = () => {
  return (
    <Preloader>
      <Hero size="fullheight">
        <Hero.Head renderAs="header" >
          <Header />
        </Hero.Head>
        <Hero.Body>
          <Container breakpoint="fullhd">
            <Routes />
          </Container>
        </Hero.Body>
        <Hero.Footer>
          <Footer />
        </Hero.Footer>
      </Hero>
      <Placeholder>
        <div className='lds-eclipse-container'>
          <div className='lds-eclipse' >
            <div />
          </div>
        </div>
      </Placeholder>
    </Preloader>
  );
}

export default App;
