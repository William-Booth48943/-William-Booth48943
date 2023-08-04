async function postEmail({ url, email }) {
	const formDataJsonString = JSON.stringify({email});

	const fetchOptions = {
		method: "PUT",
		body: formDataJsonString,
	};

	const response = await fetch(url, fetchOptions);

	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}
    let button = document.getElementById("sign-up");
    button.innerHTML = "Submitted";
    button.disabled = true;
    button.classList.add("submitted");
	return response.json();
}

async function handleFormSubmit(event) {
	event.preventDefault();
	const url = 'https://nkwi8qu7fl.execute-api.eu-west-2.amazonaws.com/Interest';
	try {
        let email = document.getElementById("email").value;
        let response = document.getElementById("response");
        if(!validateEmail(email)){
            response.innerHTML = "Please enter a valid email";
            return;
        }
        else {
            response.innerHTML = "";
        }
		const responseData = await postEmail({ url, email });
	//	console.log({ responseData });
	} catch (error) {
	//	console.error(error);
	}
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }


window.onload = function()
{
    let form = document.getElementById("interest");
    form.addEventListener('submit', handleFormSubmit)
}