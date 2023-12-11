import {createAsyncThunk} from "@reduxjs/toolkit";
import * as users from "./authentication";

export const loginThunk = createAsyncThunk(
	"user/login", async (credentials) => {
		return await users.login(credentials);
	});

export const profileThunk = createAsyncThunk(
	"auth/profile", async () => {
		const response = await users.profile();
		return response.data;
	});

export const logoutThunk = createAsyncThunk(
	"auth/logout", async () => {
		return await users.logout();
	});

export const updateUserThunk = createAsyncThunk(
	"user/updateUser", async (user) => {
		await users.updateUser(user);
		return user;
	});

export const registerUserThunk = createAsyncThunk(
	"user/register", async ({username, email, password}) => {
		await users.registerUser({username, email, password});
		return {username, email, password};
	});

export const checkAuthThunk = createAsyncThunk(
	"user/checkAuth", async () => {
		return await users.checkAuth();
	});