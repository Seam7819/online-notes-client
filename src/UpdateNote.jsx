import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateNote = () => {

    const loadUpdate = useLoaderData()
    console.log(loadUpdate);

    const handleUpdate = e => {
        e.preventDefault()
        const form = e.target;
        const text = form.text.value;
        const date = form.date.value;
        const update = {
            text, date
        }
        console.log(update);
        fetch(`http://localhost:5000/notes/${loadUpdate._id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(update)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Update successfully",
                        icon: "success",
                        draggable: true
                    });
                }
                form.reset()
            })
    }

    return (
        <div>
            <h1 className="font-bold">Edit Notes</h1>
            <div className="flex justify-start">
                <Link className="btn my-2" to={'/'}>Back To Home</Link>
            </div>
            <div className="my-10">
                <form onSubmit={handleUpdate}>
                    <input className="mr-4 p-5 rounded-md pl w-full h-20 mb-5" required defaultValue={loadUpdate.text} type="text" name="text" id="" />
                    <div className="flex justify-start">
                        <input className="p-2 rounded-md mb-2 " type="date" required name="date" id="" /></div> <br />
                    <div className="flex justify-start">
                        <input className="btn btn-soft btn-wide btn-accent" type="submit" value="Save" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateNote;