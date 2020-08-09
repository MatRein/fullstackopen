import React from 'react'

export default function SearchField({searchTerm, handleSearch}) {
    return (
        <div>
        <form>
            <div>
                {"Search Country: "}
                <input 
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
        </form>
        </div>
    )
}
