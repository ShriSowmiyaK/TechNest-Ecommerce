
const ErrorDialogbox = ({setError,message})=>{
    return (
    <>
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
        <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-xl font-bold text-red-600">Error</h2>
            <p className="mt-2">{message}</p>
            <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={()=>{setError(null)}}>Close</button>
        </div>
        </div>
       
     </>
    );
}
export default ErrorDialogbox;
