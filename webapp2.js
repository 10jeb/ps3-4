const MongoClient = require('mongodb').MongoClient;

const mongo_url = "mongodb+srv://jboyd1792:bf7CRKSwNjKyT8c5@cluster0.oqxp9cg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// async function main() {
//   try {
//     const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log("Connected to MongoDB");

//     const db = client.db("dbhw");
//     const collection = db.collection('places');

    var http = require('http');
    var url = require('url');
    var port = process.env.PORT || 3000;
    http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        var path = url.parse(req.url).pathname;
        var querystr = url.parse(req.url).query;
        if (req.url == "/"){
            form = "<form action='/process' method='get'>" +
                    "Place or Zip <input type='text' name='data' id='data'><br>" +
                    "<input type='submit'>" +
                    "</form>";
            res.write(form);
        } else if (path == "/process"){
            if (/^\d/.test(url.parse(req.url, true).query.data)) {
                res.write("You entered a zipcode: " + url.parse(req.url, true).query.data);
            } else {
                res.write("You entered a place: " + url.parse(req.url, true).query.data);
            }
        }
        res.end();
    }).listen(port);
//   } catch (err) {
//     console.log(err);
//   }
// }

// main();
