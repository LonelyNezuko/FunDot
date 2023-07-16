import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useLocation
} from 'react-router-dom'

import './default.js'
import './index.scss'

import Layout from './layout'

import HomePage from './routes/home/home'
import AccountPage from './routes/account/account'
import SigninPage from './routes/signin/signin'
import NewsPage from './routes/news/news'
import Error404Page from './routes/404/404.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Render />
    </Router>
);

function Render() {
    const location = useLocation()
    return (
        <section id='rootWrapper' className={`${location.pathname === '/signin' ? 'height100' : ''}`}>
            <Layout />
            
            <section id="body">
                <Routes>
                    <Route exact path='/' element={< HomePage />}></Route>
                    <Route exact path='/news/:type?' element={< NewsPage />}></Route>
                    <Route exact path='/account/:id?/*' element={< AccountPage />}></Route>
                    
                    <Route path='/signin' element={< SigninPage />}></Route>

                    <Route path='/*' element={< Error404Page />}></Route>
                </Routes>
            </section>
        </section>
    )
}
