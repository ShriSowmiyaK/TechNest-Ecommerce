import { useRouteError } from "react-router";

const Error = () => {
    const error = useRouteError();
    console.log(error);
    return (<div className="error-container">
        <h1>oops!! </h1>
        <h2>something went wrong </h2>
        <h2>{error.status}</h2>
        <h2>{error.statusText}</h2>
    </div>);
};

export default Error;