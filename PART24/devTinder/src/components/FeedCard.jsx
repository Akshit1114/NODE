const FeedCard = ({ user }) => {
    const { firstName, lastName, photoUrl, skills, about, age, gender } = user
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src={photoUrl}
                    alt="Profile" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + " " + gender}</p>}
                <p>{about}</p>
                <p>{skills}</p>
                <div className="card-actions justify-center">
                    <button className="btn btn-secondary">Interested</button>
                    <button className="btn btn-primary">Rejected</button>
                </div>
            </div>
        </div>
    )
}


export default FeedCard