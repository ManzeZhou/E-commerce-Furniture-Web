import React from "react";
import "./Footer.scss";
import ColumnWrapper from "./ColumnWrapper";
const Footer = () => {



    return (
        <div>
            <footer>
                <div className="footer-inner">
                    <div className="footer-wrapper">
                        <div className="footer-logo">
                            <a href="/">
                                <img src="http://mfs.mark2win.com/static/media/logo-footer.22fb1af5.svg" alt="logo"/>
                            </a>
                        </div>
                        <ColumnWrapper/>
                        <div className="footer-bottom">
                            <div className="block-left">
                                <p>Join our mailing list</p>
                                <div className="form-input">
                                    <div className="form-input-inner">
                                        <input type="text" id="form-email" className="input-text"
                                               maxLength="80" size="20" placeholder="Enter your email"/>
                                        <button className="button form-email-btn">Sign Up</button>
                                    </div>
                                </div>
                            </div>
                            <div className="block-right">
                                <div className="social-media">
                                    <p>Follow Us</p>
                                    <a href="/">
                                        <i className="fab fa-facebook-square"></i>
                                    </a>
                                    <a href="/">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                    <a href="/">
                                        <i className="fab fa-google-plus-g"></i>
                                    </a>
                                    <a href="/">
                                        <i className="fas fa-camera"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="copyright">
                            <div className="copyright-left">
                                <div className="countries">
                                    <div className="countries-flag">
                                        <img src="http://mfs.mark2win.com/static/media/Canada-flag.c9d19c1f.png" alt="flag"/>
                                    </div>
                                    <a href="/">
                                        <span>Canada</span>
                                    </a>
                                </div>
                            </div>
                            <div className="copyright-center">
                                <div>2020 Herman Miller, Inc.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="common-brand">A Herman Miller Group Company</div>
            </footer>
        </div>
    )
}
export default Footer;