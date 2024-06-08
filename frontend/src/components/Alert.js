import React, { useContext } from 'react'
import alertContext from '../context/Alert/alertContext';

function Alert(props) {
    // Get the alert data from the alertContext
    const { alert } = useContext(alertContext);        
                                                       
    // Function to capitalize the first letter of a word
    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    // Render the alert only if it exists
    return (
        <div >
            {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(alert.type)}</strong> : {alert.msg}
            </div>}
        </div>
    )
}

export default Alert
