import React, { useCallback, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/login/Login'

function Home() {
	return (
		<section className='container mainContainer'>
			<Login />
		</section>
	)
}

export default Home
