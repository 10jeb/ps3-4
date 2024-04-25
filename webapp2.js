const MongoClient = require('mongodb').MongoClient;
const mongo_url = "mongodb+srv://jboyd1792:bf7CRKSwNjKyT8c5@cluster0.oqxp9cg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

var http = require('http');
var url = require('url');
var port = process.env.PORT || 3000;
http.createServer(async function (req, res) {
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
        const client = await MongoClient.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db("dbhw");
        const collection = db.collection('places');
        if (/^\d/.test(url.parse(req.url, true).query.data)) {
            res.write("You entered a zipcode: " + url.parse(req.url, true).query.data);
        } else {
            res.write("You entered a place: " + url.parse(req.url, true).query.data);
            const result = await collection.findOne({ place: url.parse(req.url, true).query.data });
            if (result) {
              res.write(`<p>Place: ${result.place}</p>`);
              res.write(`<p>Zip Code(s):</p>`);
              result.zips.forEach(zip => {
                 res.write(`${zip} `);
               });
            } else {
              res.write(". Place not found.");
            }
        }
    }
    res.end();
}).listen(port);
