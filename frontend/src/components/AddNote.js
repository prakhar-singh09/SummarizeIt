import React, { useContext, useState } from "react";
import NoteContext from "../context/Notes/noteContext";
import alertContext from "../context/Alert/alertContext";
import { ReactTyped } from "react-typed";

const AddNote = () => {
    const { addNote } = useContext(NoteContext);
    const { showAlert } = useContext(alertContext);
    const [UrlText, setUrlText] = useState({ title: "", summary: "", url: "" });
    const [InputText, setInputText] = useState({ title: "", summary: "", text: "" });
    const [generatedUrlSummary, setGeneratedUrlSummary] = useState("");
    const [generatedTextSummary, setGeneratedTextSummary] = useState("");

   

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
        setGeneratedUrlSummary('');
        try {
            const response = await fetch(`${host}generate-summary`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: InputText.text }),
            });
    
            const data = await response.json();
    
            setGeneratedTextSummary(data.description);
        } catch (error) {
            console.error('Error generating description:', error);
        }
    };

    const generateUrlSummary = async () => {
        setGeneratedTextSummary(''); 
        try {
            const response = await fetch(`https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${UrlText.url}`, {
                method: 'GET',
                headers: {
                   'x-rapidapi-key': process.env.REACT_APP_URL_RAPID_API_KEY,
		           'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com'
                },
            });
    
            const data = await response.json();
            setGeneratedUrlSummary(data.summary);
        } catch (error) {
            console.error('Error generating Summary:', error);
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
                                    type="text"
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

                            <button type="button" disabled={UrlText.title.length < 3 || UrlText.url.length<5}  className="btn btn-lg btn-outline-primary mt-2 mb-3 me-2" onClick={generateUrlSummary}>
                                SummarizeIt✨
                            </button>

                    
                          
                            <button  type="submit" disabled={UrlText.title.length < 3 || UrlText.url.length < 5 || !generatedUrlSummary } className="btn btn-lg btn-outline-primary mt-2 mb-3 me-2" onClick={handleClick}>
                                Add Summary
                            </button>
                          
                        </form>

                        {generatedUrlSummary && (
                            <div className="alert alert-info mt-2" role="alert">
                                <strong>Generated summary:</strong>  <ReactTyped strings={[generatedUrlSummary]} typeSpeed={5} />
                            </div>
                        )}

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
                            
                            <button type="button" disabled={InputText.title.length < 3}  className="btn btn-lg btn-outline-primary mt-2 mb-3 me-2" onClick={generateTextSummary}>
                                SummarizeIt✨
                            </button>

                          
                            <button  type="submit" disabled={InputText.title.length < 3 || InputText.text.length < 5 || !generatedTextSummary } className="btn btn-lg btn-outline-primary mt-2 mb-3 me-2" onClick={handleClick}>
                                Add Summary
                            </button>
                        </form>
                        {generatedTextSummary && (
                            <div className="alert alert-info mt-2" role="alert">
                                <strong>Generated summary:</strong> <ReactTyped strings={[generatedTextSummary]} typeSpeed={5} />
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
};

export default AddNote;