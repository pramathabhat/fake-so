import Homepage from "./homepage/homepage.js";
import {PageContext} from "./PageContext";
import React, {useEffect, useState} from "react";
import Welcome from "./welcome/welcome";
import {Routes, Route, Navigate} from "react-router-dom";
import Register from "./users/register";
import Login from "./users/login";
import Profile from "./users/profile/profile";
import {useDispatch, useSelector} from "react-redux";
import {checkAuthThunk} from "./users/usersThunks";


export default function FakeStackOverflow() {

    const { currentUser } = useSelector((state) => state.user);

    const [page, setPage] = useState(1);
    const [questionId, setQuestionId] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [tag, setTag] = useState(null);
    const [search, setSearch] = useState("");

    const dispatch = useDispatch();

    const getAuth = async () => {
        await dispatch(checkAuthThunk());
    }

    useEffect(() => {
        getAuth();
    }, []);

    return (
        <PageContext.Provider
            value={{
                page: page,
                setPage: setPage,
                questionId: questionId,
                setQuestionId: setQuestionId,
                answer: answer,
                setAnswer: setAnswer,
                tag: tag,
                setTag: setTag,
                search: search,
                setSearch: setSearch
            }}>
            {currentUser && <Navigate to="/home"/>}
            <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/home" element={<Homepage/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </PageContext.Provider>
    );
}
