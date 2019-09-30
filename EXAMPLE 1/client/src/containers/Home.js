import React, { useState, useEffect } from 'react';

import { Content, Loader, Heading } from 'react-bulma-components';

import queryString from 'query-string'

import UserService from '../services/user.service'

import constants from '../settings/constants.setting';

const { HOME, APPS } = constants;

const Home = ({ match, location }) => {
	const { app } = match.params;
	const { code } = queryString.parse(location.search)
	const [uri] = window.location.href.split("?");


	const [show, setShow] = useState('Cargando...');
	const [error, setError] = useState(false);

	const showError = error === false
		? ''
		: (<Heading className="has-text-grey" size={6}>{error.toString()}</Heading>)


	useEffect(() => {
  	UserService.verifyToken(code, app, uri)
			.then(data => {
				setShow(`Bienvenido, ${data.name} ${data.family_name} (${data.email})`);
			}).catch(err => {
				setError(err)
			})
	}, [code, app, uri]);

	useEffect(() => {
		if(error !== false){
			setShow("Se redirigirá al inicio")
			window.setTimeout(() => {
				//window.location = HOME
				console.log(HOME)
			}, 1000);
		}
	}, [error])


	return (
		<Content className='has-text-centered'>
			<Heading size={2}>Iniciando sesión en {APPS[app]}</Heading>
			<Loader
	      style={{
	        width: 170,
	        height: 170,
					margin: 'auto',
	      }}
	    />
			<Heading size={4}>{show}</Heading>
			{showError}
		</Content>
	)
}


export default Home;
