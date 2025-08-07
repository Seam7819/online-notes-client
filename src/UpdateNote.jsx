import { Link, useLoaderData } from "react-router-dom";

const UpdateNote = () => {
    
    const loadUpdate = useLoaderData()
    console.log(loadUpdate);
    
    const handleUpdate = e =>{
        e.preventDefault()
        const form = e.target;
        const text = form.text.value;
        const date = form.date.value;
        const update = {
            text,date
        }
        console.log(update);
    }

    return (
        <div>
            <h1 className="font-bold">Edit Notes</h1>
            <div className="flex justify-start">
                <Link className="btn my-2" to={'/'}>Back To Home</Link>
            </div>
            <div className="my-10">
                <form onSubmit={handleUpdate}>
                <input className="mr-4 p-5 rounded-md pl w-full h-20 mb-5" defaultValue={loadUpdate.text} type="text" name="text" id="" />
                <input className="p-2 rounded-md mb-2" type="date" name="date" id="" /> <br />
                <input className="btn btn-soft btn-accent" type="submit" value="Save" />
            </form>
            </div>
        </div>
    );
};

export default UpdateNote;