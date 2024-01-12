import { useState } from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import { UserStogare } from './context/UserContext'

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<UserStogare>
					<Routes>
						<Route path={'*'} element={<Home />} />
					</Routes>
				</UserStogare>
			</BrowserRouter>
		</div>
	)
}

export default App
