import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Notes = () => {



    const [loadNotes, setNotes] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        fetch('http://localhost:5000/notes')
            .then(res => res.json())
            .then(data => {
                setNotes(data)
            })
    }, [])


    const handleDelete = _id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                setIsLoading(true);
                fetch(`http://localhost:5000/notes/${_id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            setNotes(loadNotes.filter(note => note._id !== _id));
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your notes has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            }
        });
    };

    const handleNotes = e => {
        e.preventDefault()
        const form = e.target;
        const text = form.text.value;
        const date = form.date.value;
        const note = { text, date }
        fetch('http://localhost:5000/notes', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(note)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.insertedId)
                if (data.insertedId) {
                    setNotes([...loadNotes, { _id: data.insertedId, text, date }]);
                    Swal.fire({
                        title: "Saved!",
                        icon: "success",
                        draggable: true,
                    });
                }
                form.reset()
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div>
            <div>
                <form onSubmit={handleNotes}>
                    <div className="flex flex-col gap-5 justify-start items-start">
                        <input disabled={isLoading} className="w-full p-2 h-20 rounded-lg" required placeholder="write here" type="text" name="text" text id="" />
                        <input className="p-2 rounded-md" disabled={isLoading} type="date" name="date" required id="" />
                        <input disabled={isLoading} className="btn btn-wide btn-info" type="submit" value="Save" />
                    </div>
                </form>
            </div>

            <div className="text-start ">{
                loadNotes.map(loadNote =>
                    <li key={loadNote._id} className="list-decimal mb-4 mt-5 border rounded-md p-5">
                        <span>{loadNote.text}</span>
                        <button disabled={isLoading} onClick={() => handleDelete(loadNote._id)} className="btn btn-error ml-10 mr-3">Delete</button>
                        <Link to={`/notes/${loadNote._id}`} className="btn btn-soft btn-accent" >Edit</Link>
                        </li>
                )

            }</div>

        </div>
    );
};

export default Notes;