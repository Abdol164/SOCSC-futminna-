

const View= () => {


    return(<>
        <button className="text-blue-500 hover:underline mb-4" onClick={onchange}>
              ← Back to Inbox
        </button>

        <p className="">{email.date}</p>
        <p>{email.to}</p>
        </>
    )
}

export default View;