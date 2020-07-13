import React, { useState }from "react";
import { SocialIcon } from 'react-social-icons';
import { Link } from "react-router-dom";

// JSON
import socialIcons from "../JSON/socialIcons"

function Home() {

    const socials = socialIcons.message
    const [iconSocialSize] = useState(45)

    return (
        <main>
            <h1>Maxim Belyakov</h1>
            <p className="lead">Creating is my passion. Being better than yesterday really makes me happy.</p>
            <p className="quote">Life is 10% what happens to you and 90% how you react to it.</p>
            <p className="emoji">
                <span role="img" aria-label="rocket">🚀</span>
                <span role="img" aria-label="alien">👽</span>
                <span role="img" aria-label="alien-monster">👾</span>
            </p>
            <section>
                <h2 className="check">
                    <Link to="/portfolio">Portfolio projects</Link>
                </h2>
            </section>
            <section className="socials">
                {socials.map((social, i) => (
                    <SocialIcon key={i} bgColor="#222222" target="_blank" style={{ height: iconSocialSize, width: iconSocialSize }} network={social.name} url={social.link} />
                ))}
            </section>
        </main>
    );
}

export default Home;
