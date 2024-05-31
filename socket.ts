"use client";

import { io } from "socket.io-client";


const url = process.env.ENDPOINT_SOCKET
export const socket = io(url ?? "http://localhost:3001");