var tape   = require('tape');
var server = require("../src/server.js"); // our index.js from above

tape("Basic HTTP Tests - GET /index.html", function(t) { // t
    var options = {
        method: "GET",
        url: "/"
    };
    // server.inject lets you similate an http request
    server.inject(options, function(response) {
        t.equal(response.statusCode, 200);  //  Expect http response status code to be 200 ("Ok")
        t.ok(response.payload.includes('<title>Fakepress</title>'), 'finds the correct file');
        server.stop(t.end); // t.end() callback is required to end the test in tape
    });
});

tape("Basic HTTP Tests - GET /useradmin.html", function(t) { // t
    var options = {
        method: "GET",
        url: "/asdfgh/admin"
    };
    // server.inject lets you similate an http request
    server.inject(options, function(response) {
        t.equal(response.statusCode, 200);  //  Expect http response status code to be 200 ("Ok")
        t.ok(response.payload.includes('<title>Fakepress User Admin</title>'), 'finds the correct file');
        server.stop(t.end); // t.end() callback is required to end the test in tape
    });
});

tape("Basic HTTP Tests - GET /user.html", function(t) { // t
    var options = {
        method: "GET",
        url: "/asdfgh"
    };
    // server.inject lets you similate an http request
    server.inject(options, function(response) {
        t.equal(response.statusCode, 200);  //  Expect http response status code to be 200 ("Ok")
        t.ok(response.payload.includes('<title>Fakepress User</title>'), 'finds the correct file');
        server.stop(t.end); // t.end() callback is required to end the test in tape
    });
});
