/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import NoteContext from "../context/Notes/noteContext";
import alertContext from "../context/Alert/alertContext";

// A component for displaying an individual note
const NoteItem = (props) => {
    // Get the deleteNote function from the NoteContext
    const { deleteNote } = useContext(NoteContext);
    // Get the showAlert function from the alertContext
    const { showAlert } = useContext(alertContext);

    // Destructure the note and openNoteUpdateModal function from the props
    const { note, openNoteUpdateModal } = props;

    return (
        <>
            <div className="col-md-6 col-lg-4">
                <div className="card text-black move-up mb-3">
                    <div className="card-header">
                        <div className="d-flex align-items-center">
                            {/* Display the note's title */}
                            <h5 style={{fontWeight:"bold",color:"darkred"}} className="card-title me-auto">{note.title}</h5>

                            {/* Button to update the note */}
                            <i className="fa-solid fa-pen-to-square mx-1 p-2" onClick={() => openNoteUpdateModal(note)} />
                            {/* Button to delete the note */}
                            <i className="fa-solid fa-trash-can"  onClick={() => {
                                deleteNote(note._id);
                                // Show a success alert after the note is deleted
                                showAlert('Deleted Note Successfully :)', 'success');
                            }} />
                        </div>
                    </div>
                    <div className="card-body">
                        {/* Display the note's tag */}
                        {/* Display the note's description */}
                        <p className="card-text">
                            {note.description}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem;
