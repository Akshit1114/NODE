import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Body from './components/Body'
import Login from './components/Login'
import Profile from './components/Profile'
import appSotre from './utils/appStore'
import {Provider} from 'react-redux'


const App = () => {
  return <>

  <Provider store={appSotre}>
    <BrowserRouter basename='/' >
      <Routes>
        <Route path="/" element = {<Body/>}>
          <Route path="/login" element = {<Login/>} />
          <Route path="/profile" element = {<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
    
  </>
}

export default App