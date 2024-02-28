


import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { NavBar } from './Component/NavBar';
import { Login, NewPassword, PasswordReset, Registration} from './Pages/Authentication';
import { ClientIntakeForm, IncidentReportForm, ReferralForm } from './Pages/Forms';
import './App.css';


function App() {
	return (
		<div>
			{/* <NavBar /> */}
			<BrowserRouter>
				<Routes path='/' element={<Login />}>
					<Route path='Login' element={<Login />} />
					<Route path='PasswordReset' element={<PasswordReset />} />
					<Route path='NewPassword' element={<NewPassword />} />
					<Route path='Registration' element={<Registration />} />
					<Route path='ClientIntakeForm' element={<ClientIntakeForm />} />
					<Route path='IncidentReportForm' element={<IncidentReportForm />} />
					<Route path='ReferralForm' element={<ReferralForm />} />
				</Routes>
			</BrowserRouter>
			<div id='footer'>&copy; COPYRIGHT 2024 SCS GROUP PROJECT, INC </div> 
		</div>
	);
}

export default App;