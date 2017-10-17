import 'af-toolkit-core/bootstrap/af-toolkit-core.css';
import 'af-toolkit-core/assets/fonts/icons/af-icons.css';
import '../toolkit/af-toolkit.scss';

import * as React from 'react';

import { text, withKnobs } from '@storybook/addon-knobs';

import Footer from '../components/Footer';
import FooterLinks from '../components/FooterLinks';
import Header from '../components/Header';
import Logo from '../components/Logo';
import LogoTitle from '../components/LogoTitle';
import Title from '../components/Title';
import { storiesOf } from '@storybook/react';

// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

const stories = storiesOf('Pages', module);
stories.addDecorator(withKnobs);
stories.add('footer', () => <Footer />);
stories.add('footer-links', () => <FooterLinks />);
stories.add('header', () => <Header />);
// TODO corriger le logo qui ne s'affiche pas
stories.add('logo', () => <Logo />);
stories.add('logo-title', () => <LogoTitle />);
stories.add('title', () => (<Title label={text('Label', 'Ma barre de titre')} />));  
