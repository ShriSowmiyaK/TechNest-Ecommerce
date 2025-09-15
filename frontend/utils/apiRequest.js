const apiRequest = async ({ 
  url, 
  method = "GET", 
  data = null, 
  params = {}, 
  headers = {} 
}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    let baseUrl = import.meta.env.VITE_BASE_URL_DEVELOPMENT;
    if(import.meta.env.VITE_ENVIRONMENT == "production" )
    {
       baseUrl = import.meta.env.VITE_BASE_URL_PRODUCTION;
    }
    const finalUrl = queryString ? `${baseUrl}${url}?${queryString}` : `${baseUrl}${url}`;
    const response = await fetch(finalUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: data ? JSON.stringify(data) : null,
      credentials: "include",
    });
    // console.log(response);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      throw new Error(errorData.message || `Error ${response.status}`);
    }

    return await response.json();

  } catch (err) {
        // console.log(err);
    throw new Error(err.message || "Something went wrong");
  }
};

export default apiRequest;
