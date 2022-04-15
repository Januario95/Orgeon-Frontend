import React, {
    useState,
    useEffect
} from 'react';


const ButtonHandler = () => {
    const [initialValue, setInitialValue] = useState(0);
    const [configValue, setConfigValue] = useState(0);

    const handleClick = e => {
        /*
            Get number in the button text and
            convert it to integer type, then add 1 it to set
            as the value of initialValue
        */
        let updatedValue = parseInt(initialValue);
        setInitialValue(updatedValue + 1);

        // Get number already in the button and add 1 to it, 
        // then save to localStorage.
        localStorage.setItem('counter', updatedValue + 1);
    }

    const handleInputField = e => {
        // Get valur from the input field and convert
        // it to integer
        let value = parseInt(e.target.value);

        // If the input field is empty, then
        // set initialValue to zero
        if (e.target.value === '') {
            setConfigValue('')
            setInitialValue(0);
        } else {
            // If there is a value entered in the input field,
            // set it to be the value of initialValue variable
            setConfigValue(value);
            setInitialValue(value);
        }
    }

    const getLocalStorageData = () => {
        // Get counter value from localStorage,
        // and return the value
        let counter = localStorage.getItem('counter');
        return counter;
    }

    const fetchCounter = () => {
        // // Fetch counter value from localStorage by
        // calling getLocalStorageData function
        const counter = getLocalStorageData();

        // Check if the there is a counter value in the localStorage.
        if (counter === null) {
            /* If the counter is null, which indicates that there's not conter
                in localStorage, create a counter variable and set its value
                to be the value in the input field (configValue variable, which defaults to 0)
                and return the configValue
            */
            localStorage.setItem('counter', configValue);
            return configValue;
        }
        // Return the value of counter fetched from localStorage
        return parseInt(counter);
    }

    useEffect(() => {
        // Get counter value from localStorage
        let counter = fetchCounter();

        /*
            Set the number in the button to the
            counter fetched from localStorage.
            This is to help persist the number in the button text
            when the page is refreshed, by saving it
            in localStorage
        */
        setInitialValue(counter);

        // Set the number in the input-field to be the
        // counter fetched from localStorage.
        setConfigValue(counter);

        document.querySelector('.input-field').focus();
    }, []);

    return (
        <div className="btn-handler">
            <input
                type="number"
                className="input-field"
                value={configValue}
                onChange={(e) => handleInputField(e)}
            />
            <button
                className="btn"
                onClick={(e) => handleClick(e)}
            >Click count: {initialValue}</button>
        </div>
    )
}

export default ButtonHandler;
