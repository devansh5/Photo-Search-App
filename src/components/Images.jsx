import React, { useEffect, useState } from 'react';
import Modals from './Modals';
import axios from 'axios';
export default function Images() {
    const [photos, setPhotos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalphoto, setModalphoto] = useState({});
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const openModal = (photo) => {
        setModalphoto(photo);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }


    useEffect(() => {
        if (!search) {
            axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.getrecent&api_key=${process.env.REACT_APP_API_KEY}&format=json&nojsoncallback=1`)
                .then(res => {
                    setPhotos(res.data.photos.photo)
                })
        } else {
            getAllData();
        }

    }, [search]);

    const getAllData = () => {
        axios
            .get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_API_KEY}&format=json&nojsoncallback=1&text=${search}`)
            .then((res) => {
                console.log(res)
                setPhotos(res.data.photos.photo);
            });
    };

    const handleChange = (event) => {
        console.log('working')
        setSearch(event.target.value);
    };
    return (
        <>
            <div className="bg-gray-100 w-full h-screen py-10">

                <p className="font-serif text-6xl text-center mb-5">Search Photos</p>
                <div className="sticky top-10 bg-white flex  mx-10 md:mx-96 shadow-xl">
                    <input className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none" id="search" type="text" placeholder="Search" onChange={handleChange} />
                </div>
                {loading ? <Loader/> : (
                    <div className="container mx-auto pt-20">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 place-items-center">
                            {photos.map((photo, index) => {
                                return (
                                    <div key={index}>
                                        <img key={index} onClick={() => openModal(photo)} className="w-96 h-96" src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />
                                    </div>
                                )
                            })}
                        </div>

                    </div>

                )}

            </div>
            <Modals modalphoto={modalphoto} showModal={showModal} closeModal={closeModal} />
        </>
    )
}
