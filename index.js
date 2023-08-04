async function postFormDataAsJson({ url, formData }) {
	const plainFormData = Object.fromEntries(formData.entries());
	const formDataJsonString = JSON.stringify(plainFormData);

	const fetchOptions = {
		method: "PUT",
		// headers: {
		// 	//"Content-Type": "application/json",
		// 	//Accept: "application/json",
		// },
		body: formDataJsonString,
	};

	const response = await fetch(url, fetchOptions);

	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}

	return response.json();
}

async function handleFormSubmit(event) {
	event.preventDefault();

	const form = event.currentTarget;
	const url = 'https://nkwi8qu7fl.execute-api.eu-west-2.amazonaws.com/Interest';

	try {
		const formData = new FormData(form);
		const responseData = await postFormDataAsJson({ url, formData });

		console.log({ responseData });
	} catch (error) {
		console.error(error);
	}
}

window.onload = function()
{
    let form = document.getElementById("interest");
    form.addEventListener('submit', handleFormSubmit)
}