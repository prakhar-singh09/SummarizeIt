import { React, useContext,useCallback,useEffect,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import homeimg from './assets/img1.png';
import alertContext from "../context/Alert/alertContext";
import { useGoogleLogin } from '@react-oauth/google';


const Home = () => {

    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(200 - Math.random() * 100);
    const period = 900;

    const tick = useCallback(() => {
        const toRotate = ["Notes", "WebPage","URLs"];
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting
            ? fullText.substring(0, text.length - 1)
            : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(prevLoopNum => prevLoopNum + 1);
            setDelta(300);
        }
    }, [isDeleting, loopNum, text]);

    useEffect(() => {
        let ticker = setInterval(tick, delta);

        return () => {
            clearInterval(ticker);
        };
    }, [tick, delta]);
    
  useEffect(() => {
    const BASE_URL = "https://cychat.cyfuture.cloud";

    // Create the script element
    const script = document.createElement('script');
    script.src = `${BASE_URL}/packs/js/sdk.js`;
    script.defer = true;
    script.async = true;

    // Append the script to the document
    document.body.appendChild(script);

    // Add the onload event to initialize chatwootSDK
    script.onload = () => {
      if (window.chatwootSDK) {
        window.chatwootSDK.run({
          websiteToken: process.env.REACT_APP_URL_CHATWOOT,
          baseUrl: BASE_URL,
        });
      }
    };

    // Cleanup the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

    const { showAlert } = useContext(alertContext);
    let navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            if (tokenResponse) {
                // If login is successful, save authToken to local storage and redirect to home page
                localStorage.setItem('token', tokenResponse);
                navigate('/');
                // Show success alert
                showAlert('Welcome back! Successfully Loggedin :)', 'success')
            }
            else {
                // If login is unsuccessful, show warning alert
                showAlert('Inavalid Credentials! Please Login Using Correct Credentials.', 'warning');
            }
        }
    });
    //https://www.googleapis.com/auth/userinfo.email
    return (
        <>
            {/* Hero Section */}
            <div className="container my-6" >

                <div className="row">

                    <div className="col-md-5">
                        <img className="img-fluid " src={homeimg} alt='home' />
                    </div>

                    <div className="col-md-7 my- 3 d-flex flex-column justify-content-center">
                        <div className="px-5 py-3 my-3 align-middle">
                            <h1 className='display-4 my-3 ' style={{ fontWeight: "revert-layer" }}>
                                {`Summarize,`}{" "}
                                <span
                                    className="txt-rotate"
                                    data-rotate='["Notes", "WebPage","URLs"]'
                                >
                                    <span className="wrap">{text}</span>
                                </span>
                            </h1>
                            <h3>An AI-Powered Summary <span style={{ color: "darkred", fontWeight: "bold" }}> Generation App</span> </h3>
                            <p>
                                {" "}
                                Introducing AI-Powered Platform that extracts
                                summaries seamlessly from web URLs or manual input, into concise summaries, which
                                users can easily save for future reference and use.
                            </p>
                        </div>

                        {/* Show Login and SignUp buttons only if the user is not authenticated */}
                        {!localStorage.getItem('token') && <div className="px-5 py-2">
                            <Link className="btn btn-lg btn-outline-primary me-3 my-2" to="/login" role="button" >Login</Link>
                            <Link className="btn btn-lg btn-outline-primary me-3 my-2" to="/signup" role="button" >SignUp For Free</Link>
                            <button className="btn btn-lg btn-outline-primary my-2" onClick={() => login()}>
                                SignUp with <i className="fab fa-google fa-x" /></button>
                        </div>
                        }

                        {/* Show Create New Note button only if the user is authenticated */}
                        {localStorage.getItem('token') && <div className="px-5 py-2">
                            <Link className="btn btn-lg btn-outline-primary me-3 my-2" to="/notes" role="button" >Generate Summary✨</Link>
                        </div>
                        }
                    </div>


                </div>
            </div>

            {/* Notes Component */}
            {/* <Notes /> */}
        </>
    )
}

export default Home;
