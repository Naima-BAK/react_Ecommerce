// erros :  page 403  => you are note admin.
import React from 'react';
import './403.css';

function Page_403() {
    return (

        <div className='bodyy'>

            <div class="scene">
                <div class="overlay"></div>
                <div class="overlay"></div>
                <div class="overlay"></div>
                <div class="overlay"></div>
                <span class="bg-403">403</span>
                <div class="text">
                    <span class="hero-text"></span>
                    <span class="msg">Accès refusé !  <span>vous n'êtes pas</span> un administrateur.</span>
                    <span class="support">
                        <a href="/" >Go Home</a>
                    </span>
                </div>
                <div class="lock"></div>
            </div>
        </div>
    );
}

export default Page_403;