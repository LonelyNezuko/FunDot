import { useLocation } from "react-router-dom";

import Nav from './components/nav/nav'
import Online from './components/online/online'
import NavBottom from "./components/navBottom/navBottom"

import NavLanding from "./components/nav/landing";
import OnlineLanding from "./components/online/landing";
import NavBottomLanding from "./components/navBottom/landing";

import Feedback from "./components/_modals/feedback";
import ImagePreview from "./components/_modals/imagepreview/imagepreview";

export default function Layout()
{
    const location = useLocation();
    return (
        <>
            <div id="notify"></div>

            {location.pathname === '/__landing' ? (
                <section id="bodyLeft">
                    <NavLanding />
                    <OnlineLanding />
                    <NavBottomLanding />
                </section>
            ) : ''}
            {location.pathname !== '/signin' && location.pathname !== '/__landing' ? (
                <section id="bodyLeft">
                    <Nav />
                    <Online />
                    <NavBottom />
                </section>
            ) : ''}

            {location.hash.indexOf('#feedback') != -1 ? (<Feedback />) : ''}
            {location.search.indexOf('?report') != -1 ? (<Feedback />) : ''}

            {location.search.indexOf('?image') != -1 ? (<ImagePreview />) : ''}
        </>
    );
}