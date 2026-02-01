import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/Notes/noteContext";
import alertContext from "../context/Alert/alertContext";
import { ReactTyped } from "react-typed";
import loader from "./assets/loader.svg";

const AddNote = () => {
    let navigate = useNavigate();
    const { addNote } = useContext(NoteContext);
    const { showAlert } = useContext(alertContext);
    const [UrlText, setUrlText] = useState({ title: "", summary: "", url: "" });
    const [InputText, setInputText] = useState({ title: "", summary: "", text: "" });
    const [generatedUrlSummary, setGeneratedUrlSummary] = useState("");
    const [generatedTextSummary, setGeneratedTextSummary] = useState("");
   
    const [isFetchedText, setIsFetchedText] = useState("");
    const [isLoadingText, setIsLoadingText] = useState(false);

    
    const [isFetchedUrl, setIsFetchedUrl] = useState("");
    const [isLoadingUrl, setIsLoadingUrl] = useState(false);


    useEffect(() => {
        // Checking if user is logged in by checking for a token in local storage
        if (!localStorage.getItem('token')) {
            navigate('/');
        }
    }, [navigate]);
   

    const onChangeUrlButton = (e) => {
        setUrlText({ ...UrlText, [e.target.name]: e.target.value });
        
        
    };

    const onChangeTextButton = (e) => {
        setInputText({ ...InputText, [e.target.name]: e.target.value });
    };




    const handleClick = (e) => {
        e.preventDefault();
        addNote(UrlText.title, generatedUrlSummary, UrlText.url);
        addNote(InputText.title, generatedTextSummary, InputText.text);
        setUrlText({ title: "", summary: "", url: "" });
        setInputText({ title: "", summary: "", text: "" });
        showAlert('Added Summary Successfully :)', 'success');
    };
    
    const host = process.env.REACT_APP_URL;
    const generateTextSummary = async () => {
        setGeneratedTextSummary('');
        try {
            setIsLoadingText(true);
            const response = await fetch(`${host}api/ai/generate-summary`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ text: InputText.text }),
            });
    
            const data = await response.json();
            setIsLoadingText(false);
            setIsFetchedText(data?.description);    
            setGeneratedTextSummary(data.description);
        } catch (error) {
            setIsLoadingText(false);
            showAlert('Error generating summary. Please try again later.', error.message);
        }
    };
    const generateUrlSummary = async () => {
        setGeneratedTextSummary(''); 

        
try {
    setIsLoadingUrl(true);

    const response = await fetch(`${host}api/ai/url-summary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        url: UrlText.url
      })
    });

    const data = await response.json();

    setIsFetchedUrl(data?.summary);
    setGeneratedUrlSummary(data?.summary);
    setIsLoadingUrl(false);

  } catch (error) {
    setIsLoadingUrl(false);
    console.error("Error generating Summary:", error);
  }
};
    


    return (
        <>
        
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6">
                        <h2 style={{ fontWeight: "inherit" }}>Generate Summary by<span style={{ color: "darkred", fontWeight: "bold" }}> URL </span></h2>
                        <p>Paste a URL of any article & Click on SummarizeIt✨</p>
                        <form>
                            <div className="my-3 material-textfield">
                                <input
                                    type="url"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    placeholder=" "
                                    value={UrlText.title}
                                    onChange={onChangeUrlButton}
                                />
                                <label htmlFor="title" className="form-label">
                                    Title
                                </label>
                            </div>
                            <div className="my-3 material-textfield">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="url"
                                    name="url"
                                    placeholder=" "
                                    value={UrlText.url}
                                    onChange={onChangeUrlButton}
                                />
                                <label htmlFor="url" className="form-label">
                                    URL
                                </label>
                            </div>

                            <button type="button" disabled={UrlText.title.length < 3 || UrlText.url.length<5}  className="btn btn-lg btn-outline-success mt-2 mb-3 me-2" onClick={generateUrlSummary}>
                                SummarizeIt✨
                            </button>

                    
                          
                            <button  type="submit" disabled={UrlText.title.length < 3 || UrlText.url.length < 5 || !generatedUrlSummary } className="btn btn-lg btn-outline-primary mt-2 mb-3 me-2" onClick={handleClick}>
                                Add Summary
                            </button>
                        </form>

                        {isLoadingUrl ? (
                            <img src={loader} alt='loader' className="w-10 h-10 object-contain" />
                        ) : isFetchedUrl === undefined ? (
                            <p className='alert alert-danger mt-2'>
                                Please Enter Valid URL
                            </p>
                        ) : (
                        generatedUrlSummary && (
                            <div className="alert alert-success mt-2" role="alert">
                                <strong>Generated summary:</strong>  <ReactTyped strings={[generatedUrlSummary]} typeSpeed={5} />
                            </div>
                        ))}

                    </div>
                    <div className="col-md-6">
                    <h2 style={{ fontWeight: "inherit" }}>Generate Summary by<span style={{ color: "darkred", fontWeight: "bold" }}> Manual Input </span></h2>
                        <p>Paste the text that you want to Summarize✨</p>
                        <form>
                            <div className="my-3 material-textfield">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    placeholder=" "
                                    value={InputText.title}
                                    onChange={onChangeTextButton}
                                />
                                <label htmlFor="title" className="form-label">
                                Title
                                </label>
                            </div>
                            <div className="my-3 material-textfield">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="text"
                                    name="text"
                                    placeholder=" "
                                    value={InputText.text}
                                    onChange={onChangeTextButton}
                                />
                                <label htmlFor="url" className="form-label">
                                   Input Text
                                </label>
                            </div>
                            
                            <button type="button" disabled={InputText.title.length < 3 ||  InputText.text.length < 5 }  className="btn btn-lg btn-outline-success mt-2 mb-3 me-2" onClick={generateTextSummary}>
                                SummarizeIt✨
                            </button>

                          
                            <button  type="submit" disabled={InputText.title.length < 3 || InputText.text.length < 5 || !generatedTextSummary } className="btn btn-lg btn-outline-primary mt-2 mb-3 me-2" onClick={handleClick}>
                                Add Summary
                            </button>
                        </form>

                        {isLoadingText ? (
                            <img src={loader} alt='loader' className="w-10 h-10 object-contain" />
                        ) : isFetchedText === undefined ? (
                            <p className='alert alert-danger mt-2'>
                                Something Went Wrong Please try again later...
                            </p>
                        ) : (
                          generatedTextSummary && (
                            <div className="alert alert-success mt-2" role="alert">
                                <strong>Generated summary:</strong> <ReactTyped strings={[generatedTextSummary]} typeSpeed={6} />
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </>
    );
};

export default AddNote;