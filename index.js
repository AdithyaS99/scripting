// Importing express module
const express = require("express")
const app = express()
app.use(express.static(__dirname))
app.use(
  express.urlencoded({
  extended: true
  })
)
app.use(express.json())

let arr=[1,2,3,4,5];

//Handling get requests by no index, with index, returning index for element if found
app.get("/", (req, res, next) => {
	res.send("GET request called, array : ".concat(arr.toString()));
})

app.get("/number", (req, res, next) => {
    const index=arr.indexOf(req.body.number);
    if(index>-1){
	    res.send("Get request called by number ".concat(arr.indexOf(req.body.number).toString()));
    }
    else{
        res.send("Get request called, element not found in array : ".concat(arr.toString()));
    }
})

app.get("/index", (req, res, next) => {
	res.send("Get request called by index ".concat(arr[req.body.index].toString()));
})

//Handling post request by number, index and adding element to array
app.post('/', (req, res) => {
    //console.log(req.body);
    arr[req.body.index]=req.body.val;
    res.send("POST Request Called\n modified array : ".concat(arr.toString()));
})

app.post('/number', (req, res) => {
    //console.log(req.body);
    const index = arr.indexOf(req.body.number);
    if(index>-1)
    {
        arr.splice(index,1);
    }
    arr[index]=req.body.val;
    res.send("POST Request by number Called\n modified array : ".concat(arr.toString()));
})

app.post('/index', (req, res) => {
    //console.log(req.body);
    arr[req.body.index]=req.body.val;
    res.send("POST Request by index Called\n modified array : ".concat(arr.toString()));
})

//Handling delete request by index, number and removing the last element
app.delete('/', (req, res) => {
    arr.pop();
    res.send("DELETE Request Called, updated array : ".concat(arr.toString()));
})

app.delete('/number', (req, res) => {
    const index = arr.indexOf(req.body.number);
    if(index>-1)
    {
        arr.splice(index,1);
    }
    res.send("DELETE Request by number Called, updated array : ".concat(arr.toString()));
})

app.delete('/index', (req, res) => {
    arr.splice(req.body.index,1);
    res.send("DELETE Request by index Called, updated array : ".concat(arr.toString()));
})

//Handling put requests by number and adding element to the array
app.put('/', (req, res) => {
    arr.push(req.body.number);
    res.send("PUT Request Called, element added to array : ".concat(arr.toString()));
})

app.put('/index', (req, res) => {
    arr.splice(req.body.index, 0, req.body.number);
    res.send("PUT Request Called, element added to array at index: ".concat(arr.toString()));
})

// Server setup
app.listen(3000, () => {
	console.log("Server is Running")
})
