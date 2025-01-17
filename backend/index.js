const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*"}));
