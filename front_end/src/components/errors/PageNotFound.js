// Error : Page not found

import React from 'react';
import './403.css';

export default function PageNotFound() {

    return (

        <div className='bodyy'>

            <div class="scene">
                <div class="overlay"></div>
                <div class="overlay"></div>
                <div class="overlay"></div>
                <div class="overlay"></div>
                <span class="bg-403">404</span>
                <div class="text">
                    <span class="hero-text"></span>
                    <span class="msg">Oups ! <span>Page non </span>trouvée. </span>
                    <span class="support">
                        <span>  La page que vous recherchez n'existe pas.   </span>
                        <a href="/" >Go Home</a>
                    </span>
                </div>
                <div class="lock"></div>
            </div>
        </div >
    )
}
